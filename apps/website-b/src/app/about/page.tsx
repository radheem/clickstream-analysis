import HatchAboutMe from '@/components/sections/hatch-about-me';
import HatchCta from '@/components/sections/hatch-cta';
import HatchExperienceGrid from '@/components/sections/hatch-experience-grid';
import HatchMyStory from '@/components/sections/hatch-my-story';

export default function AboutPage() {
  return (
    <>
      <HatchAboutMe />
      <HatchMyStory />
      <HatchExperienceGrid />
      <HatchCta />
    </>
  );
}
