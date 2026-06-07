import { AboutCta } from '@/components/sections/about/cta';
import { AboutFaq } from '@/components/sections/about/faq';
import { AboutHero } from '@/components/sections/about/hero';
import { PullQuote } from '@/components/sections/about/pull-quote';
import { MeetTheTeam } from '@/components/sections/about/team';
import { Values } from '@/components/sections/about/values';
import { WhoWeAre } from '@/components/sections/about/who-we-are';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <Values />
      <PullQuote />
      <MeetTheTeam />
      <AboutFaq />
      <AboutCta />
    </>
  );
}
