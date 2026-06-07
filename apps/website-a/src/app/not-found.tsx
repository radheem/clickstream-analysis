'use client';

import { BookOpen } from 'lucide-react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import Link from 'next/link';
import { useEffect } from 'react';

import { JournalContainer } from '@/components/elements/journal-container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
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
    <section className="hero-padding">
      <div className="container max-w-4xl">
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
              <div className="flex min-h-[85vh] flex-col px-4 pt-6 pb-8 md:px-10 md:pt-10 md:pb-12">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <BookOpen className="text-accent-light size-4" />
                  <span className="text-accent-hover font-mono text-[0.625rem] tracking-widest uppercase">
                    Page 404
                  </span>
                </div>

                {/* Title */}
                <h1 className="mt-4 text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                  Page not <span className="text-muted-foreground">found.</span>
                </h1>

                <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed md:text-base">
                  There&apos;s nothing written here yet. This entry may have
                  been moved, removed, or never existed in the first place.
                </p>

                {/* Ruled lines — CSS pattern fills remaining space */}
                <div
                  className="mt-8 flex-1"
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom, transparent calc(100% - 1px), var(--accent-light) calc(100% - 1px))',
                    backgroundSize: '100% 2.25rem',
                    backgroundRepeat: 'repeat',
                  }}
                />

                {/* Footer */}
                <div className="flex items-center justify-between pt-5">
                  <span className="text-muted-foreground font-mono text-xs">
                    Entry not found
                  </span>
                  <Button asChild>
                    <Link href="/">Return home</Link>
                  </Button>
                </div>
              </div>
            </JournalContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
