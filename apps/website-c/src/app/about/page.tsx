import { AboutHero } from '@/components/sections/about-hero';
import AboutMission from '@/components/sections/about-mission';
import BlogSection from '@/components/sections/blog-posts';
import OurValues from '@/components/sections/our-values';
import WhySonic from '@/components/sections/why-sonic';
import { getAllBlogs } from '@/lib/blog';

export default function AboutPage() {
  const blogPosts = getAllBlogs(3);

  return (
    <>
      <AboutHero />
      <AboutMission />
      <OurValues />
      <div className="py-10 md:pt-14 lg:pt-20">
        <WhySonic />
      </div>
      <div className="pb-10 md:pb-14 lg:pb-20">
        <BlogSection blogPosts={blogPosts} />
      </div>
    </>
  );
}
