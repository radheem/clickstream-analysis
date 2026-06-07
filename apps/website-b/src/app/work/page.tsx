import HatchCta from '@/components/sections/hatch-cta';
import HatchWorkIndex from '@/components/sections/hatch-work-index';
import { getAllProjects } from '@/lib/project-work';

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <main className="bg-background">
      <HatchWorkIndex projects={projects} initialCount={6} pageSize={6} />
      <HatchCta />
    </main>
  );
}
