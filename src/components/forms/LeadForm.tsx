'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';

const formTypes = ['contact', 'quote', 'request-a-quote'] as const;

type LeadFormProps = {
  formType: (typeof formTypes)[number];
};

const fieldClass =
  'border-line-base bg-surface-base text-ink-base mt-1 w-full rounded-md border px-3 py-2 font-normal';

export function LeadForm({ formType }: LeadFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!site.formEndpoint) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError(null);
    setPending(true);

    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          form_type: formType,
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          message: data.get('message'),
          _gotcha: data.get('_gotcha'),
        }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !payload?.ok) {
        setError(payload?.message ?? 'Something went wrong. Please try again.');
        setPending(false);
        return;
      }
      router.push('/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative mt-8 flex flex-col gap-4">
      <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="text-brand-700 text-sm font-semibold">
        Name
        <input name="name" required autoComplete="name" className={fieldClass} />
      </label>
      <label className="text-brand-700 text-sm font-semibold">
        Email
        <input name="email" type="email" required autoComplete="email" className={fieldClass} />
      </label>
      <label className="text-brand-700 text-sm font-semibold">
        Phone
        <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </label>
      <label className="text-brand-700 text-sm font-semibold">
        Message
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" disabled={pending} className="w-fit rounded-full">
        {pending ? 'Sending…' : 'Send'}
      </Button>
    </form>
  );
}
