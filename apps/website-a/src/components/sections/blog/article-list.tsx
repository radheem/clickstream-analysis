'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ArticleFrontmatter } from '@/lib/types';

const PAGE_SIZE = 5;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ArticleList({ articles }: { articles: ArticleFrontmatter[] }) {
  const [count, setCount] = useState(PAGE_SIZE);
  const visible = articles.slice(0, count);
  const hasMore = count < articles.length;

  return (
    <>
      {visible.map((article) => (
        <Link
          key={article.slug}
          href={`/blog/${article.slug}`}
          className="group grid gap-4 border-t border-dashed py-10 no-underline md:grid-cols-[190px_1fr] md:gap-16"
        >
          <span className="text-muted-foreground font-mono text-xs md:pt-1.5">
            {formatDate(article.date)}
          </span>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="font-display group-hover:text-accent text-xl tracking-tight transition-colors duration-300 md:text-2xl">
                {article.title}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
                {article.description}
              </p>
            </div>
            <ArrowUpRight className="text-muted-foreground group-hover:text-accent mt-1 size-4 shrink-0 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </Link>
      ))}
      {hasMore && (
        <div className="border-t border-dashed pt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCount((c) => c + PAGE_SIZE)}
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
}
