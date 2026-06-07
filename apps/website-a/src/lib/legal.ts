import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';

export interface LegalFrontmatter {
  title: string;
  slug: string;
  description: string;
  lastUpdated: string;
}

export interface LegalPage {
  slug: string;
  content: string;
  frontmatter: LegalFrontmatter;
}

const legalDirectory = path.join(process.cwd(), 'content/legal');

export async function getLegalSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(legalDirectory);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace('.mdx', ''));
  } catch (error) {
    console.error('Error reading legal directory:', error);
    return [];
  }
}

export async function getLegalPageBySlug(
  slug: string,
): Promise<LegalPage | null> {
  try {
    const fullPath = path.join(legalDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(fullPath, 'utf8');

    const { frontmatter } = await compileMDX<LegalFrontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true },
    });

    return {
      slug,
      content: fileContents,
      frontmatter,
    };
  } catch (error) {
    console.error(`Error reading legal page ${slug}:`, error);
    return null;
  }
}
