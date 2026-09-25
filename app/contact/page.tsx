import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/LeadForm';
import { SimplePage } from '@/components/ui/SimplePage';
import { formattedAddress, site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <SimplePage title="Contact">
      <p className="text-ink-muted mt-4 max-w-xl">
        Call, email, or send a note. We will reply from {site.business.email}.
      </p>
      <ul className="mt-8 flex flex-col gap-3">
        <li>
          <a href={`tel:${site.business.phoneHref}`} className="font-medium no-underline">
            {site.business.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${site.business.email}`} className="font-medium no-underline">
            {site.business.email}
          </a>
        </li>
        <li>{formattedAddress}</li>
      </ul>
      <LeadForm formType="contact" />
    </SimplePage>
  );
}
