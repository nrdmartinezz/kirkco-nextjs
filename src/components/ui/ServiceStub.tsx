import { SimplePage } from './SimplePage';

export function ServiceStub({ title, description }: { title: string; description?: string }) {
  return (
    <SimplePage title={title}>
      {description && <p className="text-ink-muted mt-4">{description}</p>}
    </SimplePage>
  );
}
