import Image from 'next/image';
import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';
import { compileMDX } from 'next-mdx-remote/rsc';

import CategoryBadge from '@/components/category-badge';
import { getBlogBySlug, getBlogSlugs } from '@/lib/blog';

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: true },
  });

  return (
    <article className="hero-padding-margin container space-y-6 md:space-y-8">
      <div>
        {/* Back button */}
        <Link href="/blog" className="group inline-block">
          <CategoryBadge
            label="Back"
            icon={
              <ChevronLeft className="!text-current transition-transform group-hover:-translate-x-0.5" />
            }
          />
        </Link>
        <h1 className="mt-3 text-2xl md:text-4xl lg:text-5xl">{post.title}</h1>
        <p className="mt-2.5 text-xl leading-8">{post.description}</p>
      </div>
      {post.coverImage && (
        <div className="relative h-[320px] overflow-hidden rounded-3xl md:h-[400px] lg:h-[600px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <time className="inline-block text-xl">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </time>

      <div className="prose-headings:font-normal prose-headings:text-3xl dark:prose-invert prose prose-xl max-w-none leading-8">
        {content}
      </div>
    </article>
  );
}
