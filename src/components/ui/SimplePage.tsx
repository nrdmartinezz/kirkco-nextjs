import type { ReactNode } from 'react';
import { Container } from './Container';
import { Heading } from './Heading';
import { Section } from './Section';

type SimplePageProps = {
  title: string;
  children?: ReactNode;
};

export function SimplePage({ title, children }: SimplePageProps) {
  return (
    <Section>
      <Container width="narrow">
        <Heading level={1}>{title}</Heading>
        {children}
      </Container>
    </Section>
  );
}
