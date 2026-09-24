import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type SectionBackground = 'base' | 'muted' | 'inverse' | 'brand';
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';

type SectionProps<T extends ElementType> = {
  as?: T;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  clip?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const backgrounds: Record<SectionBackground, string> = {
  base: 'bg-surface-base text-ink-base',
  muted: 'bg-surface-muted text-ink-base',
  inverse: 'bg-surface-inverse text-ink-inverse',
  brand: 'bg-surface-brand text-ink-inverse',
};

const spacings: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-section-sm',
  md: 'py-section',
  lg: 'py-section-lg',
};

export function Section<T extends ElementType = 'section'>({
  as,
  background = 'base',
  spacing = 'md',
  clip = false,
  className,
  children,
  ...rest
}: SectionProps<T>) {
  const Tag = as ?? 'section';

  return (
    <Tag
      data-bg={background}
      className={cn(
        'w-full',
        backgrounds[background],
        spacings[spacing],
        clip && 'overflow-hidden',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
