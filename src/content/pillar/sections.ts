import data from '@/content/pillar/public-sections.json';

export type PublicFamily = {
  contentKey: string;
  title: string;
  detailHref?: string;
  models: { name: string }[];
};

export type PublicSection = {
  sectionKey: string;
  heading: string;
  families: PublicFamily[];
};

export type PublicPageSections = {
  href: string;
  sections: PublicSection[];
};

const pages = (data as { pages: PublicPageSections[] }).pages;
const byHref = new Map(pages.map((page) => [page.href, page]));

export function getPublicSections(href: string) {
  return byHref.get(href);
}
