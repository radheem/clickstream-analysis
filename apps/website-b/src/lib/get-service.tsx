import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';

export type ServiceFrontmatter = {
  title: string;
  description: string;
  price?: string;
  priceMeta?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

const SERVICES_DIR = path.join(process.cwd(), 'src', 'content', 'services');

export async function getService(
  slug: string,
): Promise<{ frontmatter: ServiceFrontmatter } | null> {
  const filePath = path.join(SERVICES_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data } = matter(raw);
    return {
      frontmatter: data as ServiceFrontmatter,
    };
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException)?.code === 'ENOENT') return null;
    throw e;
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(SERVICES_DIR);
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''));
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException)?.code === 'ENOENT') return [];
    throw e;
  }
}
