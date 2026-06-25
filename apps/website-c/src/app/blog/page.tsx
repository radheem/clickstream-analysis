import BlogSection from '@/components/sections/blog-posts';
import { getAllBlogs } from '@/lib/blog';

export default function BlogPage() {
  const blogPosts = getAllBlogs();

  return <BlogSection blogPosts={blogPosts} isBlogsPage={true} />;
}
