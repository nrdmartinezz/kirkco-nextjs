import { cache } from 'react';
import { supabaseAnon } from '@/lib/supabase';

export type ApplicationSection = {
  heading: string;
  paragraphs: string[];
};

export type ApplicationStudy = {
  id: string;
  title: string;
  nda: boolean;
  sections: ApplicationSection[];
};

type ApplicationRow = {
  id: string;
  title: string;
  nda: boolean;
  sections: ApplicationSection[];
};

function toStudy(row: ApplicationRow): ApplicationStudy {
  return { id: row.id, title: row.title, nda: row.nda, sections: row.sections };
}

export const getApplication = cache(async (id: string) => {
  const { data, error } = await supabaseAnon().from('applications').select('id, title, nda, sections').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toStudy(data as ApplicationRow) : undefined;
});

export const getApplications = cache(async (ids: string[]) => {
  if (ids.length === 0) return [];
  const { data, error } = await supabaseAnon().from('applications').select('id, title, nda, sections').in('id', ids);
  if (error) throw new Error(error.message);
  const byId = new Map(((data ?? []) as ApplicationRow[]).map((row) => [row.id, toStudy(row)]));
  return ids.flatMap((id) => {
    const study = byId.get(id);
    return study ? [study] : [];
  });
});
