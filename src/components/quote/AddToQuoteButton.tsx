'use client';

import { Button } from '@/components/ui/Button';
import { useQuote } from './QuoteProvider';

export function AddToQuoteButton({ slug, title }: { slug: string; title: string }) {
  const { lines, add, ready } = useQuote();
  const line = lines.find((item) => item.slug === slug);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Button type="button" className="w-fit rounded-full" disabled={!ready} onClick={() => add({ slug, title })}>
        {line ? `In quote (${line.qty})` : 'Add to Quote'}
      </Button>
      {line && (
        <Button href="/quote" variant="secondary" className="w-fit rounded-full">
          Review quote
        </Button>
      )}
    </div>
  );
}
