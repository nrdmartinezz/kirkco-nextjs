import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/LeadForm';
import { SimplePage } from '@/components/ui/SimplePage';
import { site, formattedAddress } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact Kirkco Corporation in Monroe, NC. Call the office at 704.289.7090, sales at 800.828.7234, or email sales@kirkcocorp.com.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <SimplePage title="Contact">
      <p className="text-ink-muted mt-4 max-w-xl">
        Have a production challenge, system constraint, or performance objective that requires engineered execution?
        Kirkco Corporation engages in structured, NDA-safe discussions to define chemistry requirements, throughput
        targets, automation scope, and risk variables.
      </p>
      <ul className="mt-8 flex flex-col gap-3">
        {site.business.officePhone && site.business.officePhoneHref && (
          <li>
            <a href={`tel:${site.business.officePhoneHref}`} className="font-medium no-underline">
              Office: {site.business.officePhone}
            </a>
          </li>
        )}
        <li>
          <a href={`tel:${site.business.phoneHref}`} className="font-medium no-underline">
            Sales: {site.business.phone}
          </a>
        </li>
        {site.business.fax && (
          <li>
            Fax: {site.business.fax}
          </li>
        )}
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
