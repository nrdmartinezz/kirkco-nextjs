# Adding a collection

No collection ships with the starter. A site that has no blog should not carry
routes, schemas, or an RSS endpoint for one.

When a project needs repeatable content — a blog, news, insights, projects,
case studies, whatever the client calls it — add it in the App Router. Everything
below assumes the collection is called `posts`; substitute your own name.

There is no CMS. Content lives in the repo until a project has a reason to leave it.

## 1. Add the content module

Create `src/content/posts/` and one module that is the only place pages read from.
A local TypeScript module is enough when entries are few and authored by the team:

```ts
// src/lib/posts.ts
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO, YYYY-MM-DD
  draft?: boolean;
};

const posts: Post[] = [
  {
    slug: 'first-post',
    title: 'First post',
    description: 'Short summary used on the index and in meta.',
    date: '2026-01-15',
  },
];

export function getPublished() {
  const visible =
    process.env.NODE_ENV === 'production' ? posts.filter((post) => !post.draft) : posts;
  return visible.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPublished().find((post) => post.slug === slug);
}
```

If entries are long-form Markdown, use MDX files in `src/content/posts/` plus a
small loader in `src/lib/posts.ts`. Keep the loader's return type stable so pages
do not care which storage you picked. Do not query the filesystem from inside a
shared UI component.

## 2. Add the routes

| Route | File |
| ----- | ---- |
| Index | `app/posts/page.tsx` |
| Entry | `app/posts/[slug]/page.tsx` |
| RSS   | `app/posts/rss.xml/route.ts` (optional) |

`generateStaticParams` should return `{ slug }` for every published entry.
`generateMetadata` should call `buildMetadata` from `src/lib/seo.ts` with
`path` set to `/posts/` plus the slug, so the canonical matches `site.url`.

Unknown slugs call `notFound()`.

## 3. Write the shape by hand

The `Post` type is the guardrail. Add and remove fields to match the project.
There is no schema generator to keep in sync.

Required on every entry: `slug`, `title`, `description`, `date`. Anything a
template renders without a fallback is required too.

## 4. Wire it up

- Add the collection to `src/config/navigation.ts` if it belongs in the menu.
  `app/sitemap.ts` only lists hrefs it can see on that tree, plus `/` and
  `/thank-you`. Either link every entry from the nav (unusual) or extend
  `collectHrefs()` so published posts are included.
- Drafts: `draft: true` entries render in `dev` and are filtered from production
  by `getPublished()`. Work in progress can live on `main` safely. Do not link
  a draft from the nav.

## 5. Feed blocks, don't query from them

Blocks take props. Query in the page and pass the result down:

```tsx
import { getPublished } from '@/lib/posts';

export default function HomePage() {
  const items = getPublished()
    .slice(0, 3)
    .map((post) => ({
      title: post.title,
      body: post.description,
      href: `/posts/${post.slug}`,
    }));

  return <ServicesGrid title="Latest posts" items={items} />;
}
```

This is what keeps blocks portable between projects with different content shapes.

## Removing a collection

Delete `app/posts/`, `src/lib/posts.ts`, and `src/content/posts/`. Remove the nav
entry and any sitemap special-case. The site must still build clean without it.
