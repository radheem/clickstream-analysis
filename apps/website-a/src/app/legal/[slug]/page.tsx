import { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { ComponentPropsWithoutRef } from 'react';

import {
  getLegalPageBySlug,
  getLegalSlugs,
  LegalFrontmatter,
} from '@/lib/legal';

function H2(props: ComponentPropsWithoutRef<'h2'>) {
  return <h2 {...props} />;
}

function P(props: ComponentPropsWithoutRef<'p'>) {
  return <p {...props} />;
}

function Ul(props: ComponentPropsWithoutRef<'ul'>) {
  return <ul {...props} />;
}

const mdxComponents: MDXComponents = {
  h2: H2,
  p: P,
  ul: Ul,
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getLegalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const { content } = await compileMDX<LegalFrontmatter>({
    source: page.content,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/home/hero-bg.webp"
          alt=""
          fill
          className="object-cover opacity-60 blur-lg dark:opacity-20"
        />
        <div className="via-background/50 to-background absolute inset-0 bg-linear-to-b from-transparent" />
      </div>
      <article className="hero-padding relative z-10">
        <div className="container max-w-3xl">
          {/* Header */}
          <header className="mb-16">
            <h1 className="font-display text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
              {page.frontmatter.title}
            </h1>
            <p className="text-muted-foreground mt-4 font-mono text-xs tracking-wider">
              Last updated{' '}
              {new Date(page.frontmatter.lastUpdated).toLocaleDateString(
                'en-US',
                {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                },
              )}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-base prose-neutral dark:prose-invert prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-headings:font-display prose-headings:tracking-tight [&>p]:text-muted-foreground [&>ul]:text-muted-foreground max-w-none [&>h2]:mt-14 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:leading-none [&>p]:leading-relaxed [&>p+p]:mt-4 [&>ul]:leading-relaxed">
            {content}
          </div>
        </div>
      </article>
    </div>
  );
}
