import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | 'display';

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: 'display',
  2: 'xl',
  3: 'lg',
  4: 'md',
  5: 'sm',
  6: 'sm',
};

const sizes: Record<HeadingSize, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  display: 'text-5xl',
};

type HeadingProps = {
  level?: HeadingLevel;
  size?: HeadingSize;
  balance?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'h1'>, 'className' | 'children'>;

export function Heading({
  level = 2,
  size,
  balance = true,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={cn(
        'font-semibold tracking-tight',
        sizes[size ?? defaultSizeForLevel[level]],
        balance && 'text-balance',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
