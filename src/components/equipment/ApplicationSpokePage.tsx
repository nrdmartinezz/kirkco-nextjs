import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { JsonLd } from '@/components/seo/JsonLd';
import { getEquipmentSubcategoryPage } from '@/lib/equipment-content';
import { getEquipmentPage } from '@/lib/equipment';
import { spokeHref, type ApplicationStudy } from '@/lib/applications';

export async function ApplicationSpokePage({ study }: { study: ApplicationStudy }) {
  const href = spokeHref(study);
  if (!href || !study.pillarHref) return null;

  const pillar = await getEquipmentPage(study.pillarHref);
  const subcategory = study.subcategoryHref ? getEquipmentSubcategoryPage(study.subcategoryHref) : undefined;
  const pillarLabel = pillar?.title ?? 'Equipment category';
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Equipment Options', href: '/equipment-options' },
    { name: pillarLabel, href: study.pillarHref },
    { name: study.title, href },
  ];

  return (
    <>
      <JsonLd breadcrumbs={crumbs} />
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="text-ink-muted text-sm">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
            {crumbs.map((crumb, index) => {
              const current = index === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-1">
                  {index > 0 && <span aria-hidden>-</span>}
                  {current ? (
                    <span className="text-ink-base font-semibold" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <p className="text-brand-700 mt-6 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
          <span aria-hidden className="bg-brand-700 h-px w-4" />
          NDA Protected Application
        </p>
        <Heading level={1} size="xl" className="mt-3 max-w-4xl">
          {study.title}
        </Heading>
        <div className="mt-8 flex max-w-3xl flex-col gap-8">
          {study.sections.map((section) => (
            <section key={section.heading}>
              <Heading level={2} size="md">
                {section.heading}
              </Heading>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-ink-muted mt-3 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          <Link href={study.pillarHref} className="text-brand-700 no-underline hover:text-brand-500">
            {pillarLabel}
          </Link>
          {subcategory && (
            <Link href={subcategory.href} className="text-brand-700 no-underline hover:text-brand-500">
              {subcategory.title}
            </Link>
          )}
        </p>
      </Container>
    </>
  );
}
