import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import type { ContentBlock, IndustryPageContent, TextPart } from '@/content/industries';
import { industryPages } from '@/content/industries';
import { site } from '@/config/site';

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

function Parts({ parts, inverse = false }: { parts: TextPart[]; inverse?: boolean }) {
  return (
    <>
      {parts.map((part, index) => {
        const content = (
          <span className={part.bold ? (inverse ? 'font-semibold' : 'font-semibold text-ink-base') : part.italic ? 'italic' : undefined}>
            {part.text}
          </span>
        );
        if (!part.href) return <span key={index}>{content}</span>;
        const external = part.href.startsWith('http');
        return external ? (
          <a key={index} href={part.href} className="text-brand-700 font-semibold underline-offset-2 hover:underline">
            {content}
          </a>
        ) : (
          <Link key={index} href={part.href} className="text-brand-700 font-semibold underline-offset-2 hover:underline">
            {content}
          </Link>
        );
      })}
    </>
  );
}

function RichText({ blocks, inverse = false }: { blocks: ContentBlock[]; inverse?: boolean }) {
  const textClass = inverse ? 'leading-7 text-white/95' : 'text-ink-muted leading-7';
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <Heading key={index} level={block.level === 2 ? 2 : 3} size={block.level === 2 ? 'lg' : 'md'} className={inverse ? 'text-white' : undefined}>
              <Parts parts={block.parts} inverse={inverse} />
            </Heading>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="flex flex-col gap-2">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className={`${textClass} flex items-start gap-2`}>
                  <span aria-hidden className={`${inverse ? 'bg-white' : 'bg-brand-500'} mt-2.5 size-1.5 shrink-0 rounded-full`} />
                  <span>
                    <Parts parts={item} inverse={inverse} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'image') {
          return (
            <div key={index} className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
              <Image src={block.src} alt={block.alt} fill className="object-cover" sizes="(min-width: 1024px) 720px, 100vw" />
            </div>
          );
        }
        return (
          <p key={index} className={textClass}>
            <Parts parts={block.parts} inverse={inverse} />
          </p>
        );
      })}
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
      <span aria-hidden className="bg-brand-700 h-px w-5" />
      {children}
    </p>
  );
}

export function IndustryPage({ page }: { page: IndustryPageContent }) {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Industries' },
    ...(page.parentHref && page.parentTitle ? [{ label: page.parentTitle, href: page.parentHref }] : []),
    { label: page.title },
  ];
  const groups = industryPages.filter((entry) => !entry.parentHref);

  return (
    <>
      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-500">
        <Image src={page.heroImage} alt={page.heroImageAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-700/45" />
        <Container className="relative flex min-h-[400px] justify-center py-8">
          <div className="w-full max-w-3xl rounded-2xl bg-[rgba(19,89,187,0.28)] p-6 text-white backdrop-blur-md md:p-9">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
                {crumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1">
                    {index > 0 && <span aria-hidden>-</span>}
                    {crumb.href && index < crumbs.length - 1 ? (
                      <Link href={crumb.href} className="font-semibold text-white no-underline hover:underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={index === crumbs.length - 1 ? 'font-semibold' : undefined} aria-current={index === crumbs.length - 1 ? 'page' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              {page.title}
            </Heading>
            {page.summary.length > 0 && (
              <div className="mt-4">
                <RichText blocks={page.summary} inverse />
              </div>
            )}
            <Button href="/quote" className="mt-6 rounded-full">
              Talk to an Engineer
            </Button>
          </div>
        </Container>
      </section>

      <Section spacing="none" className="pt-8 pb-section">
        <Container gap="lg">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              {page.body.length > 0 && (
                <div className={`${cardClass} flex flex-col gap-6 md:flex-row md:items-start`}>
                  {page.contentImage && (
                    <div className="relative aspect-[4/5] w-full max-w-[300px] shrink-0 overflow-hidden rounded-[10px]">
                      <Image
                        src={page.contentImage}
                        alt={page.contentImageAlt ?? ''}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <Eyebrow>Overview</Eyebrow>
                    <div className="mt-4">
                      <RichText blocks={page.body} />
                    </div>
                  </div>
                </div>
              )}

              {page.sections.map((section, index) => (
                <article key={`${section.heading}-${index}`} className={`${cardClass} mt-8`}>
                  <div className={section.image ? 'flex flex-col gap-6 md:flex-row md:items-center' : undefined}>
                    {section.image && (
                      <div className={`relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[10px] md:w-72 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                        <Image src={section.image} alt={section.imageAlt ?? ''} fill className="object-cover" sizes="320px" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      {section.heading && (
                        <Heading level={2} size="lg">
                          {section.heading}
                        </Heading>
                      )}
                      {section.blocks.length > 0 && (
                        <div className={section.heading ? 'mt-4' : undefined}>
                          <RichText blocks={section.blocks} />
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              {page.extras.length > 0 && (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {page.extras.map((extra) => (
                    <article key={extra.heading} className={cardClass}>
                      {extra.heading && (
                        <Heading level={2} size="md">
                          {extra.heading}
                        </Heading>
                      )}
                      <div className={extra.heading ? 'mt-4' : undefined}>
                        <RichText blocks={extra.blocks} />
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {page.caseStudy && (
                <article className={`${cardClass} mt-8`}>
                  <Eyebrow>Application Architecture</Eyebrow>
                  {page.caseStudy.title && (
                    <Heading level={2} size="lg" className="mt-3">
                      {page.caseStudy.title}
                    </Heading>
                  )}
                  {page.caseStudy.blocks.length > 0 && (
                    <div className="mt-4">
                      <RichText blocks={page.caseStudy.blocks} />
                    </div>
                  )}
                </article>
              )}

              {page.products.length > 0 && (
                <div className="mt-12">
                  <Eyebrow>Related systems</Eyebrow>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {page.products.map((product) => {
                      const inner = (
                        <>
                          <span className="text-brand-700 text-lg font-bold">{product.title}</span>
                          {product.description && <span className="text-ink-muted mt-2 leading-relaxed">{product.description}</span>}
                          {product.href && (
                            <ArrowRight className="text-brand-500 mt-auto size-5 translate-y-1 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden />
                          )}
                        </>
                      );
                      return (
                        <li key={product.title}>
                          {product.href ? (
                            <Link href={product.href} className="group border-neutral-200 flex h-full flex-col gap-1 rounded-2xl border bg-white p-6 no-underline shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md">
                              {inner}
                            </Link>
                          ) : (
                            <div className="border-neutral-200 flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm">{inner}</div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {page.products.length === 0 && page.productNotes.length > 0 && (
                <article className={`${cardClass} mt-8`}>
                  <Eyebrow>Related systems</Eyebrow>
                  <div className="mt-4">
                    <RichText blocks={page.productNotes} />
                  </div>
                </article>
              )}

              {page.related.length > 0 && (
                <div className="mt-12">
                  <Eyebrow>Related industries</Eyebrow>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {page.related.map((industry) => (
                      <li key={industry.href}>
                        <Link href={industry.href} className="text-brand-700 flex items-center justify-between gap-3 rounded-xl border border-[#e4f0ff] bg-white px-4 py-3 font-semibold no-underline shadow-sm transition duration-200 hover:border-brand-500 hover:text-brand-500">
                          {industry.title}
                          <ArrowRight aria-hidden className="size-4 shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 rounded-[10px] bg-[#0d2244] p-6 md:p-8">
                <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Talk with Kirkco</p>
                <Heading level={2} size="lg" className="mt-2 text-white">
                  Let&apos;s talk systems
                </Heading>
                <p className="mt-4 max-w-3xl leading-relaxed text-[#96a9c1]">
                  Have a process challenge that cannot be solved with off-the-shelf equipment?
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/quote" className="rounded-full">
                    Request a quote
                  </Button>
                  <Button href={`tel:${site.business.phoneHref}`} variant="inverse" className="rounded-full">
                    Call us Today!
                  </Button>
                </div>
              </div>
            </div>

            <aside className="border-neutral-200 w-full shrink-0 rounded-lg border p-5 lg:sticky lg:top-28 lg:w-72">
              <Heading level={2} size="sm">
                Industries
              </Heading>
              <ul className="mt-3 flex flex-col gap-2">
                {groups.map((group) => {
                  const children = industryPages.filter((entry) => entry.parentHref === group.href);
                  const active = page.href === group.href;
                  return (
                    <li key={group.href}>
                      <Link
                        href={group.href}
                        aria-current={active ? 'page' : undefined}
                        className="text-brand-700 flex items-center gap-1.5 font-semibold no-underline hover:text-brand-500 aria-[current=page]:text-brand-500"
                      >
                        {active && <ChevronRight aria-hidden className="size-4 shrink-0" />}
                        {group.title}
                      </Link>
                      {children.length > 0 && (
                        <ul className="mt-1 ml-4 flex flex-col gap-1">
                          {children.map((child) => {
                            const childActive = page.href === child.href;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  aria-current={childActive ? 'page' : undefined}
                                  className="text-brand-700 text-sm font-semibold no-underline hover:text-brand-500 aria-[current=page]:text-brand-500"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <Heading level={2} size="sm" className="mt-8">
                Contact Us!
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                <li>
                  <a href={`tel:${site.business.phoneHref}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    Sales: {site.business.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.business.email}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    {site.business.email}
                  </a>
                </li>
                <li>
                  <Link href="/quote" className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
