import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { categoriesFor, type Product } from '@/lib/products';

export function ProductPage({ product }: { product: Product }) {
  const categories = categoriesFor(product);

  return (
    <Section>
      <Container width="narrow">
        {product.image && (
          <img
            src={product.image.src}
            alt={product.image.alt}
            className="mb-8 h-auto w-full max-w-md"
          />
        )}
        <Heading level={1}>{product.title}</Heading>
        {product.tagline && <p className="text-ink-muted mt-4 text-xl">{product.tagline}</p>}
        {product.summary && <p className="mt-6 text-lg">{product.summary}</p>}
        {categories.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={category.href} className="text-ink-brand font-medium no-underline">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {product.sections?.map((section, index) => (
          <div key={`${section.heading ?? 'section'}-${index}`} className="mt-10">
            {section.heading && <Heading level={2}>{section.heading}</Heading>}
            {section.paragraphs?.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="mt-4">
                {paragraph}
              </p>
            ))}
            {section.items && (
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )}
            {section.images?.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt ?? ''}
                className="mt-4 h-auto max-w-full"
              />
            ))}
          </div>
        ))}
      </Container>
    </Section>
  );
}
