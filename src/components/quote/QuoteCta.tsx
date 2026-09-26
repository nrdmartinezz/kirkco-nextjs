'use client';

import { Button, type ButtonSize } from '@/components/ui/Button';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/cn';
import { useQuote } from './QuoteProvider';

export function QuoteCta({ size = 'md', className }: { size?: ButtonSize; className?: string }) {
  const { lines, ready } = useQuote();
  const count = lines.length;

  return (
    <Button href={navigation.cta.href} size={size} className={cn('rounded-full', className)}>
      {navigation.cta.label}
      {ready && count > 0 && (
        <span className="bg-brand-700 text-neutral-0 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold">
          {count}
          <span className="sr-only"> items in quote</span>
        </span>
      )}
    </Button>
  );
}
