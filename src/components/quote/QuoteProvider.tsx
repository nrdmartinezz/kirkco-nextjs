'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
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

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readQuoteDraft());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeQuoteDraft(lines);
  }, [lines, ready]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== QUOTE_STORAGE_KEY) return;
      setLines(readQuoteDraft());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const add = useCallback((item: { slug: string; title: string }) => {
    setLines((current) => addQuoteLine(current, item));
  }, []);

  const addIfMissing = useCallback((item: { slug: string; title: string }) => {
    setLines((current) => {
      if (current.some((line) => line.slug === item.slug)) return current;
      return addQuoteLine(current, item);
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((current) => setQuoteQty(current, slug, qty));
  }, []);

  const setNotes = useCallback((slug: string, notes: string) => {
    setLines((current) => setQuoteNotes(current, slug, notes));
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((current) => removeQuoteLine(current, slug));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
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
