import BlogSection from '@/components/sections/blog-posts';
import FAQ from '@/components/sections/faq';
import Features from '@/components/sections/features';
import Hero from '@/components/sections/hero';
import InReality from '@/components/sections/in-reality';
import ValueProposition from '@/components/sections/value-proposition';
import WhyUs from '@/components/sections/why-us';
import { getAllBlogs } from '@/lib/blog';

export default function Home() {
  const blogPosts = getAllBlogs(3);

  return (
    <>
      <Hero />
      <ValueProposition />
      <Features />
      <WhyUs />
      <InReality />
      <FAQ />
      <BlogSection blogPosts={blogPosts} />
    </>
  );
}
