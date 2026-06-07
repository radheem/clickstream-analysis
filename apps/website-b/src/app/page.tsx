import HatchCta from '@/components/sections/hatch-cta';
import HatchHero from '@/components/sections/hatch-hero';
import HatchPricing from '@/components/sections/hatch-pricing';
import HatchSelectedProjects from '@/components/sections/hatch-selected-projects';
import HatchWhatICanDo from '@/components/sections/hatch-what-i-can-do';
import { getAllProjects } from '@/lib/project-work';

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <HatchHero />
      <HatchSelectedProjects projects={projects} limit={6} hideHeader />
      <HatchWhatICanDo hideHeader />
      <HatchPricing hideHeader />
      <HatchCta />
    </>
  );
}
