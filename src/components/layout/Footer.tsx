import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-neutral-100">
      <Container className="py-section-sm" gap="lg">
        <div className="grid w-full gap-10 lg:grid-cols-6">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="inline-flex no-underline">
              <Image
                src="/images/logo.jpg"
                alt={site.name}
                width={140}
                height={48}
                className="h-12 w-auto rounded-sm bg-white p-1"
              />
            </Link>
            <a href={`tel:${site.business.phoneHref}`} className="inline-flex items-center gap-2 font-semibold no-underline">
              <Phone className="size-4" aria-hidden="true" />
              {site.business.phone}
            </a>
            <a href={`mailto:${site.business.email}`} className="inline-flex items-center gap-2 no-underline">
              <Mail className="size-4" aria-hidden="true" />
              {site.business.email}
            </a>
          </div>

          {navigation.footer.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="flex flex-col gap-3">
              <h2 className="font-heading text-sm font-semibold tracking-wide text-white uppercase">{group.heading}</h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-neutral-300 no-underline hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex w-full flex-col gap-2 border-t border-white/15 pt-6 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>
            All Rights Reserved {site.name} {year}
          </p>
          <p>Designed by WebPro</p>
        </div>
      </Container>
    </footer>
  );
}
