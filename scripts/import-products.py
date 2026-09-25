"""Turn the Kirkco WordPress export into src/content/products.json and public/products images."""

from __future__ import annotations

import html
import json
import re
import ssl
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
XML = Path("/home/ubuntu/.cursor/projects/workspace/uploads/kirkco.WordPress.2026-09-24-POSTS_21fb.xml")
OUT_JSON = ROOT / "src/content/products.json"
IMAGE_DIR = ROOT / "public/products"

NS = {
    "content": "http://purl.org/rss/1.0/modules/content/",
    "wp": "http://wordpress.org/export/1.2/",
    "excerpt": "http://wordpress.org/export/1.2/excerpt/",
}

# WordPress product-category nicenames → nav category slugs.
CATEGORY_MAP = {
    "adhesives-and-sealants": "adhesives-sealants",
    "adhesives-sealants": "adhesives-sealants",
    "single-component-systems": "single-component",
    "two-component-systems": "two-component",
    "putty-and-paste": "putty-paste",
    "smc-imc-molding": "smc-imc-molding",
    "tooling-paste": "tooling-paste",
    "piston-metering": "two-component",
    "gear-metering": "two-component",
    "progressive-cavity-metering": "two-component",
    "shot-metering": "two-component",
    "conti-flow": "two-component",
    "lsr-processing-equipment": "two-component",
    "mixing-valves": "two-component",
    "composite-processes": "composites",
    "closed-mold-technology": "closed-mold-technology",
    "resin-transfer-molding": "closed-mold-technology",
    "resin-injection-molding": "closed-mold-technology",
    "vacuum-infusion-molding": "closed-mold-technology",
    "filament-winding": "filament-winding",
    "open-mold-technology": "open-mold-technology",
    "gel-coat": "open-mold-technology",
    "pull-winding": "pull-winding",
    "lubrication": "lubrication",
    "metering": "metering",
    "metering-valves": "metering",
    "cartrigde-metering-valve": "metering",
    "chamber-metering-valve": "metering",
    "needle-metering-valve": "metering",
    "positive-displacement-metering-valve": "metering",
    "pressure-control": "pressure-control",
    "flow-regulation": "flow-regulation",
    "dispensing": "dispensing",
    "delivery": "dispensing",
    "dispensing-valves": "dispensing",
    "diaphragm-dispensing-valve": "dispensing",
    "handheld-dispensing-valves": "dispensing",
    "high-speed-valves": "dispensing",
    "needle-dispensing-valves": "dispensing",
    "shot-valves": "dispensing",
    "feeding-supply": "feeding-and-supply",
    "air-operated-diaphragm-pumps": "feeding-and-supply",
    "double-ram-pumps": "feeding-and-supply",
    "piston-pumps": "feeding-and-supply",
    "pressure-vessels": "feeding-and-supply",
    "transfer-pumps": "feeding-and-supply",
    "protective-coatings": "protective-coatings",
    "automatic-spray-systems": "spray-systems",
    "automated-spray-systems": "spray-systems",
    "manual-spray-system": "spray-systems",
    "process-control": "process-control",
    "control": "process-control",
    "process-control-computer": "process-control-computer",
    "monitoring-analytics": "monitoring-analytics",
    "pressure-measurement": "monitoring-analytics",
    "integration-automation": "integration-automation",
    "high-pressure-metering": "high-pressure-metering",
    "low-pressure-metering": "low-pressure-metering",
    "pentane-capable-metering": "pentane-capable-metering-machines",
    "urethane-foam-mixing-guns": "urethane-foam-mixing-guns",
    "bulk-chemical-storage": "bulk-chemical-storage",
    "fill-mix": "polyurethane",
}

# Group slugs are dropped when a more specific category in that group is present.
GROUP_OF = {
    "adhesives-sealants": "adhesives-sealants",
    "single-component": "adhesives-sealants",
    "two-component": "adhesives-sealants",
    "putty-paste": "adhesives-sealants",
    "smc-imc-molding": "adhesives-sealants",
    "tooling-paste": "adhesives-sealants",
    "composites": "composites",
    "closed-mold-technology": "composites",
    "filament-winding": "composites",
    "open-mold-technology": "composites",
    "pull-winding": "composites",
    "lubrication": "lubrication",
    "metering": "lubrication",
    "pressure-control": "lubrication",
    "flow-regulation": "lubrication",
    "dispensing": "lubrication",
    "feeding-and-supply": "lubrication",
    "paint-coatings": "paint-coatings",
    "protective-coatings": "paint-coatings",
    "spray-systems": "paint-coatings",
    "process-control": "process-control",
    "integration-automation": "process-control",
    "monitoring-analytics": "process-control",
    "process-control-computer": "process-control",
    "polyurethane": "polyurethane",
    "bulk-chemical-storage": "polyurethane",
    "high-pressure-metering": "polyurethane",
    "low-pressure-metering": "polyurethane",
    "pentane-capable-metering-machines": "polyurethane",
    "urethane-foam-mixing-guns": "polyurethane",
}

GROUP_SLUGS = {
    "adhesives-sealants",
    "composites",
    "lubrication",
    "paint-coatings",
    "process-control",
    "polyurethane",
}

CATEGORY_ORDER = list(dict.fromkeys(GROUP_OF.keys()))

SVG_RE = re.compile(r"<svg\b[^>]*>.*?</svg>", re.I | re.S)
SKIP_LINE = re.compile(r"request a quote", re.I)


def text_of(el: ET.Element, tag: str) -> str:
    return el.findtext(tag, default="", namespaces=NS) or ""


def plain(value: str) -> str:
    value = SVG_RE.sub("", value)
    value = re.sub(r"<br\s*/?>", " ", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def list_items(value: str) -> list[str]:
    items = [plain(piece) for piece in re.findall(r"<li[^>]*>(.*?)</li>", value, flags=re.I | re.S)]
    return [item for item in items if item and not SKIP_LINE.search(item)]


class SectionParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.sections: list[dict] = []
        self.current: dict = {"paragraphs": [], "items": [], "images": []}
        self.buf: list[str] = []
        self.mode: str | None = None
        self.skip_depth = 0
        self.heading_depth = 0

    def flush_text(self) -> str:
        text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        self.buf = []
        return text

    def start_section(self, heading: str | None = None) -> None:
        self.close_section()
        self.current = {"paragraphs": [], "items": [], "images": []}
        if heading:
            self.current["heading"] = heading

    def close_section(self) -> None:
        pending = self.flush_text()
        if pending and self.mode == "item":
            self.current["items"].append(pending)
        elif pending and not SKIP_LINE.search(pending):
            self.current["paragraphs"].append(pending)
        self.mode = None
        paragraphs = [p for p in self.current.get("paragraphs", []) if p and not SKIP_LINE.search(p)]
        items = [item for item in self.current.get("items", []) if item and not SKIP_LINE.search(item)]
        images = self.current.get("images", [])
        if not paragraphs and not items and not images and "heading" not in self.current:
            return
        if "heading" in self.current and not paragraphs and not items and not images:
            return
        section = {}
        if "heading" in self.current:
            section["heading"] = self.current["heading"]
        if paragraphs:
            section["paragraphs"] = paragraphs
        if items:
            section["items"] = items
        if images:
            section["images"] = images
        self.sections.append(section)
        self.current = {"paragraphs": [], "items": [], "images": []}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {key: value or "" for key, value in attrs}
        if tag == "svg":
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag in {"h2", "h3", "h4"}:
            self.flush_text()
            self.mode = "heading"
            self.heading_depth += 1
            return
        if tag == "li":
            self.flush_text()
            self.mode = "item"
            return
        if tag == "img":
            src = attr.get("src", "")
            if src.startswith("http"):
                self.current["images"].append({"src": src, "alt": plain(attr.get("alt", ""))})
            return
        if tag == "br":
            self.buf.append(" ")

    def handle_endtag(self, tag: str) -> None:
        if tag == "svg" and self.skip_depth:
            self.skip_depth -= 1
            return
        if self.skip_depth:
            return
        if tag in {"h2", "h3", "h4"} and self.heading_depth:
            self.heading_depth -= 1
            heading = self.flush_text()
            if heading and not SKIP_LINE.search(heading):
                if self.current.get("paragraphs") or self.current.get("items") or self.current.get("images"):
                    self.start_section(heading)
                else:
                    self.current["heading"] = heading
            self.mode = None
            return
        if tag == "li" and self.mode == "item":
            item = self.flush_text()
            if item:
                self.current["items"].append(item)
            self.mode = None
            return
        if tag == "p":
            paragraph = self.flush_text()
            if paragraph and not SKIP_LINE.search(paragraph):
                self.current["paragraphs"].append(paragraph)
            self.mode = None

    def handle_data(self, data: str) -> None:
        if self.skip_depth:
            return
        if data.strip() or self.buf:
            self.buf.append(data)


def sections_from_html(value: str) -> list[dict]:
    cleaned = SVG_RE.sub("", value)
    parser = SectionParser()
    parser.feed(cleaned)
    parser.close_section()
    return parser.sections


def sections_from_lists(metas: dict[str, str]) -> list[dict]:
    sections = []
    for key, heading in (
        ("features", "Features"),
        ("key_applications", "Key applications"),
        ("materials", "Key materials"),
    ):
        items = list_items(metas.get(key, ""))
        if items:
            sections.append({"heading": heading, "items": items})
    return sections


def normalize_categories(nicenames: list[str]) -> list[str]:
    slugs = []
    for name in nicenames:
        if name == "products":
            continue
        mapped = CATEGORY_MAP.get(name)
        if not mapped:
            raise SystemExit(f"unmapped category: {name}")
        if mapped not in slugs:
            slugs.append(mapped)
    groups_with_child = {
        GROUP_OF[slug] for slug in slugs if slug not in GROUP_SLUGS and slug in GROUP_OF
    }
    slugs = [slug for slug in slugs if slug not in groups_with_child]
    return sorted(slugs, key=lambda slug: CATEGORY_ORDER.index(slug))


def filename_for(url: str) -> str:
    name = urllib.parse.unquote(url.rstrip("/").split("/")[-1])
    name = re.sub(r"[^A-Za-z0-9._-]+", "-", name)
    return name


import urllib.parse  # noqa: E402


def download(url: str, dest: Path) -> None:
    if dest.exists() and dest.stat().st_size > 0:
        return
    request = urllib.request.Request(url, headers={"User-Agent": "kirkco-import"})
    with urllib.request.urlopen(request, timeout=60, context=ssl.create_default_context()) as response:
        dest.write_bytes(response.read())


def main() -> None:
    tree = ET.parse(XML)
    items = tree.getroot().find("channel").findall("item")
    attachments: dict[str, dict] = {}
    posts = []
    for item in items:
        if text_of(item, "wp:post_type") == "attachment":
            url = text_of(item, "wp:attachment_url")
            alt = ""
            for meta in item.findall("wp:postmeta", NS):
                if text_of(meta, "wp:meta_key") == "_wp_attachment_image_alt":
                    alt = plain(text_of(meta, "wp:meta_value"))
            attachments[text_of(item, "wp:post_id")] = {"url": url, "alt": alt}
            continue
        if text_of(item, "wp:post_type") != "post":
            continue
        metas = {}
        for meta in item.findall("wp:postmeta", NS):
            key = text_of(meta, "wp:meta_key")
            if not key.startswith("_"):
                metas[key] = text_of(meta, "wp:meta_value")
            elif key == "_thumbnail_id":
                metas[key] = text_of(meta, "wp:meta_value")
        cats = []
        for cat in item.findall("category"):
            if cat.get("domain") == "product-category":
                cats.append(cat.get("nicename") or "")
        posts.append(
            {
                "slug": text_of(item, "wp:post_name"),
                "title": plain(item.findtext("title") or ""),
                "updated": text_of(item, "wp:post_modified")[:10],
                "tagline": plain(metas.get("product_tagline", "")),
                "summary": plain(metas.get("hero_content", "")),
                "categories": normalize_categories(cats),
                "thumb": metas.get("_thumbnail_id", ""),
                "body": text_of(item, "content:encoded"),
                "metas": metas,
            }
        )

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    url_to_src: dict[str, str] = {}

    def local_src(url: str) -> str:
        if url in url_to_src:
            return url_to_src[url]
        name = filename_for(url)
        dest = IMAGE_DIR / name
        download(url, dest)
        src = f"/products/{name}"
        url_to_src[url] = src
        return src

    products = []
    for post in posts:
        if post["slug"] == "bulk-chemical-storage":
            continue
        sections = sections_from_html(post["body"])
        if not sections:
            sections = sections_from_lists(post["metas"])
        for key, heading in (
            ("section_1_heading", "section_1_description"),
            ("section_2_heading", "section_2_description"),
            ("section_3_heading", "section_3_description"),
            ("section_4_heading", "section_4_description"),
        ):
            section_heading = plain(post["metas"].get(key, ""))
            section_body = plain(post["metas"].get(heading, ""))
            if section_heading or section_body:
                section = {}
                if section_heading:
                    section["heading"] = section_heading
                if section_body:
                    section["paragraphs"] = [section_body]
                sections.append(section)
        for section in sections:
            images = []
            for image in section.pop("images", []):
                images.append(
                    {
                        "src": local_src(image["src"]),
                        **({"alt": image["alt"]} if image["alt"] else {}),
                    }
                )
            if images:
                section["images"] = images
        record = {
            "slug": post["slug"],
            "title": post["title"],
            "updated": post["updated"],
            "categories": post["categories"],
        }
        if post["tagline"]:
            record["tagline"] = post["tagline"]
        if post["summary"]:
            record["summary"] = post["summary"]
        if sections:
            record["sections"] = sections
        else:
            record["thin"] = True
        thumb = attachments.get(post["thumb"])
        if thumb and thumb["url"]:
            record["image"] = {
                "src": local_src(thumb["url"]),
                "alt": thumb["alt"] or post["title"],
            }
        products.append(record)

    products.sort(key=lambda product: product["title"].lower())
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(products, indent=2) + "\n", encoding="utf-8")
    thin = [product["slug"] for product in products if product.get("thin")]
    print(f"products {len(products)}")
    print(f"thin {len(thin)}")
    print("thin slugs:", ", ".join(thin))
    print(f"images {len(list(IMAGE_DIR.iterdir()))}")
    missing = [product["slug"] for product in products if not product["categories"]]
    print("uncategorized", missing)


if __name__ == "__main__":
    main()
