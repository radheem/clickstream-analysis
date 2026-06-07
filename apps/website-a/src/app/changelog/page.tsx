import { ChangelogContent } from '@/components/sections/changelog-content';
import { getAllChangelogs, groupByYear } from '@/lib/changelog';

export default async function ChangelogPage() {
  const entries = await getAllChangelogs();
  const grouped = groupByYear(entries);
  const latestVersion = entries[0]?.version;

  return <ChangelogContent grouped={grouped} latestVersion={latestVersion} />;
}
