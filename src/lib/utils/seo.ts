import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/config";

const DEFAULT_IMAGE = "/opengraph-image";
const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

export const DEFAULT_KEYWORDS = [
  "Wordle answer",
  "today's Wordle",
  "Wordle hints",
  "Wordle archive",
  "Wordle solver",
  "NYT Wordle",
];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function image(path: string, alt: string) {
  return {
    url: path,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alt,
  };
}

export function buildWebsiteMetadata({
  title,
  description = SITE_TAGLINE,
  path,
  imagePath = DEFAULT_IMAGE,
  imageAlt = `${SITE_NAME} Wordle answer and hints`,
  keywords = DEFAULT_KEYWORDS,
}: {
  title: string;
  description?: string;
  path: string;
  imagePath?: string;
  imageAlt?: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image(imagePath, imageAlt)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}

export function buildArticleMetadata({
  title,
  description,
  path,
  imagePath = DEFAULT_IMAGE,
  imageAlt,
  publishedTime,
  modifiedTime,
  keywords = DEFAULT_KEYWORDS,
}: {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  imageAlt: string;
  publishedTime: string;
  modifiedTime: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image(imagePath, imageAlt)],
      publishedTime,
      modifiedTime,
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}
