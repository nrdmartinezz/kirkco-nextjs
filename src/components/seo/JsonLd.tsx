import { buildJsonLd, type BreadcrumbEntry, type FaqEntry, type ProductSchema } from '@/lib/schema';

type JsonLdProps = {
  identity?: boolean;
  breadcrumbs?: BreadcrumbEntry[];
  faqs?: FaqEntry[];
  service?: { name: string; description?: string; url?: string };
  product?: ProductSchema;
};

export function JsonLd(props: JsonLdProps) {
  const jsonLd = buildJsonLd(props);
  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
