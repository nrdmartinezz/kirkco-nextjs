import { Heading } from '@/components/ui/Heading';
import type { ApplicationStudy } from '@/lib/applications';

export function ApplicationStudyArticles({ studies }: { studies: ApplicationStudy[] }) {
  if (studies.length === 0) return null;

  return (
    <div className="mt-12 flex flex-col gap-6">
      {studies.map((study) => {
        const midpoint = Math.ceil(study.sections.length / 2);
        const columns = [study.sections.slice(0, midpoint), study.sections.slice(midpoint)];
        return (
          <article
            key={study.id}
            className="rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]"
          >
            <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
              <span aria-hidden className="bg-brand-700 h-px w-4" />
              {study.nda ? 'NDA Protected Application' : 'Application Architecture'}
            </p>
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
      })}
    </div>
  );
}
