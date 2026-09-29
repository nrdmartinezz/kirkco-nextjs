import pages from './industries.json';

export type TextPart = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
};

export type ContentBlock =
  | { type: 'paragraph'; parts: TextPart[] }
  | { type: 'heading'; level: 2 | 3 | 4; parts: TextPart[] }
  | { type: 'list'; items: TextPart[][] }
  | { type: 'image'; src: string; alt: string };

export type IndustrySection = {
  heading: string;
  blocks: ContentBlock[];
  image?: string;
  imageAlt?: string;
};

export type IndustryPageContent = {
  slug: string;
  href: string;
  title: string;
  parentHref?: string;
  parentTitle?: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  contentImage?: string;
  contentImageAlt?: string;
  summary: ContentBlock[];
  body: ContentBlock[];
  sections: IndustrySection[];
  extras: { heading: string; blocks: ContentBlock[] }[];
  caseStudy?: { title: string; blocks: ContentBlock[] };
  products: { title: string; href?: string; description?: string }[];
  productNotes: ContentBlock[];
  related: { title: string; href: string }[];
};

export const industryPages = pages as IndustryPageContent[];

const byHref = new Map(industryPages.map((page) => [page.href, page]));

export function getIndustryPage(href: string) {
  return byHref.get(href);
}
