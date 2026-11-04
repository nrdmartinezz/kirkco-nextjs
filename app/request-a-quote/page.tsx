import { permanentRedirect } from 'next/navigation';

export default function RequestQuotePage() {
  permanentRedirect('/quote');
}
