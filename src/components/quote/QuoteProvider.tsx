'use client';

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import {
  addQuoteLine,
  QUOTE_STORAGE_KEY,
  readQuoteDraft,
  removeQuoteLine,
  setQuoteNotes,
  setQuoteQty,
  writeQuoteDraft,
  type QuoteLine,
} from '@/lib/quote';

type QuoteContextValue = {
  lines: QuoteLine[];
  ready: boolean;
  add: (item: { slug: string; title: string }) => void;
  addIfMissing: (item: { slug: string; title: string }) => void;
  setQty: (slug: string, qty: number) => void;
  setNotes: (slug: string, notes: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);
const emptyLines: QuoteLine[] = [];
const quoteChange = 'kirkco-quote-change';

function onStorage(onChange: () => void) {
  return (event: StorageEvent) => {
    if (event.key !== QUOTE_STORAGE_KEY) return;
    onChange();
  };
}

function subscribeQuote(onChange: () => void) {
  const storage = onStorage(onChange);
  window.addEventListener('storage', storage);
  window.addEventListener(quoteChange, onChange);
  return () => {
    window.removeEventListener('storage', storage);
    window.removeEventListener(quoteChange, onChange);
  };
}

function publish(lines: QuoteLine[]) {
  writeQuoteDraft(lines);
  window.dispatchEvent(new Event(quoteChange));
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribeQuote, readQuoteDraft, () => emptyLines);
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const add = useCallback((item: { slug: string; title: string }) => {
    publish(addQuoteLine(readQuoteDraft(), item));
  }, []);

  const addIfMissing = useCallback((item: { slug: string; title: string }) => {
    const current = readQuoteDraft();
    if (current.some((line) => line.slug === item.slug)) return;
    publish(addQuoteLine(current, item));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    publish(setQuoteQty(readQuoteDraft(), slug, qty));
  }, []);

  const setNotes = useCallback((slug: string, notes: string) => {
    publish(setQuoteNotes(readQuoteDraft(), slug, notes));
  }, []);

  const remove = useCallback((slug: string) => {
    publish(removeQuoteLine(readQuoteDraft(), slug));
  }, []);

  const clear = useCallback(() => {
    publish([]);
  }, []);

  const value = useMemo(
    () => ({ lines, ready, add, addIfMissing, setQty, setNotes, remove, clear }),
    [lines, ready, add, addIfMissing, setQty, setNotes, remove, clear],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) throw new Error('useQuote must be used within QuoteProvider');
  return value;
}
