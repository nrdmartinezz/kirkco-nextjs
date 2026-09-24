import { Button } from '@/components/ui/Button';
import { SimplePage } from '@/components/ui/SimplePage';
import { site } from '@/config/site';

export default function NotFound() {
  return (
    <SimplePage title="Page not found">
      <p className="text-ink-muted mt-4">
        That page does not exist on {site.name}. Head back home or give us a call.
      </p>
      <div className="mt-8">
        <Button href="/">Back home</Button>
      </div>
    </SimplePage>
  );
}
