import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ContainerWidth = 'page' | 'narrow' | 'reading';
export type ContainerLayout = 'stack' | 'row' | 'bar' | 'grid';
export type ContainerAlign = 'start' | 'center' | 'end';
export type ContainerGap = 'none' | 'sm' | 'md' | 'lg';

type ContainerProps<T extends ElementType> = {
  as?: T;
  width?: ContainerWidth;
  layout?: ContainerLayout;
  align?: ContainerAlign;
  gap?: ContainerGap;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const widths: Record<ContainerWidth, string> = {
  page: 'max-w-page',
  narrow: 'max-w-narrow',
  reading: 'max-w-reading',
};

const layouts: Record<ContainerLayout, string> = {
  stack: 'flex flex-col',
  row: 'flex flex-col max-md:items-stretch md:flex-row md:items-center',
  bar: 'flex flex-row items-center',
  grid: 'grid',
};

const alignments: Record<ContainerAlign, string> = {
  start: 'items-start text-start',
  center: 'items-center text-center',
  end: 'items-end text-end',
};

const gaps: Record<ContainerGap, string> = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-block',
  lg: 'gap-12',
};

export function Container<T extends ElementType = 'div'>({
  as,
  width = 'page',
  layout = 'stack',
  align = 'start',
  gap = 'md',
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = as ?? 'div';

  return (
    <Tag
      className={cn(
        'px-gutter mx-auto w-full',
        widths[width],
        layouts[layout],
        layout !== 'grid' && layout !== 'bar' && alignments[align],
        gaps[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
