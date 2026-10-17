import type { Metadata } from "next";

// Page metadata in one place: title (the layout adds " | ASTBAL"), description, canonical URL,
// and matching share-card text. Keep titles under ~50 characters and descriptions under 160.
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ASTBAL`, description, url: path },
    twitter: { title: `${title} | ASTBAL`, description },
  };
}
