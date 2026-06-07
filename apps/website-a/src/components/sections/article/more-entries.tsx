import Link from 'next/link';

import { JournalContainer } from '@/components/elements/journal-container';
import { ArticleFrontmatter } from '@/lib/types';
import { formatShortDate } from '@/lib/utils';

export function MoreEntries({ articles }: { articles: ArticleFrontmatter[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="section-padding pt-0!">
      <div className="container max-w-5xl">
        <JournalContainer>
          <div className="relative overflow-hidden px-6 py-10 text-center md:px-16 md:py-14">
            {/* Crosshatch pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 12px, var(--accent) 12px, var(--accent) 13px),
                  repeating-linear-gradient(-45deg, transparent, transparent 12px, var(--accent) 12px, var(--accent) 13px)
                `,
              }}
            />

            {/* Content */}
            <div className="relative">
              <span className="text-accent-light font-mono text-xs tracking-[0.5em]">
                * * *
              </span>
              <p className="font-display text-muted-foreground mx-auto mt-4 max-w-sm text-lg">
                Also from the journal
              </p>

              <div className="mx-auto mt-8 max-w-md space-y-6">
                {articles.slice(0, 3).map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group block no-underline"
                  >
                    <h3 className="group-hover:text-accent text-xl tracking-tight transition-colors duration-300 md:text-2xl">
                      {a.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {formatShortDate(a.date)}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-10">
                <span className="text-accent-light font-mono text-xs tracking-[0.5em]">
                  — finis —
                </span>
              </div>
            </div>
          </div>
        </JournalContainer>
      </div>
    </section>
  );
}
