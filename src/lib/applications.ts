import { cache } from 'react';
import baseStudies from '@/content/applications.json';
import generatedStudies from '@/content/equipment/generated/application-studies.json';
import { supabaseAnon } from '@/lib/supabase';

function hasSupabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

export type ApplicationSection = {
  heading: string;
  paragraphs: string[];
};

export type ApplicationStudy = {
  id: string;
  title: string;
  nda: boolean;
  /** Category page this project supports. Set only when the copy is distinct enough for its own URL. */
  pillarHref?: string;
  /** Equipment subcategory this project belongs to. */
  subcategoryHref?: string;
  sections: ApplicationSection[];
};

type ApplicationRow = {
  id: string;
  title: string;
  nda: boolean;
  sections: ApplicationSection[];
};

function toStudy(row: ApplicationRow): ApplicationStudy {
  const local = localStudies.get(row.id);
  return {
    id: row.id,
    title: row.title,
    nda: row.nda,
    pillarHref: local?.pillarHref,
    subcategoryHref: local?.subcategoryHref,
    sections: row.sections,
  };
}

export function spokeHref(study: Pick<ApplicationStudy, 'id' | 'pillarHref'>) {
  return study.pillarHref ? `${study.pillarHref}/applications/${study.id}` : undefined;
}

export function spokePaths() {
  return [...localStudies.values()].flatMap((study) => {
    const href = spokeHref(study);
    return href ? [href] : [];
  });
}

export function sectionParagraph(study: ApplicationStudy, heading: string) {
  return study.sections.find((section) => section.heading === heading)?.paragraphs[0];
}

/** Overview plus the outcome sentence used on the pillar and subcategory proof cards. */
export function proofExcerpt(study: ApplicationStudy) {
  return {
    overview: sectionParagraph(study, 'Executive Overview'),
    outcome:
      sectionParagraph(study, 'Operational Performance') ??
      sectionParagraph(study, 'Performance Outcomes') ??
      sectionParagraph(study, 'Reshoring Impact'),
  };
}

export function studyDescription(study: ApplicationStudy) {
  const text = sectionParagraph(study, 'Executive Overview') ?? study.title;
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : 157)}…`;
}

const spokePattern = /^(\/equipment-options\/[^/]+)\/applications\/([^/]+)$/;

export function spokeIdFromHref(href: string) {
  const match = href.match(spokePattern);
  if (!match) return undefined;
  const [, pillarHref, id] = match;
  const local = localStudies.get(id);
  if (!local?.pillarHref || local.pillarHref !== pillarHref) return undefined;
  return id;
}

const localStudies = new Map<string, ApplicationStudy>([
  ...(baseStudies as ApplicationStudy[]).map((study) => [study.id, study] as const),
  ...(generatedStudies as ApplicationStudy[]).map((study) => [study.id, study] as const),
]);

function localApplication(id: string) {
  return localStudies.get(id);
}

export const getApplication = cache(async (id: string) => {
  if (!hasSupabase()) return localApplication(id);
  const { data, error } = await supabaseAnon().from('applications').select('id, title, nda, sections').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toStudy(data as ApplicationRow) : localApplication(id);
});

export const getApplications = cache(async (ids: string[]) => {
  if (ids.length === 0) return [];
  if (!hasSupabase()) return ids.flatMap((id) => {
    const study = localApplication(id);
    return study ? [study] : [];
  });
  const { data, error } = await supabaseAnon().from('applications').select('id, title, nda, sections').in('id', ids);
  if (error) throw new Error(error.message);
  const byId = new Map(((data ?? []) as ApplicationRow[]).map((row) => [row.id, toStudy(row)]));
  return ids.flatMap((id) => {
    const study = byId.get(id) ?? localStudies.get(id);
    return study ? [study] : [];
  });
});
