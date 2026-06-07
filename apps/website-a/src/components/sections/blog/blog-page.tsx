'use client';

import { BookOpen } from 'lucide-react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { JournalContainer } from '@/components/elements/journal-container';
import { Button } from '@/components/ui/button';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { ArticleFrontmatter } from '@/lib/types';
import { formatDate, formatShortDate } from '@/lib/utils';

function CoverDesign() {
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <BookOpen className="text-accent mx-auto size-10 stroke-1" />
          <h2 className="font-display mt-4 text-3xl tracking-tight text-white md:text-4xl">
            Journal
          </h2>
          <p className="mt-2 font-mono text-[0.625rem] tracking-[0.3em] text-white/30 uppercase">
            Thoughts on writing
          </p>
          <div className="pointer-events-none absolute inset-4 rounded-xl border border-white/10" />
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
    </>
  );
}

function BackfaceMarbled() {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, var(--accent) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, var(--accent-hover) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, var(--accent) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 60%, var(--accent-hover) 0%, transparent 45%),
            radial-gradient(ellipse at 10% 20%, var(--accent) 0%, transparent 35%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(115deg, transparent, transparent 10px, var(--accent) 10px, var(--accent) 11px),
            repeating-linear-gradient(65deg, transparent, transparent 14px, var(--accent-hover) 14px, var(--accent-hover) 15px)
          `,
        }}
      />
      <div className="pointer-events-none absolute inset-3 rounded-lg border border-white/[0.04] dark:border-white/[0.08]" />
      {/* Centered quote */}
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div className="text-center">
          <p className="font-display max-w-xs text-sm leading-relaxed text-white/15 italic dark:text-white/30">
            &ldquo;Fill your paper with the breathings of your heart.&rdquo;
          </p>
          <span className="mt-3 block font-mono text-[0.5rem] tracking-widest text-white/8 dark:text-white/20">
            — William Wordsworth
          </span>
        </div>
      </div>
    </div>
  );
}

export function BlogJournal({ articles }: { articles: ArticleFrontmatter[] }) {
  const [featured, ...rest] = articles;
  const [count, setCount] = useState(5);
  const visible = rest.slice(0, count);
  const hasMore = count < rest.length;

  const progress = useMotionValue(0);
  const coverRotateY = useTransform(progress, [0, 100], [0, -180]);
  const coverShadow = useTransform(
    progress,
    [0, 40, 50, 60, 100],
    [
      '0px 0 0px rgba(0,0,0,0)',
      '0px 0 0px rgba(0,0,0,0)',
      '0px 0 40px rgba(0,0,0,0.4)',
      '-5px 0 30px rgba(0,0,0,0.3)',
      '-10px 0 20px rgba(0,0,0,0.2)',
    ],
  );

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.2,
      ease: [0.12, 0.6, 0.25, 1.0],
      delay: 0.3,
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <section className="hero-padding">
      <div className="container max-w-5xl">
        {/* 3D perspective scene */}
        <div style={{ perspective: '1000px' }}>
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* ── Book cover (flips open) ── */}
            <motion.div
              style={{
                rotateY: coverRotateY,
                boxShadow: coverShadow,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                borderRadius: '1rem',
              }}
            >
              {/* Front of cover */}
              <div
                className="bg-foreground dark:bg-muted absolute inset-0 overflow-hidden rounded-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <CoverDesign />
              </div>

              {/* Back of cover — marbled endpaper */}
              <div
                className="bg-primary-hover dark:bg-secondary absolute inset-0 overflow-hidden rounded-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <BackfaceMarbled />
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent" />
              </div>
            </motion.div>

            {/* ── Journal pages (revealed underneath) ── */}
            <JournalContainer>
              {/* Header */}
              <div className="px-4 pt-6 md:px-10 md:pt-10">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-accent-light size-4" />
                  <span className="text-accent-hover font-mono text-[0.625rem] tracking-widest uppercase">
                    Journal
                  </span>
                </div>
                <h1 className="mt-4 text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                  Thoughts on{' '}
                  <span className="text-muted-foreground">writing.</span>
                </h1>
              </div>

              {/* Featured — pasted photo with overlay */}
              {featured && (
                <div className="px-4 pt-6 md:px-10 md:pt-8">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group block no-underline"
                  >
                    <div className="border-accent-light relative aspect-[16/7] overflow-hidden rounded-lg border shadow-sm">
                      {featured.image && (
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          priority
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      )}
                      <ProgressiveBlur scrimOpacity={70} height={70} />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        <h2 className="max-w-xl text-xl leading-tight tracking-tight text-white md:text-2xl">
                          {featured.title}
                        </h2>
                        <span className="mt-2 block font-mono text-[0.625rem] text-white/40">
                          {formatDate(featured.date)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Divider */}
              <div className="border-accent-light mx-4 mt-8 border-t md:mx-10" />

              {/* Entry list */}
              <div className="px-4 md:px-10">
                {visible.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group border-accent-light flex gap-4 border-b py-5 no-underline last:border-b-0 md:gap-6 md:py-6"
                  >
                    <span className="text-muted-foreground w-16 shrink-0 pt-0.5 font-mono text-[0.625rem] md:w-24">
                      {formatShortDate(article.date)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="group-hover:text-accent text-base tracking-tight transition-colors duration-300 md:text-lg">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="border-accent-light border-t px-4 py-6 text-center md:px-10">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCount((c) => c + 5)}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </JournalContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
