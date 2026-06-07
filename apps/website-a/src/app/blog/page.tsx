import { BlogJournal } from '@/components/sections/blog/blog-page';
import { getAllArticles } from '@/lib/articles';

export default async function BlogPage() {
  const articles = await getAllArticles();

  return <BlogJournal articles={articles} />;
}
