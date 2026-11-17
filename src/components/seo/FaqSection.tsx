import { Heading } from '@/components/ui/Heading';
import type { FaqEntry } from '@/lib/schema';

export function FaqSection({ heading, items }: { heading: string; items: FaqEntry[] }) {
  if (!items.length) return null;

  return (
    <div id="faq" className="mt-12">
      <Heading level={2} size="lg">
        {heading}
      </Heading>
      <div className="mt-4">
        {items.map((item) => (
          <details key={item.question} className="border-line-base border-b py-4 first:border-t">
            <summary className="cursor-pointer text-lg font-semibold">{item.question}</summary>
            <p className="text-ink-muted mt-2 max-w-3xl leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
