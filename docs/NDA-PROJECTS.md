# NDA projects

Each equipment category is a pillar. A project with its own copy is a spoke. The adhesives category is the worked example. Use the same steps for Composites, Polyurethane, Lubrication, Paint & Coatings, and Process Control.

The route is already generic: `/equipment-options/{group}/applications/{id}`. The next category is new content, not a new page type.

## What stays on the pillar

The category URL keeps the equipment catalog. Its quality framework stays on that page in full. Set `nda` to `false`. Do not give the framework a spoke URL.

A distinct project appears on the pillar as an NDA proof: the label, the title, the executive overview, the outcome paragraph, and a link to the spoke. The pillar does not paste the whole essay.

A project whose body matches another project's body stays a card on the pillar only. It does not get a URL until the copy is distinct. Those cards show the title and the executive overview.

## What becomes a spoke

Add the study to `src/content/applications.json`.

```json
{
  "id": "water-tank-epoxy-bonding",
  "title": "Epoxy Bonding for Prefabricated Water Tank Structures",
  "nda": true,
  "pillarHref": "/equipment-options/adhesives-sealants",
  "subcategoryHref": "/equipment-options/adhesives-sealants/two-component",
  "sections": []
}
```

`nda: true` renders as NDA Protected Application. `pillarHref` is the category page. `subcategoryHref` is the equipment page the project belongs to. Both are optional in the type. Set them only when the copy is distinct. The spoke URL is `{pillarHref}/applications/{id}`.

`sections` follow the authority document: heading, then paragraphs. Keep an Executive Overview. Keep Operational Performance, Performance Outcomes, or Reshoring Impact so the pillar can show an outcome sentence.

Drop revision headers, internal "where this fits" notes, and editor notes. Do not add customer names.

Put the study id in `applicationIds` on the category page, with the quality framework first. Put the same id on the subcategory that should show the short proof. Do not put a thin, duplicate project on a subcategory.

The spoke links back to the pillar and to `subcategoryHref`. The subcategory proof links to the spoke and back to the pillar. `app/sitemap.ts` includes every study that has `pillarHref`. No sitemap edit is required for a new spoke.

## Publish the copy

`src/content/applications.json` is the source. The site reads Supabase first and falls back to that file. After the JSON changes, run:

```bash
npm run db:seed
```

The seed needs `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. The anon key is the public key and is not the service role secret. See `docs/HOSTING.md`. Seeding updates an existing study so the hosted site does not keep a shorter copy.

## Revision stacks

A later file that only summarizes what changed is an enrichment. Merge it into the earlier full document and publish one study. When two revisions describe the same project, publish the newer full document. Do not publish website architecture reviews, expansion analyses, or other internal planning memos.
