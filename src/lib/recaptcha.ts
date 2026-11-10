import { site } from '@/config/site';

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let loading: Promise<void> | null = null;

function actionName(action: string) {
  return action.replace(/[^A-Za-z0-9/_]/g, '_') || 'submit';
}

function loadRecaptcha(siteKey: string) {
  if (window.grecaptcha) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error('reCAPTCHA failed to load'));
    };
    document.head.appendChild(script);
  });

  return loading;
}

/** Returns a v3 token, or `''` when no site key is configured. */
export async function recaptchaToken(action: string) {
  const siteKey = site.recaptchaSiteKey;
  if (!siteKey) return '';

  await loadRecaptcha(siteKey);
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) throw new Error('reCAPTCHA failed to load');

  await new Promise<void>((resolve) => {
    grecaptcha.ready(resolve);
  });

  return grecaptcha.execute(siteKey, { action: actionName(action) });
}
