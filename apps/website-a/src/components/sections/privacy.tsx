'use client';

import { EyeOff, FileOutput, Lock, Shield } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

const JOURNAL_TEXT =
  'There\u2019s something about mornings when you don\u2019t rush \u2014 the whole day feels more spacious. I noticed I\u2019ve been calmer this week. Maybe it\u2019s the routine, maybe it\u2019s something deeper.';

const CIPHER_CHARS = '&#@$%!*^~+=?><{}[]|\\';

const PRIVACY_FEATURES = [
  { icon: Lock, label: 'AES-256 encryption' },
  { icon: EyeOff, label: 'Zero-knowledge proof' },
  { icon: Shield, label: 'No third-party access' },
  { icon: FileOutput, label: 'Full data portability' },
] as const;

function EncryptedPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState(JOURNAL_TEXT);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = JOURNAL_TEXT.length * 2;
    let raf: number;

    const step = () => {
      frame++;
      const progress = frame / totalFrames;
      const chars = JOURNAL_TEXT.split('').map((char, i) => {
        if (char === ' ') return ' ';
        const charProgress = i / JOURNAL_TEXT.length;
        if (progress > charProgress) {
          return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
        }
        return char;
      });
      setDisplayed(chars.join(''));

      if (frame < totalFrames) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="font-mono text-sm leading-relaxed"
      aria-label="Encrypted text"
    >
      {displayed.split('').map((char, i) => (
        <span
          key={i}
          className={cn(
            'inline-block w-[0.55em] text-center',
            char !== JOURNAL_TEXT[i] && char !== ' '
              ? 'text-background/20'
              : 'text-background/40',
          )}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

export function Privacy() {
  return (
    <section className="section-padding">
      <div className="container">
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
              <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                Your words. Our blind spot.
              </h2>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER} className="mt-4">
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                Everything you write is encrypted on your device before it ever
                reaches our servers. Here&apos;s the difference.
              </p>
            </TextReveal>
          </motion.div>

          <motion.div
            className="grid gap-0 overflow-hidden rounded-xl md:grid-cols-2"
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.6, delay: 0.4, ease },
              },
            }}
          >
            {/* What you write */}
            <div className="bg-accent/5 p-8 md:p-10">
              <span className="text-accent mb-4 block font-mono text-xs tracking-wider uppercase">
                What you write
              </span>
              <p className="font-display text-lg leading-snug tracking-tight italic md:text-xl">
                &ldquo;{JOURNAL_TEXT}&rdquo;
              </p>
            </div>

            {/* What we see — animates from readable to encrypted */}
            <div className="bg-foreground p-8 md:p-10">
              <span className="text-background/40 mb-4 block font-mono text-xs tracking-wider uppercase">
                What we see
              </span>
              <EncryptedPanel />
              <div className="mt-6 flex items-center gap-2">
                <Lock className="text-background/30 size-3.5" />
                <span className="text-background/30 font-mono text-[0.625rem]">
                  AES-256-GCM &middot; End-to-end encrypted
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.7, ease },
              },
            }}
          >
            {PRIVACY_FEATURES.map((feat) => (
              <div key={feat.label} className="flex items-center gap-2">
                <feat.icon className="text-accent size-4" strokeWidth={1.5} />
                <span className="text-muted-foreground font-mono text-xs tracking-wider">
                  {feat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
