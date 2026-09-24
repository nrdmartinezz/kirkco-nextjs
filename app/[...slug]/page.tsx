import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SimplePage } from '@/components/ui/SimplePage';
import { stubTitles } from '@/lib/stubs';

type StubPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: StubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = stubTitles()[`/${slug.join('/')}`];
  return { title: title ?? 'Page' };
}

export default async function StubPage({ params }: StubPageProps) {
  const { slug } = await params;
  const title = stubTitles()[`/${slug.join('/')}`];
  if (!title) notFound();

  return <SimplePage title={title} />;
}
