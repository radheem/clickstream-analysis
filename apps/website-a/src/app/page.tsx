import { Cta } from '@/components/sections/cta';
import { Faq } from '@/components/sections/faq';
import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { Pricing } from '@/components/sections/pricing';
import { Privacy } from '@/components/sections/privacy';
import { Showcase } from '@/components/sections/showcase';
import { Stats } from '@/components/sections/stats';
import { Testimonials } from '@/components/sections/testimonials';
import { WebPreview } from '@/components/sections/web-preview';
export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <Features />
      <WebPreview />
      <Stats />
      <Testimonials />
      <Privacy />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
