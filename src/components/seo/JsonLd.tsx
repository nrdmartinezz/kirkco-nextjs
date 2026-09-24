import { buildJsonLd, type BreadcrumbEntry, type FaqEntry } from '@/lib/schema';

type JsonLdProps = {
  breadcrumbs?: BreadcrumbEntry[];
  faqs?: FaqEntry[];
  service?: { name: string; description?: string };
};

export function JsonLd(props: JsonLdProps) {
  const jsonLd = buildJsonLd(props);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
