import Link from 'next/link';
import { Heading } from '@/components/ui/Heading';
import { proofExcerpt, spokeHref, type ApplicationStudy } from '@/lib/applications';

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

function StudyLabel({ nda }: { nda: boolean }) {
  return (
    <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
      <span aria-hidden className="bg-brand-700 h-px w-4" />
      {nda ? 'NDA Protected Application' : 'Application Architecture'}
    </p>
  );
}

function FullStudy({ study }: { study: ApplicationStudy }) {
  const midpoint = Math.ceil(study.sections.length / 2);
  const columns = [study.sections.slice(0, midpoint), study.sections.slice(midpoint)];
  return (
    <article className={cardClass}>
      <StudyLabel nda={study.nda} />
      <Heading level={2} size="lg" className="mt-3">
        {study.title}
      </Heading>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-5">
            {column.map((section) => (
              <div key={section.heading}>
                <Heading level={3} size="sm">
                  {section.heading}
                </Heading>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-ink-muted mt-2 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

function ProofCard({
  study,
  pillarLabel,
  showPillarLink,
}: {
  study: ApplicationStudy;
  pillarLabel: string;
  showPillarLink: boolean;
}) {
  const href = spokeHref(study);
  const { overview, outcome } = proofExcerpt(study);
  return (
    <article className={cardClass}>
      <StudyLabel nda={study.nda} />
      <Heading level={2} size="lg" className="mt-3">
        {href ? (
          <Link href={href} className="text-ink-base no-underline hover:text-brand-700">
            {study.title}
          </Link>
        ) : (
          study.title
        )}
      </Heading>
      {overview && <p className="text-ink-muted mt-4 leading-relaxed">{overview}</p>}
      {href && outcome && <p className="text-ink-muted mt-3 leading-relaxed">{outcome}</p>}
      {href && (
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          <Link href={href} className="text-brand-700 no-underline hover:text-brand-500">
            Read the full application
          </Link>
          {showPillarLink && study.pillarHref && (
            <Link href={study.pillarHref} className="text-brand-700 no-underline hover:text-brand-500">
              {pillarLabel}
            </Link>
          )}
        </p>
      )}
    </article>
  );
}

export function ApplicationStudyArticles({
  studies,
  pillarLabel = 'Category overview',
  showPillarLink = true,
}: {
  studies: ApplicationStudy[];
  pillarLabel?: string;
  showPillarLink?: boolean;
}) {
  if (studies.length === 0) return null;

  return (
    <div className="mt-12 flex flex-col gap-6">
      {studies.map((study) =>
        study.pillarHref || study.nda ? (
          <ProofCard key={study.id} study={study} pillarLabel={pillarLabel} showPillarLink={showPillarLink} />
        ) : (
          <FullStudy key={study.id} study={study} />
        ),
      )}
    </div>
  );
}
