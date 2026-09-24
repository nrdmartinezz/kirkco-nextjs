import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-500 text-neutral-0 hover:bg-brand-700 border-transparent',
  secondary: 'bg-transparent text-ink-brand border-brand-600 hover:bg-brand-50',
  ghost: 'bg-transparent text-ink-base border-transparent hover:bg-neutral-100',
  inverse: 'bg-neutral-0 text-ink-brand border-transparent hover:bg-brand-50',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-12 px-6 text-base',
  lg: 'min-h-14 px-8 text-lg',
};

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-md border font-medium no-underline transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
  href?: string;
  type?: 'button' | 'submit';
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  type = 'button',
}: ButtonProps) {
  const classes = cn(baseClass, variants[variant], sizes[size], className);

  if (href) {
    const internal = href.startsWith('/') && !href.startsWith('//');
    if (internal) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
