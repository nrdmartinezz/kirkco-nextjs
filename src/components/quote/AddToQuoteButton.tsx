'use client';

import { Button } from '@/components/ui/Button';
import { useQuote } from './QuoteProvider';

export function AddToQuoteButton({
  slug,
  title,
  compact = false,
}: {
  slug: string;
  title: string;
  compact?: boolean;
}) {
  const { lines, add, ready } = useQuote();
  const line = lines.find((item) => item.slug === slug);

  return (
    <div className={compact ? 'flex shrink-0 flex-wrap items-center gap-2' : 'mt-8 flex flex-wrap items-center gap-3'}>
      <Button
        type="button"
        size={compact ? 'sm' : 'md'}
        className="w-fit rounded-full"
        disabled={!ready}
        onClick={() => add({ slug, title })}
      >
        {line ? `In quote (${line.qty})` : 'Add to Quote'}
      </Button>
      {line && (
        <Button href="/quote" variant="secondary" size={compact ? 'sm' : 'md'} className="w-fit rounded-full">
          Review quote
        </Button>
      )}
    </div>
  );
}
