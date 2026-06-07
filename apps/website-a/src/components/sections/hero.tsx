'use client';

import { ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { getCardStyle, useCardStack } from '@/hooks/use-card-stack';
import { cn } from '@/lib/utils';

const HERO_FEATURES = [
  'AI reflections',
  'Mood tracking',
  'Weekly digests',
  'Encrypted',
] as const;

const GROWTH_TIMELINE = [
  {
    label: 'Week 1',
    text: 'First entry: \u201CTrying something new\u201D',
    filled: false,
    live: false,
    card: {
      title: 'First Reflection',
      time: '12w ago',
      excerpt:
        'Not sure what to write yet. Feels strange talking to an app. But here I am, trying something new.',
      highlight: 'trying',
      insight:
        'Welcome to your journal. Every journey starts with a single entry. There\u2019s courage in showing up, even when the words don\u2019t come easily. We\u2019ll be here.',
      moods: ['Curious', 'Hopeful'],
      entry: '#1',
    },
  },
  {
    label: 'Week 8',
    text: 'Started consistent morning routine',
    filled: true,
    live: false,
    card: {
      title: 'Pattern Detected',
      time: '4w ago',
      excerpt:
        'The mornings have a rhythm now. I don\u2019t dread them \u2014 there\u2019s something grounding about routine.',
      highlight: 'grounding',
      insight:
        'Your tone has shifted noticeably since week 5. Entries are more grounded, less reactive. Morning writing is 3x more consistent than evening ones.',
      moods: ['Focused', 'Steady'],
      entry: '#89',
    },
  },
  {
    label: 'Week 12 \u2014 Now',
    text: 'Morning entries trending calmer',
    filled: true,
    live: true,
    card: {
      title: 'Weekly Insight',
      time: '2h ago',
      excerpt:
        'There\u2019s something about mornings when you don\u2019t rush \u2014 the whole day feels more spacious.',
      highlight: 'spacious',
      insight:
        'This word has appeared in 3 entries this week. You seem to be exploring a new relationship with time and presence. Your calmest entries happen before 8am.',
      moods: ['Calm', 'Reflective'],
      entry: '#142',
    },
  },
] as const;

type TimelineItem = (typeof GROWTH_TIMELINE)[number];

export function Hero() {
  const {
    cards,
    setPaused,
    goTo: goToWeek,
    activeIndex,
    progress,
  } = useCardStack(GROWTH_TIMELINE, 4000);

  return (
    <section className="hero-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 aspect-2/3 mask-radial-[75%_100%] mask-radial-from-45% mask-radial-to-75% mask-radial-at-top opacity-75 blur-xl will-change-transform md:aspect-square lg:aspect-video dark:opacity-5"
      >
        <Image
          src="/images/home/hero-bg.webp"
          alt=""
          width={2198}
          height={1685}
          className="size-full object-cover object-top"
          priority
        />
      </div>
      <motion.div
        className="relative container"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
          },
        }}
      >
        {/* Headline */}
        <motion.h1
          className="text-center text-6xl leading-none tracking-tighter md:text-8xl lg:text-9xl"
          variants={{
            hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          A journal that{' '}
          <em className="animate-text-shimmer text-accent">grows</em> with you
        </motion.h1>

        {/* Rule — gradient fade from edges */}
        <motion.div
          className="via-border my-8 h-px bg-linear-to-r from-transparent to-transparent md:my-12 lg:my-16"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        />

        {/* Bottom Split */}
        <motion.div
          className="grid items-start gap-x-10 gap-y-16 md:grid-cols-2"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Left: Info */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed md:max-w-lg">
              Kinto is an AI journal that reads between the lines. Write freely,
              track your mood over time, and discover patterns you never
              noticed. Private, beautiful, and quietly powerful.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/signup">Start writing &mdash; it&apos;s free</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link
                  href="#features"
                  scroll={false}
                  className="group/link"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('features')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See how it works
                  <ChevronRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                </Link>
              </Button>
            </div>

            <div className="text-muted-foreground mt-10 flex flex-wrap gap-6 font-mono text-xs">
              {HERO_FEATURES.map((f) => (
                <span key={f} className="flex items-center gap-1.5">
                  <span className="bg-accent size-1.5 shrink-0 rounded-full" />
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Card + Timeline */}
          <motion.div
            className="flex lg:justify-end"
            variants={{
              hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <div className="md:max-w-md">
              {/* Persistent card — content cross-fades per active week */}
              <div
                className="relative rotate-1 transition-transform duration-500 hover:-translate-y-1 hover:rotate-0"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Invisible spacers — grid overlap so tallest card sets height */}
                <div className="invisible grid">
                  {GROWTH_TIMELINE.map((item) => (
                    <div key={item.label} className="col-start-1 row-start-1">
                      <InsightCard card={item.card} />
                    </div>
                  ))}
                </div>
                {cards.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={cn(
                      'absolute inset-x-0 top-0',
                      index !== 0 && 'pointer-events-none',
                    )}
                    style={{ transformOrigin: 'top center' }}
                    animate={getCardStyle(index)}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 25,
                    }}
                  >
                    <InsightCard card={item.card} />
                  </motion.div>
                ))}
              </div>

              {/* Timeline below */}
              <div className="mt-4">
                {GROWTH_TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="flex cursor-pointer gap-3"
                    onClick={() => goToWeek(i)}
                  >
                    {/* Left: dot + connector column */}
                    <div className="flex flex-col items-center pt-1">
                      <span className="relative shrink-0">
                        <span
                          className={cn(
                            'border-accent block size-2 rounded-full border-2 transition-[transform,background-color] duration-300',
                            item.filled && 'bg-accent',
                            i === activeIndex && 'scale-150',
                          )}
                        />
                        {i === GROWTH_TIMELINE.length - 1 &&
                          i === activeIndex && (
                            <svg
                              className="absolute -inset-1.5 size-5 -rotate-90"
                              viewBox="0 0 20 20"
                            >
                              <circle
                                cx="10"
                                cy="10"
                                r="8"
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth="1.5"
                                strokeDasharray="50.27"
                                strokeDashoffset="50.27"
                                strokeLinecap="round"
                                className="animate-ring-fill"
                              />
                            </svg>
                          )}
                        {item.live && (
                          <span className="animate-pulse-dot bg-accent absolute inset-0 rounded-full" />
                        )}
                      </span>
                      {i < GROWTH_TIMELINE.length - 1 && (
                        <div className="bg-border relative my-1 w-0.5 flex-1 overflow-hidden">
                          {i === activeIndex && (
                            <div
                              className="bg-accent absolute inset-0 origin-top"
                              style={{
                                transform: `scaleY(${progress / 100})`,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    {/* Right: content */}
                    <div className="text-muted-foreground pb-3 text-xs leading-snug">
                      <strong
                        className={cn(
                          'block font-mono text-xs transition-colors duration-300',
                          i === activeIndex ? 'text-accent' : 'text-foreground',
                        )}
                      >
                        {item.label}
                      </strong>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="border-muted-foreground/30 relative h-9 w-5 rounded-full border-[1.5px]">
          <motion.span
            className="bg-accent absolute top-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full"
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
      </div> */}
    </section>
  );
}

function InsightCard({ card }: { card: TimelineItem['card'] }) {
  return (
    <Card className="hover:shadow-accent/5 shadow-md transition-shadow duration-300 select-none hover:shadow-xl">
      <CardHeader className="flex-row items-center justify-between border-b">
        <span className="text-accent-hover flex items-center gap-1.5 font-mono text-[0.625rem] font-medium tracking-wider uppercase">
          <Star className="fill-accent stroke-accent size-2.5" />
          {card.title}
        </span>
        <span className="text-muted-foreground font-mono text-[0.625rem]">
          {card.time}
        </span>
      </CardHeader>
      <CardContent>
        <p className="border-accent-light font-display text-card-foreground mb-3 border-l-2 pl-3 text-sm leading-snug italic">
          &ldquo;{card.excerpt.split(card.highlight)[0]}
          <mark className="bg-accent-subtle text-accent-hover group-hover/card:bg-accent-light rounded-sm px-0.5 transition-colors duration-300">
            {card.highlight}
          </mark>
          {card.excerpt.split(card.highlight)[1]}&rdquo;
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {card.insight}
        </p>
      </CardContent>
      <CardFooter className="bg-secondary gap-2">
        <div className="flex gap-1">
          {card.moods.map((mood) => (
            <Badge key={mood} variant="amber" size="sm">
              {mood}
            </Badge>
          ))}
        </div>
        <span className="text-muted-foreground font-mono text-[0.625rem]">
          Entry {card.entry}
        </span>
      </CardFooter>
    </Card>
  );
}
