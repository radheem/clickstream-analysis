import rehypeShiki from '@shikijs/rehype';
import { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ComponentPropsWithoutRef } from 'react';

import { IconInstagram } from '@/components/icons/instagram';
import { IconThreads } from '@/components/icons/threads';
import { IconX } from '@/components/icons/x';
import { Pre } from '@/components/mdx/code-block';
import { ArticleHero, MoreEntries } from '@/components/sections/article';
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
} from '@/lib/articles';
import { ArticleFrontmatter } from '@/lib/types';

function MdxImage(props: ImageProps) {
  return (
    <div className="not-prose col-span-full my-10">
      <Image {...props} className="w-full rounded-2xl" alt={props.alt || ''} />
    </div>
  );
}

function H2(props: ComponentPropsWithoutRef<'h2'>) {
  return <h2 {...props} />;
}

function P(props: ComponentPropsWithoutRef<'p'>) {
  return <p {...props} />;
}

function Ul(props: ComponentPropsWithoutRef<'ul'>) {
  return <ul {...props} />;
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="lead text-muted-foreground">{children}</p>;
}

const mdxComponents: MDXComponents = {
  pre: Pre,
  img: MdxImage as MDXComponents['img'],
  h2: H2,
  p: P,
  ul: Ul,
  Lead,
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getAllArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const nextArticle = allArticles[currentIndex + 1] || allArticles[0];
  const otherArticles = allArticles.filter((a) => a.slug !== slug);

  const { content } = await compileMDX<ArticleFrontmatter>({
    source: article.content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypeShiki,
            {
              themes: {
                light: 'github-light',
                dark: 'github-dark',
              },
              defaultColor: false,
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return (
    <>
      <article>
        <ArticleHero
          title={article.frontmatter.title}
          description={article.frontmatter.description}
          date={article.frontmatter.date}
          image={article.frontmatter.image}
          nextSlug={nextArticle?.slug !== slug ? nextArticle?.slug : undefined}
        >
          {/* Article body — two-column editorial layout */}
          <div className="prose prose-base prose-neutral dark:prose-invert prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-lead:text-muted-foreground prose-li:marker:text-foreground [&>p]:text-muted-foreground [&>ul]:text-muted-foreground [&>h2]:text-muted-foreground [&>h2+p]:font-display [&>h2+p]:text-foreground max-w-none md:grid md:grid-cols-[190px_1fr] md:gap-x-16 md:gap-y-0 md:[&>:not(h2)]:col-start-2 [&>h2]:mt-14 [&>h2]:mb-0 [&>h2]:text-sm [&>h2]:font-normal [&>h2]:tracking-normal md:[&>h2]:col-start-1 md:[&>h2]:mt-20 md:[&>h2]:self-start md:[&>h2]:pt-1.5 [&>h2+p]:mt-2 [&>h2+p]:text-lg [&>h2+p]:leading-snug [&>h2+p]:tracking-tight md:[&>h2+p]:mt-20 md:[&>h2+p]:text-xl lg:[&>h2+p]:text-2xl [&>h2:first-child]:mt-0 [&>h2:first-child+p]:mt-2 md:[&>h2:first-child+p]:mt-0 [&>p+p]:mt-4 [&>ul]:mt-4">
            {content}
          </div>

          {/* Share — minimal */}
          <div className="border-accent-light mt-10 border-t pt-8">
            <div className="flex items-center gap-3">
              <Link
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(`https://kinto.app/blog/${slug}`)}&text=${encodeURIComponent(article.frontmatter.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="bg-accent-light hover:bg-accent-light/70 flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <IconX className="text-foreground size-4" />
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="bg-accent-light hover:bg-accent-light/70 flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <IconInstagram className="text-foreground size-4" />
              </Link>
              <Link
                href="https://threads.net/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Threads"
                className="bg-accent-light hover:bg-accent-light/70 flex size-10 items-center justify-center rounded-full transition-colors"
              >
                <IconThreads className="text-foreground size-4" />
              </Link>
            </div>
          </div>
        </ArticleHero>
      </article>

      <MoreEntries articles={otherArticles} />
    </>
  );
}
