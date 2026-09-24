import type { Metadata } from 'next';
import Link from 'next/link';
import { SimplePage } from '@/components/ui/SimplePage';
import { navigation } from '@/config/navigation';

export const metadata: Metadata = { title: 'Services' };

export default function ServicesPage() {
  const panel = navigation.primary.find((item) => item.label === 'Services')?.panel;
  const groups = panel?.kind === 'mega' ? panel.columns : [];

  return (
    <SimplePage title="Services">
      <div className="mt-8 grid gap-8">
        {groups.map((group) => (
          <div key={group.heading}>
            {group.heading && <h2 className="text-xl font-semibold">{group.heading}</h2>}
            <ul className="mt-3 flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium no-underline">
                    {link.label}
                  </Link>
                  {link.description && <p className="text-ink-muted text-sm">{link.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SimplePage>
  );
}
