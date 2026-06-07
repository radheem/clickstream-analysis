'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getCardStyle, useCardStack } from '@/hooks/use-card-stack';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    id: 0,
    quote:
      'I started journaling to clear my head. Six months later, Kinto showed me that every time I wrote about feeling \u2018stuck,\u2019 it was actually the week before a breakthrough. I never would have seen that pattern on my own. Now I trust the process differently.',
    author: {
      name: 'James Moreno',
      role: 'Founder & Coach',
      streak: '14-month streak',
      avatar: '/images/home/testimonials/james-moreno.webp',
    },
  },
  {
    id: 1,
    quote:
      'I\u2019ve tried every journaling app. Most feel like homework. Kinto feels like a conversation with the version of myself I\u2019m becoming. The weekly synthesis alone changed how I make decisions.',
    author: {
      name: 'Priya Sharma',
      role: 'Product Designer',
      streak: '8-month streak',
      avatar: '/images/home/testimonials/priya-sharma.webp',
    },
  },
  {
    id: 2,
    quote:
      'Three words some mornings. Three pages on others. Kinto never judges the length \u2014 it reads the pattern. After 200 entries, it surfaced a connection between my sleep and my creativity that my therapist confirmed.',
    author: {
      name: 'Elena Vasquez',
      role: 'Novelist',
      streak: '22-month streak',
      avatar: '/images/home/testimonials/elena-vasquez.webp',
    },
  },
  {
    id: 3,
    quote:
      'My team uses Kinto for individual reflection before our Monday standups. The mood tracking alone reduced our burnout incidents by half. It\u2019s the quietest tool that made the loudest difference.',
    author: {
      name: 'David Chen',
      role: 'Engineering Lead',
      streak: '11-month streak',
      avatar: '/images/home/testimonials/david-chen.webp',
    },
  },
  {
    id: 4,
    quote:
      'I was skeptical about AI reading my journal. Then Kinto told me I write about my mother every time it rains. That one insight unlocked six months of therapy progress in a single evening.',
    author: {
      name: 'Amara Osei',
      role: 'Graduate Student',
      streak: '6-month streak',
      avatar: '/images/home/testimonials/amara-osei.webp',
    },
  },
];

function TestimonialCard({ card }: { card: (typeof TESTIMONIALS)[number] }) {
  return (
    <Card className="h-full shadow-md">
      <CardContent className="flex-1 px-8 pt-8 md:px-10 md:pt-10">
        <span className="font-display text-accent/20 text-5xl leading-none select-none md:text-6xl">
          &ldquo;
        </span>
        <p className="font-display mt-1 text-lg leading-snug tracking-tight md:text-xl lg:text-2xl">
          {card.quote}
        </p>
      </CardContent>
      <CardFooter className="gap-2 border-0 bg-transparent px-8 pt-4 pb-8 md:px-10 md:pb-10">
        <div data-author-link className="flex items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src={card.author.avatar} alt={card.author.name} />
            <AvatarFallback>
              {card.author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium underline decoration-transparent transition-colors hover:decoration-current">
              {card.author.name}
            </p>
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              {card.author.role}
            </p>
          </div>
        </div>
        <span className="text-accent ml-auto font-mono text-xs">
          {card.author.streak}
        </span>
      </CardFooter>
    </Card>
  );
}

function TestimonialCardStack() {
  const { cards, setPaused, goTo, activeIndex, progress } =
    useCardStack(TESTIMONIALS);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{
    clientX: number;
    clientY: number;
    zone: 'top' | 'bottom';
    visible: boolean;
  }>({ clientX: 0, clientY: 0, zone: 'bottom', visible: false });

  const goPrev = () =>
    goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => goTo((activeIndex + 1) % TESTIMONIALS.length);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Hide floating cursor when hovering over author link
    const target = e.target as HTMLElement;
    const isOverLink = target.closest('[data-author-link]') !== null;

    const relY = e.clientY - rect.top;
    const zone = relY < rect.height / 2 ? 'top' : 'bottom';
    setCursor({
      clientX: e.clientX,
      clientY: e.clientY,
      zone,
      visible: !isOverLink,
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-author-link]')) return;
    if (cursor.zone === 'top') goPrev();
    else goNext();
  };

  return (
    <div className="flex items-center gap-4 md:gap-6">
      {/* Card stack */}
      <div
        ref={containerRef}
        className={cn(
          'relative w-full max-w-xl',
          cursor.visible && 'cursor-none',
        )}
        onMouseEnter={() => setPaused(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setPaused(false);
          setCursor((prev) => ({ ...prev, visible: false }));
        }}
        onClick={handleClick}
      >
        {/* Invisible spacers — tallest card sets the height */}
        <div className="invisible grid">
          {TESTIMONIALS.map((card) => (
            <div key={card.id} className="col-start-1 row-start-1">
              <TestimonialCard card={card} />
            </div>
          ))}
        </div>

        {/* Animated stack */}
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={cn(
              'absolute inset-x-0 top-0 bottom-0',
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
            <TestimonialCard card={card} />
          </motion.div>
        ))}

        {/* Blur pulse overlay — flashes on card change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="pointer-events-none absolute inset-0 z-10 rounded-xl backdrop-blur-md"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* Floating cursor button — portaled to body to avoid transform offset */}
        {typeof window !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {cursor.visible && (
                <motion.div
                  className="pointer-events-none fixed z-50"
                  style={{
                    left: cursor.clientX - 20,
                    top: cursor.clientY - 20,
                  }}
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  transition={{
                    opacity: { duration: 0.15 },
                    filter: { duration: 0.15 },
                    scale: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                >
                  <div className="bg-accent text-background flex size-10 items-center justify-center rounded-full shadow-lg">
                    {cursor.zone === 'top' ? (
                      <ChevronUp className="size-5" />
                    ) : (
                      <ChevronDown className="size-5" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>

      {/* Vertical navigation dots */}
      <div className="flex flex-col items-center gap-3">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => goTo(i)}
            className="relative flex cursor-pointer items-center justify-center"
          >
            <span
              className={cn(
                'block rounded-full transition-all duration-200',
                activeIndex === i
                  ? 'bg-accent size-2.5'
                  : 'bg-foreground/20 hover:bg-foreground/40 size-2',
              )}
            />
            {activeIndex === i && (
              <svg className="absolute size-5 -rotate-90" viewBox="0 0 20 20">
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeDasharray={44}
                  strokeDashoffset={44 - (44 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-none"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="section-padding relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-20 -top-32 -bottom-48 -z-10 rotate-180 opacity-75 blur-xl will-change-transform dark:opacity-5"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 70% at center 40%, black 20%, transparent 70%)',
        }}
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
      <div className="container">
        <div className="grid items-end gap-16 md:grid-cols-12">
          {/* Left — heading at bottom */}
          <motion.div
            ref={headingRef}
            className="md:order-1 md:col-span-4"
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <TextReveal mode="animate">
              <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                In their words
              </h2>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER} className="mt-4">
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-base">
                Listen to the writers who have turned daily reflection into
                lasting clarity, one honest entry at a time.
              </p>
            </TextReveal>
          </motion.div>

          {/* Right — card stack */}
          <motion.div
            className="flex md:order-2 md:col-span-8 lg:justify-end"
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            animate={
              headingInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 24, filter: 'blur(4px)' }
            }
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <TestimonialCardStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
