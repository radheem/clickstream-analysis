'use client';

import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { JournalContainer } from '@/components/elements/journal-container';
import { formatDate } from '@/lib/utils';

interface ArticleHeroProps {
  title: string;
  description: string;
  date: string;
  image?: string;
  nextSlug?: string;
  children?: React.ReactNode;
}

export function ArticleHero({
  title,
  description,
  date,
  image,
  nextSlug,
  children,
}: ArticleHeroProps) {
  const progress = useMotionValue(0);
  const pageRotateY = useTransform(progress, [0, 100], [6, 0]);
  const pageOpacity = useTransform(progress, [0, 20, 100], [0, 1, 1]);
  const pageShadow = useTransform(
    progress,
    [0, 30, 60, 100],
    [
      '4px 0 12px rgba(0,0,0,0.06)',
      '2px 0 8px rgba(0,0,0,0.04)',
      '1px 0 4px rgba(0,0,0,0.02)',
      '0px 0 0px rgba(0,0,0,0)',
    ],
  );

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1,
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <section className="hero-padding pb-0">
      <div className="container max-w-5xl">
        <div style={{ perspective: '1200px' }}>
          <motion.div
            style={{
              rotateY: pageRotateY,
              opacity: pageOpacity,
              boxShadow: pageShadow,
              transformOrigin: 'left center',
              borderRadius: '1rem',
            }}
          >
            <JournalContainer>
              {/* Nav row */}
              <div className="flex items-center justify-between px-4 pt-4 md:px-10 md:pt-8">
                <Link
                  href="/blog"
                  className="text-accent-hover hover:text-accent inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-widest uppercase no-underline transition-colors"
                >
                  <ArrowLeft className="size-3" />
                  Back to blog
                </Link>
                {nextSlug && (
                  <Link
                    href={`/blog/${nextSlug}`}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-mono text-[0.625rem] tracking-widest uppercase no-underline transition-colors"
                  >
                    Next
                    <ChevronRight className="size-3" />
                  </Link>
                )}
              </div>

              {/* Pasted photo */}
              {image && (
                <div className="px-4 pt-4 md:px-10 md:pt-8">
                  <div className="border-accent-light relative aspect-[16/8] overflow-hidden rounded-lg border shadow-sm md:aspect-[16/7]">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Title block */}
              <div className="flex items-end justify-between gap-8 px-4 pt-6 md:px-10 md:pt-10">
                <div className="min-w-0 flex-1">
                  <span className="text-muted-foreground font-mono text-[0.625rem] tracking-widest uppercase">
                    {formatDate(date)}
                  </span>
                  <h1 className="mt-3 max-w-2xl text-3xl leading-none tracking-tight md:text-4xl lg:text-5xl">
                    {title}
                  </h1>
                </div>

                {/* Quill accent */}
                <div className="text-accent-light hidden shrink-0 flex-col items-center gap-2 md:flex">
                  <BookOpen className="size-12 stroke-1 lg:size-14" />
                  <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase">
                    Journal entry
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-accent-light mx-4 mt-6 border-t md:mx-10 md:mt-8" />

              {/* Body content */}
              {children && (
                <div className="px-4 py-8 md:px-10 md:py-12 lg:px-16">
                  {children}
                </div>
              )}
            </JournalContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
