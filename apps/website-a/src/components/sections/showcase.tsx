'use client';

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useSyncExternalStore } from 'react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { IconApple } from '@/components/icons/apple';
import { IconGooglePlay } from '@/components/icons/google-play';
import { STORE_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const SHOWCASE_ITEMS = [
  {
    label: 'Write',
    caption: 'A distraction-free space that feels like pen on paper.',
    image: '/images/home/showcase-write.webp',
  },
  {
    label: 'Reflect',
    caption: 'AI insights that read between the lines of your entries.',
    image: '/images/home/showcase-reflect.webp',
  },
  {
    label: 'Discover',
    caption: 'Track your emotional patterns across weeks and months.',
    image: '/images/home/showcase-discover.webp',
  },
] as const;

const CASCADE_DESKTOP = [
  { rotate: -6, y: 20 },
  { rotate: 0, y: 0 },
  { rotate: 6, y: 20 },
];

const CASCADE_MOBILE = [
  { rotate: -2, y: 10 },
  { rotate: 0.5, y: 0 },
  { rotate: 2, y: 15 },
];

export function Showcase() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrollDone, setScrollDone] = useState(false);
  const reduced = useReducedMotion();
  const isMobile = useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia('(max-width: 767px)');
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia('(max-width: 767px)').matches,
    () => false,
  );
  const gridRef = useRef<HTMLDivElement>(null);

  const cascade = isMobile ? CASCADE_MOBILE : CASCADE_DESKTOP;

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 90%', 'start 40%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrollDone(reduced ? true : v >= 0.98);
  });

  // Eased keyframes: fast start, smooth deceleration
  const easeOut = [0, 0.3, 0.7, 0.85, 1];
  // When reduced motion, snap to final values (no scroll-driven animation)
  const fin = reduced ? [1, 1, 1, 1, 1] : easeOut;

  const scrollX0 = useTransform(
    scrollYProgress,
    fin,
    isMobile
      ? ['30%', '12%', '3%', '0.5%', '0%']
      : ['100%', '40%', '10%', '2%', '0%'],
  );
  const scrollX2 = useTransform(
    scrollYProgress,
    fin,
    isMobile
      ? ['-30%', '-12%', '-3%', '-0.5%', '0%']
      : ['-100%', '-40%', '-10%', '-2%', '0%'],
  );
  const scrollY0 = useTransform(scrollYProgress, fin, [
    0,
    cascade[0].y * 0.4,
    cascade[0].y * 0.8,
    cascade[0].y * 0.95,
    cascade[0].y,
  ]);
  const scrollY1 = useTransform(scrollYProgress, fin, [
    8,
    8 + (cascade[1].y - 8) * 0.4,
    8 + (cascade[1].y - 8) * 0.8,
    cascade[1].y * 0.98,
    cascade[1].y,
  ]);
  const scrollY2 = useTransform(scrollYProgress, fin, [
    16,
    16 + (cascade[2].y - 16) * 0.4,
    16 + (cascade[2].y - 16) * 0.8,
    cascade[2].y * 0.98,
    cascade[2].y,
  ]);
  const scrollR0 = useTransform(scrollYProgress, fin, [
    0,
    cascade[0].rotate * 0.4,
    cascade[0].rotate * 0.8,
    cascade[0].rotate * 0.95,
    cascade[0].rotate,
  ]);
  const scrollR1 = useTransform(scrollYProgress, fin, [
    0,
    cascade[1].rotate * 0.4,
    cascade[1].rotate * 0.8,
    cascade[1].rotate * 0.95,
    cascade[1].rotate,
  ]);
  const scrollR2 = useTransform(scrollYProgress, fin, [
    0,
    cascade[2].rotate * 0.4,
    cascade[2].rotate * 0.8,
    cascade[2].rotate * 0.95,
    cascade[2].rotate,
  ]);

  const scrollX = [scrollX0, 0, scrollX2];
  const scrollY = [scrollY0, scrollY1, scrollY2];
  const scrollRotate = [scrollR0, scrollR1, scrollR2];

  return (
    <section className="section-padding overflow-x-clip">
      <div className="container">
        <div className="mb-12 gap-4 md:mb-20 md:flex md:items-end md:justify-between">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <TextReveal mode="animate">
              <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                See it in action
              </h2>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER} className="mt-4">
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                A journaling experience designed to feel as natural as pen on
                paper, with intelligence woven quietly into every page.
              </p>
            </TextReveal>
          </motion.div>
          <motion.div
            className="mt-8 shrink-0 md:mt-0"
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted-foreground mb-3 font-mono text-[0.625rem] tracking-wider uppercase md:text-end">
              Available on iOS &amp; Android
            </p>
            <div className="flex items-center gap-2.5 md:justify-end">
              <Link
                href={STORE_LINKS.appStore.href}
                aria-label={STORE_LINKS.appStore.label}
                className="bg-foreground hover:bg-foreground/90 flex h-10 items-center gap-2 rounded-lg px-3.5 transition-colors"
              >
                <IconApple className="text-background size-5" />
                <div className="text-background">
                  <p className="text-[0.5rem] leading-none whitespace-nowrap">
                    Download on the
                  </p>
                  <p className="text-sm leading-tight font-semibold whitespace-nowrap">
                    App Store
                  </p>
                </div>
              </Link>
              <Link
                href={STORE_LINKS.googlePlay.href}
                aria-label={STORE_LINKS.googlePlay.label}
                className="bg-foreground hover:bg-foreground/90 flex h-10 items-center gap-2 rounded-lg px-3.5 transition-colors"
              >
                <IconGooglePlay className="text-background size-5" />
                <div className="text-background">
                  <p className="text-[0.5rem] leading-none whitespace-nowrap">
                    Get it on
                  </p>
                  <p className="text-sm leading-tight font-semibold whitespace-nowrap">
                    Google Play
                  </p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mobile — each card animates independently */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {SHOWCASE_ITEMS.map((item, i) => (
            <MobileShowcaseCard
              key={item.label}
              item={item}
              index={i}
              cascade={cascade}
            />
          ))}
        </div>

        {/* Desktop — shared scroll animation */}
        <div
          ref={gridRef}
          className="hidden md:grid md:grid-cols-3 md:gap-0"
          onMouseLeave={() => setHovered(null)}
        >
          {SHOWCASE_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              className={cn('cursor-pointer', i === 1 && 'md:-mx-6')}
              onMouseEnter={() => setHovered(i)}
              style={{
                x: scrollX[i],
                y: scrollY[i],
                rotate: scrollRotate[i],
                zIndex: hovered === i ? 10 : i === 1 ? 2 : 1,
              }}
            >
              <motion.div
                animate={{
                  y: scrollDone && hovered === i ? -12 : 0,
                  rotate: scrollDone && hovered === i ? -cascade[i].rotate : 0,
                  scale: scrollDone
                    ? hovered === i
                      ? 1.05
                      : hovered !== null
                        ? 0.97
                        : 1
                    : 1,
                  opacity: scrollDone
                    ? hovered === null || hovered === i
                      ? 1
                      : 0.4
                    : 1,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              >
                <div className="mx-auto w-full max-w-60">
                  <Image
                    src={item.image}
                    alt={`Kinto ${item.label} screen`}
                    width={1179}
                    height={2440}
                    className="w-full drop-shadow-xl"
                  />
                </div>
                <motion.div
                  className="mt-5 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: scrollDone
                      ? hovered === null || hovered === i
                        ? 1
                        : 0.2
                      : 0,
                    y: scrollDone ? 0 : 8,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-accent font-mono text-[0.625rem] font-medium tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground mx-auto mt-1 max-w-48 text-xs leading-relaxed">
                    {item.caption}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileShowcaseCard({
  item,
  index,
  cascade,
}: {
  item: (typeof SHOWCASE_ITEMS)[number];
  index: number;
  cascade: typeof CASCADE_MOBILE;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 50%'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index === 1 ? '0%' : index === 0 ? '30%' : '-30%', '0%'],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index === 1 ? 40 : 0, cascade[index].y],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, cascade[index].rotate],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.div ref={ref} style={{ x, y, rotate, opacity }}>
      <div className="mx-auto w-full max-w-60">
        <Image
          src={item.image}
          alt={`Kinto ${item.label} screen`}
          width={1179}
          height={2440}
          className="w-full drop-shadow-xl"
          priority
        />
      </div>
      <div className="mt-5 text-center">
        <span className="text-accent font-mono text-[0.625rem] font-medium tracking-wider">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display text-lg tracking-tight">{item.label}</h3>
        <p className="text-muted-foreground mx-auto mt-1 max-w-48 text-xs leading-relaxed">
          {item.caption}
        </p>
      </div>
    </motion.div>
  );
}
