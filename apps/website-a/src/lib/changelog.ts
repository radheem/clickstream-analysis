import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

const changelogDirectory = path.join(process.cwd(), 'content/changelog');

export interface ChangelogEntry {
  version: string;
  title: string;
  date: string;
  description: string;
}

export async function getAllChangelogs(): Promise<ChangelogEntry[]> {
  const files = await fs.readdir(changelogDirectory);
  const mdFiles = files.filter((file) => file.endsWith('.md'));

  const entries = await Promise.all(
    mdFiles.map(async (file) => {
      const fullPath = path.join(changelogDirectory, file);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        version: data.version,
        title: data.title,
        date: data.date.toISOString().split('T')[0],
        description: content.trim(),
      } as ChangelogEntry;
    }),
  );

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function groupByYear(entries: ChangelogEntry[]) {
  const grouped = new Map<string, ChangelogEntry[]>();
  for (const entry of entries) {
    const year = new Date(entry.date).getFullYear().toString();
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year)!.push(entry);
  }
  return Array.from(grouped);
}
