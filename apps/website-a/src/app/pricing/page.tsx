'use client';

import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

import { TextReveal } from '@/components/elements/text-reveal';
import { Pricing } from '@/components/sections/pricing';

const COMPARISON = [
  { name: 'Journal entries', free: 'Unlimited', pro: 'Unlimited' },
  { name: 'Mood tracking', free: 'Basic', pro: 'Advanced analytics' },
  { name: 'AI reflections', free: '3 / week', pro: 'Unlimited' },
  { name: 'End-to-end encryption', free: true, pro: true },
  { name: 'Mobile & desktop apps', free: true, pro: true },
  { name: 'Weekly synthesis reports', free: false, pro: true },
  { name: 'Theme & pattern tracking', free: false, pro: true },
  { name: 'Yearly retrospective', free: false, pro: true },
  { name: 'Export (PDF & Markdown)', free: false, pro: true },
  { name: 'Priority support', free: false, pro: true },
] as const;

export default function PricingPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/home/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-60 blur-lg dark:opacity-20"
          />
          <div className="via-background/50 to-background absolute inset-0 bg-linear-to-b from-transparent" />
        </div>
        <Pricing className="hero-padding relative z-10" showBadge />
      </div>
      <DarkComparison />
    </>
  );
}

function DarkComparison() {
  return (
    <section className="bg-foreground section-padding">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: {} }}
        >
          <TextReveal mode="animate" className="mb-12 text-center">
            <h2 className="text-background text-3xl leading-none tracking-tighter md:text-4xl">
              Everything in{' '}
              <span className="text-background/40">both plans.</span>
            </h2>
          </TextReveal>

          <motion.div
            className="grid gap-12 md:grid-cols-2"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.3 },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <span className="text-background/40 mb-6 block font-mono text-xs tracking-wider uppercase">
                Personal &mdash; Free
              </span>
              {COMPARISON.filter(
                (f) => f.free === true || typeof f.free === 'string',
              ).map((feat) => (
                <div
                  key={feat.name}
                  className="border-background/10 flex items-center gap-3 border-b py-3"
                >
                  <Check className="text-accent size-4 shrink-0" />
                  <span className="text-background/70 text-sm">
                    {feat.name}
                  </span>
                  {typeof feat.free === 'string' && (
                    <span className="text-background/40 ml-auto font-mono text-xs">
                      {feat.free}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <span className="text-accent mb-6 block font-mono text-xs tracking-wider uppercase">
                Reflective &mdash; $8/mo
              </span>
              {COMPARISON.map((feat) => (
                <div
                  key={feat.name}
                  className="border-background/10 flex items-center gap-3 border-b py-3"
                >
                  <Check className="text-accent size-4 shrink-0" />
                  <span className="text-background/70 text-sm">
                    {feat.name}
                  </span>
                  {typeof feat.pro === 'string' && (
                    <span className="text-background/40 ml-auto font-mono text-xs">
                      {feat.pro}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
