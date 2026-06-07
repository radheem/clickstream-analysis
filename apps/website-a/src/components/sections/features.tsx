'use client';

import { Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, XAxis } from 'recharts';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const MOOD_DATA = [
  {
    day: 'Mon',
    lastWeek: 4.5,
    thisWeek: 6.5,
    lastMood: 'Restless',
    thisMood: 'Good',
  },
  {
    day: 'Tue',
    lastWeek: 5.2,
    thisWeek: 7.0,
    lastMood: 'Neutral',
    thisMood: 'Peaceful',
  },
  {
    day: 'Wed',
    lastWeek: 4.8,
    thisWeek: 6.8,
    lastMood: 'Uneasy',
    thisMood: 'Good',
  },
  {
    day: 'Thu',
    lastWeek: 5.8,
    thisWeek: 7.5,
    lastMood: 'Okay',
    thisMood: 'Peaceful',
  },
  {
    day: 'Fri',
    lastWeek: 5.5,
    thisWeek: 7.8,
    lastMood: 'Neutral',
    thisMood: 'Joyful',
  },
  {
    day: 'Sat',
    lastWeek: 6.2,
    thisWeek: 8.2,
    lastMood: 'Calm',
    thisMood: 'Joyful',
  },
  {
    day: 'Sun',
    lastWeek: 6.0,
    thisWeek: 8.5,
    lastMood: 'Calm',
    thisMood: 'Radiant',
  },
];

const moodChartConfig = {
  lastWeek: {
    label: 'Last week',
    color: 'oklch(0.795 0.128 92.25 / 0.25)',
  },
  thisWeek: {
    label: 'This week',
    color: 'var(--color-accent)',
  },
} satisfies ChartConfig;

const WORD_PATTERNS = [
  {
    word: 'presence',
    count: 12,
    detail: 'Most frequent in morning entries. First appeared in Week 3.',
    trend: '+4 this week',
  },
  {
    word: 'morning',
    count: 9,
    detail: '78% of your entries mention mornings. A defining ritual.',
    trend: 'Steady',
  },
  {
    word: 'spacious',
    count: 7,
    detail: 'New theme since Week 9. Absent from earlier writing entirely.',
    trend: '+3 this week',
  },
  {
    word: 'change',
    count: 6,
    detail:
      'Peaked in Week 6, now settling. Tone shifted from fear to curiosity.',
    trend: '-1 this week',
  },
  {
    word: 'gratitude',
    count: 5,
    detail: 'Appears mostly on weekends. Correlated with higher mood scores.',
    trend: 'Steady',
  },
  {
    word: 'quiet',
    count: 4,
    detail: 'Always paired with "morning." Your calm before the day begins.',
    trend: '+1 this week',
  },
] as const;

const STATS = [
  {
    value: '142',
    label: 'entries written',
    amber: false,
    detail:
      'That\u2019s 47,000+ words of self-reflection. More than most novels.',
    milestone: 'Next milestone: 150',
    progress: 94,
  },
  {
    value: '86',
    label: 'day streak',
    amber: true,
    detail: 'Top 3% of all Kinto writers. Your longest streak yet.',
    milestone: 'Next milestone: 90',
    progress: 95,
  },
  {
    value: '7.2',
    label: 'avg mood score',
    amber: false,
    detail: 'Up from 6.1 when you started. Morning entries score highest.',
    milestone: 'Personal best: 7.8',
    progress: 72,
  },
] as const;

const TIME_SLOTS = [
  { label: '5\u20137am', pct: 15, entries: 21 },
  { label: '7\u20139am', pct: 42, entries: 60, peak: true },
  { label: '9\u201312pm', pct: 18, entries: 26 },
  { label: '12\u20135pm', pct: 8, entries: 11 },
  { label: '5\u20139pm', pct: 12, entries: 17 },
  { label: '9pm+', pct: 5, entries: 7 },
];

export function Features() {
  return (
    <section
      id="features"
      className="section-padding relative scroll-mt-20 overflow-hidden"
    >
      {/* Dot grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mask-t-from-30% mask-t-to-100% mask-b-from-30% mask-b-to-100% opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: {} }}
        >
          <motion.div
            className="mb-12 md:mb-20"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <TextReveal mode="animate">
              <span className="text-accent mb-6 block font-mono text-xs font-medium tracking-wider uppercase">
                Inside Kinto
              </span>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER}>
              <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                Your inner world, beautifully mapped
              </h2>
            </TextReveal>
            <TextReveal
              mode="animate"
              delay={REVEAL_STAGGER * 2}
              className="mt-4"
            >
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                Every entry becomes a brushstroke in a living portrait of who
                you are. Here&apos;s what 12 weeks looks like.
              </p>
            </TextReveal>
          </motion.div>
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: 0.4 } },
            }}
          >
            <StatsRow />
          </motion.div>
        </motion.div>
        <div className="bg-foreground/10 my-16 h-px" />
        <MoodChart />
        <div className="bg-foreground/10 my-16 h-px" />
        <div className="grid items-start gap-12 md:grid-cols-2">
          <RecurringThemes />
          <InsightWithWritingTime />
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <motion.div
      className="flex flex-wrap items-start gap-y-8"
      onMouseLeave={() => setHoveredStat(null)}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          className={cn(
            'w-1/3 cursor-pointer',
            i === 0 && 'pr-8',
            i === 1 && 'border-l border-dashed px-6 sm:px-8',
            i === 2 && 'border-l border-dashed pl-6 sm:pl-8',
          )}
          onMouseEnter={() => setHoveredStat(i)}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: hoveredStat === null || hoveredStat === i ? 1 : 0.4,
              y: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          animate={{
            opacity: hoveredStat === null || hoveredStat === i ? 1 : 0.4,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className={cn(
              'font-display block text-7xl tracking-tight md:text-8xl',
              stat.amber && 'text-accent',
            )}
            animate={{
              x: hoveredStat === i ? 4 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {stat.value}
          </motion.span>
          <span className="text-muted-foreground mt-1 block font-mono text-xs tracking-wider uppercase">
            {stat.label}
          </span>
          <AnimatePresence>
            {hoveredStat === i && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.12 },
                  },
                }}
                transition={{
                  height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.2 },
                }}
              >
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {stat.detail}
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-mono text-[0.625rem]">
                      {stat.milestone}
                    </span>
                    <span className="text-accent font-mono text-[0.625rem]">
                      {stat.progress}%
                    </span>
                  </div>
                  <AnimatedProgress
                    target={stat.progress}
                    className="bg-accent/10 **:data-[slot=progress-indicator]:bg-accent mt-1.5 h-1 **:data-[slot=progress-indicator]:duration-600 **:data-[slot=progress-indicator]:ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}

function MoodChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 flex items-end justify-between">
        <div>
          <span className="text-muted-foreground block font-mono text-[0.625rem] font-medium tracking-wider uppercase">
            Emotional Tone &middot; 14 days
          </span>
          <span className="text-muted-foreground mt-1 block text-sm">
            Detected from your writing style, word choice, and sentence rhythm
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:justify-start">
          {Object.entries(moodChartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="size-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-muted-foreground font-mono text-[0.625rem]">
                {config.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ChartContainer
        config={moodChartConfig}
        className="aspect-auto h-44 w-full"
      >
        <BarChart
          data={MOOD_DATA}
          margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={6}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as (typeof MOOD_DATA)[number];
              return (
                <div className="bg-background rounded-lg border px-2.5 py-1.5 shadow-xl">
                  <div className="flex flex-col gap-1 font-mono text-[0.625rem]">
                    <span className="text-muted-foreground">
                      Last week: {d.lastWeek} &middot; {d.lastMood}
                    </span>
                    <span className="font-medium">
                      This week: {d.thisWeek} &middot; {d.thisMood}
                    </span>
                  </div>
                </div>
              );
            }}
          />
          <Bar
            dataKey="lastWeek"
            fill="var(--color-lastWeek)"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            dataKey="thisWeek"
            fill="var(--color-thisWeek)"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </motion.div>
  );
}

function RecurringThemes() {
  const [hoveredTheme, setHoveredTheme] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-muted-foreground mb-6 block font-mono text-[0.625rem] font-medium tracking-wider uppercase">
        Recurring Themes
      </span>
      <div className="space-y-0" onMouseLeave={() => setHoveredTheme(null)}>
        {WORD_PATTERNS.map((w, i) => (
          <motion.div
            key={w.word}
            className="cursor-pointer border-b border-dashed py-3 first:pt-0 last:border-b-0"
            onMouseEnter={() => setHoveredTheme(i)}
            animate={{
              opacity: hoveredTheme === null || hoveredTheme === i ? 1 : 0.3,
            }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="flex items-baseline justify-between"
              animate={{ x: hoveredTheme === i ? 8 : 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              <span
                className={cn(
                  'font-display text-3xl tracking-tight transition-colors duration-300 md:text-4xl',
                  hoveredTheme === i ? 'text-accent' : 'text-foreground',
                )}
              >
                {w.word}
              </span>
              <span className="text-muted-foreground font-mono text-sm">
                {w.count}
              </span>
            </motion.div>
            <AnimatePresence>
              {hoveredTheme === i && (
                <motion.div
                  className="overflow-hidden pl-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.12 },
                    },
                  }}
                  transition={{
                    height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {w.detail}
                  </p>
                  <span
                    className={cn(
                      'mt-1.5 inline-block font-mono text-[0.625rem]',
                      w.trend.startsWith('+')
                        ? 'text-accent'
                        : 'text-muted-foreground',
                    )}
                  >
                    {w.trend}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function InsightWithWritingTime() {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

  return (
    <motion.div
      className="h-full md:border-l md:border-dashed md:pl-12"
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-3 flex items-center gap-1.5">
        <Star className="fill-accent stroke-accent size-2.5" />
        <span className="text-accent font-mono text-[0.625rem] font-medium tracking-wider uppercase">
          This Week&apos;s Insight
        </span>
      </div>
      <p className="font-display text-lg leading-relaxed">
        Your writing centered on presence and morning rituals. The word
        &ldquo;spacious&rdquo; appeared 3 times &mdash; a theme that wasn&apos;t
        there a month ago. Your calmest entries happen before 8am.
      </p>

      <div className="mt-8">
        <span className="text-muted-foreground mb-4 block font-mono text-[0.625rem] font-medium tracking-wider uppercase">
          When You Write
        </span>
        <div className="space-y-2.5" onMouseLeave={() => setHoveredSlot(null)}>
          {TIME_SLOTS.map((slot, i) => (
            <motion.div
              key={slot.label}
              className="flex cursor-pointer items-center gap-3"
              onMouseEnter={() => setHoveredSlot(i)}
              animate={{
                opacity: hoveredSlot === null || hoveredSlot === i ? 1 : 0.3,
                x: hoveredSlot === i ? 4 : 0,
              }}
              transition={{
                opacity: { duration: 0.25 },
                x: { type: 'spring', stiffness: 300, damping: 30 },
              }}
            >
              <span
                className={cn(
                  'w-14 shrink-0 font-mono text-[0.625rem] transition-colors duration-300',
                  hoveredSlot === i || slot.peak
                    ? 'text-accent font-medium'
                    : 'text-muted-foreground',
                )}
              >
                {slot.label}
              </span>
              <div className="bg-foreground/5 relative h-2 flex-1 overflow-hidden rounded-full">
                <motion.div
                  className={cn(
                    'h-full rounded-full transition-colors duration-300',
                    hoveredSlot === i || slot.peak
                      ? 'bg-accent'
                      : 'bg-accent/40',
                  )}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${slot.pct}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <span
                className={cn(
                  'w-6 text-right font-mono text-[0.625rem] transition-colors duration-300',
                  hoveredSlot === i ? 'text-accent' : 'text-muted-foreground',
                )}
              >
                {slot.entries}
              </span>
              <AnimatePresence>
                {hoveredSlot === i && (
                  <motion.span
                    className="text-accent w-8 text-right font-mono text-[0.625rem] font-medium"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 32 }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {slot.pct}%
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {hoveredSlot !== null ? (
            <motion.p
              key={hoveredSlot}
              className="text-muted-foreground mt-3 text-xs"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {TIME_SLOTS[hoveredSlot].entries} entries{' '}
              {TIME_SLOTS[hoveredSlot].peak && (
                <span className="text-accent font-medium">
                  &mdash; your peak window
                </span>
              )}
            </motion.p>
          ) : (
            <motion.p
              key="default"
              className="text-muted-foreground mt-3 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              Peak writing window:{' '}
              <span className="text-accent font-medium">7–9am</span> &middot;
              42% of all entries
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function AnimatedProgress({
  target,
  className,
}: {
  target: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setValue(target), 100);
    return () => clearTimeout(timer);
  }, [target]);

  return <Progress value={value} className={className} />;
}
