'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MessageCircle, Minus, Plus, X } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { LeadForm } from '@/components/forms/LeadForm';
import { Button } from '@/components/ui/Button';
import { useQuote } from '@/components/quote/QuoteProvider';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { QUOTE_MAX_QTY, QUOTE_NOTES_MAX } from '@/lib/quote';
import { addressHasAnyField, isUsZip, parseOptionalUsAddress, US_STATES } from '@/lib/us-address';

const fieldClass =
  'border-line-base bg-surface-base text-ink-base mt-1 w-full rounded-md border px-3 py-2 font-normal';

type Panel = 'contact' | 'quote';

function focusable(container: HTMLElement) {
  return [...container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])')].filter(
    (element) => !element.closest('[hidden]') && element.getClientRects().length > 0,
  );
}

export function ContactDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>('contact');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const contactTabId = useId();
  const quoteTabId = useId();
  const contactPanelId = useId();
  const quotePanelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    const frame = window.requestAnimationFrame(() => dialog?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;
      const items = focusable(dialog);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
      else buttonRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close contact panel"
          className="fixed inset-0 z-60 bg-brand-900/40 motion-reduce:transition-none"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="fixed right-4 bottom-4 z-70">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          inert={!open}
          aria-hidden={!open}
          className={cn(
            'absolute right-0 bottom-full mb-3 flex max-h-[min(36rem,calc(100dvh-6rem))] w-[min(28rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-[#e4f0ff] bg-white shadow-[0_12px_40px_rgba(13,34,68,0.18)] transition duration-200 outline-none motion-reduce:translate-y-0 motion-reduce:transition-none',
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
          )}
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#e4f0ff] p-4">
            <div className="min-w-0">
              <h2 id={titleId} className="font-heading text-brand-700 text-lg font-bold">
                Contact or request a quote
              </h2>
              <div className="mt-3 inline-flex rounded-full border border-[#e4f0ff] bg-brand-50 p-1" role="tablist" aria-label="Form">
                <button
                  type="button"
                  role="tab"
                  id={contactTabId}
                  aria-selected={panel === 'contact'}
                  aria-controls={contactPanelId}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm font-semibold',
                    panel === 'contact' ? 'bg-brand-500 text-white' : 'text-brand-700',
                  )}
                  onClick={() => setPanel('contact')}
                >
                  Contact
                </button>
                <button
                  type="button"
                  role="tab"
                  id={quoteTabId}
                  aria-selected={panel === 'quote'}
                  aria-controls={quotePanelId}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm font-semibold',
                    panel === 'quote' ? 'bg-brand-500 text-white' : 'text-brand-700',
                  )}
                  onClick={() => setPanel('quote')}
                >
                  Request a Quote
                </button>
              </div>
            </div>
            <button
              type="button"
              className="text-brand-700 hover:bg-brand-50 inline-flex size-9 shrink-0 items-center justify-center rounded-full"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close</span>
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div id={contactPanelId} role="tabpanel" aria-labelledby={contactTabId} hidden={panel !== 'contact'}>
              <LeadForm formType="contact" />
            </div>
            <div id={quotePanelId} role="tabpanel" aria-labelledby={quoteTabId} hidden={panel !== 'quote'}>
              <QuotePanel />
            </div>
          </div>
        </div>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          className="bg-brand-500 hover:bg-brand-700 inline-flex size-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(47,137,247,0.35)]"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">Contact or request a quote</span>
          <MessageCircle className="size-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

function QuotePanel() {
  const router = useRouter();
  const { lines, ready, setQty, setNotes, remove, clear } = useQuote();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const addressRequired = addressHasAnyField({ street, city, state, zip });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!site.formEndpoint || lines.length === 0) return;

    const data = new FormData(event.currentTarget);
    const address = parseOptionalUsAddress({ street, city, state, zip });
    if (address.ok === false) {
      setError(address.message);
      return;
    }

    setError(null);
    setPending(true);

    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          form_type: 'quote',
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          message: data.get('message'),
          _gotcha: data.get('_gotcha'),
          payload: {
            lines: lines.map((line) => ({
              slug: line.slug,
              title: line.title,
              qty: line.qty,
              notes: line.notes,
            })),
            company: {
              name: data.get('company'),
              address: address.address,
            },
          },
        }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !result?.ok) {
        setError(result?.message ?? 'Something went wrong. Please try again.');
        setPending(false);
        return;
      }
      clear();
      router.push('/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
      setPending(false);
    }
  }

  if (!ready) return null;
  if (!site.formEndpoint) return <p className="text-ink-muted">The quote form is not available right now.</p>;

  return (
    <div className="flex flex-col gap-4">
      {lines.length === 0 ? (
        <p className="text-ink-muted rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-4 text-sm leading-relaxed">
          Add at least one product from an <TextLink href="/equipment-options">equipment page</TextLink>, or{' '}
          <TextLink href="/quote">search the quote list</TextLink>, before sending.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {lines.map((line) => (
            <li
              key={line.slug}
              className="rounded-2xl border border-brand-100 border-l-4 border-l-brand-500 bg-brand-50 p-4 shadow-[0_1px_3px_rgba(21,101,192,0.1)]"
            >
              <div className="flex items-start justify-between gap-3">
                <Link href={`/${line.slug}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                  {line.title}
                </Link>
                <button
                  type="button"
                  className="text-ink-muted hover:text-ink-base inline-flex size-9 items-center justify-center rounded-md hover:bg-white"
                  onClick={() => remove(line.slug)}
                >
                  <span className="sr-only">Remove {line.title}</span>
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 inline-flex items-center rounded-md border border-brand-100 bg-white">
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center"
                  onClick={() => setQty(line.slug, line.qty - 1)}
                  disabled={line.qty <= 1}
                >
                  <span className="sr-only">Decrease quantity</span>
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <input
                  aria-label={`Quantity for ${line.title}`}
                  inputMode="numeric"
                  className="w-12 border-x border-line-base py-1 text-center"
                  value={line.qty}
                  onChange={(event) => {
                    const next = Number.parseInt(event.target.value, 10);
                    if (Number.isInteger(next)) setQty(line.slug, next);
                  }}
                />
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center"
                  onClick={() => setQty(line.slug, Math.min(QUOTE_MAX_QTY, line.qty + 1))}
                  disabled={line.qty >= QUOTE_MAX_QTY}
                >
                  <span className="sr-only">Increase quantity</span>
                  <Plus className="size-4" aria-hidden="true" />
                </button>
              </div>
              <label className="text-brand-700 mt-3 block text-sm font-semibold">
                Notes
                <textarea
                  rows={2}
                  maxLength={QUOTE_NOTES_MAX}
                  value={line.notes ?? ''}
                  onChange={(event) => setNotes(line.slug, event.target.value)}
                  className={fieldClass}
                />
              </label>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit} className="relative flex flex-col gap-4">
        <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
          <label>
            Leave this field empty
            <input name="_gotcha" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <Field label="Name">
          <input name="name" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </Field>
        <Field label="Company (required)">
          <input name="company" required autoComplete="organization" className={fieldClass} />
        </Field>
        <fieldset className="flex flex-col gap-4">
          <legend className="text-brand-700 text-sm font-semibold">US company address (optional)</legend>
          <Field label="Street">
            <input
              autoComplete="street-address"
              required={addressRequired}
              value={street}
              onChange={(event) => setStreet(event.target.value)}
              className={fieldClass}
            />
          </Field>
          <Field label="City">
            <input
              autoComplete="address-level2"
              required={addressRequired}
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={fieldClass}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="State">
              <select
                autoComplete="address-level1"
                required={addressRequired}
                value={state}
                onChange={(event) => setState(event.target.value)}
                className={fieldClass}
              >
                <option value="">Select</option>
                {US_STATES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="ZIP">
              <input
                autoComplete="postal-code"
                inputMode="numeric"
                required={addressRequired}
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                pattern="\d{5}(?:-\d{4})?"
                className={fieldClass}
              />
            </Field>
          </div>
          {addressRequired && zip && !isUsZip(zip) && (
            <p className="text-sm text-red-700">Use a US ZIP code (12345 or 12345-6789).</p>
          )}
        </fieldset>
        <Field label="Message">
          <textarea name="message" rows={4} className={fieldClass} />
        </Field>
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <Button type="submit" disabled={pending || lines.length === 0} className="w-fit rounded-full">
          {pending ? 'Sending…' : 'Send'}
        </Button>
        {lines.length === 0 && <p className="text-ink-muted text-sm">Add at least one product before sending.</p>}
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="text-brand-700 text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-brand-700 font-semibold underline hover:text-brand-500">
      {children}
    </Link>
  );
}
