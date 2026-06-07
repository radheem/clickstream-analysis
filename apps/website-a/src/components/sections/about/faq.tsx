'use client';

import { motion } from 'motion/react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'What makes Kinto different from other journaling apps?',
    a: 'We\u2019re indie hackers who actually use what we build. There\u2019s no product team debating roadmaps in meetings \u2014 we talk to users, spot the friction, and ship the fix. That keeps Kinto sharp and opinionated instead of bloated.',
  },
  {
    q: 'How does a two-person team handle privacy?',
    a: 'Being small makes it easier, not harder. Every entry is encrypted on your device before it reaches our servers. We can\u2019t read your journal even if we wanted to. No third-party analytics, no data brokers, no exceptions.',
  },
  {
    q: 'You\u2019re bootstrapped \u2014 is Kinto sustainable?',
    a: 'Profitable since month eight. Our business model is dead simple: we charge for the product. No ads, no data mining, no investors pushing for growth-at-all-costs. The subscription is the entire business.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes, from day one. Full export in Markdown, JSON, and PDF. No paywall, no hidden menus. If you leave, every word goes with you. We built Kinto to be left behind if you outgrow it.',
  },
  {
    q: 'Are you hiring?',
    a: 'We\u2019re growing from two to four. We\u2019re looking for a product engineer and a growth designer who want to work directly with founders, ship fast, and own their impact. Check our team section above to apply.',
  },
] as const;

export function AboutFaq() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          className="grid gap-10 md:grid-cols-5 md:gap-16 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Left — sticky header */}
          <motion.div
            className="md:col-span-2"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <motion.div
              className="md:sticky md:top-28"
              variants={{
                hidden: {},
                visible: {},
              }}
            >
              <TextReveal mode="animate">
                <span className="text-accent mb-4 block font-mono text-xs tracking-wider uppercase">
                  FAQ
                </span>
              </TextReveal>
              <TextReveal mode="animate" delay={REVEAL_STAGGER}>
                <h2 className="text-3xl leading-none tracking-tighter md:text-4xl lg:text-5xl">
                  Your questions{' '}
                  <em className="text-accent not-italic">answered.</em>
                </h2>
              </TextReveal>
              <TextReveal
                mode="animate"
                delay={REVEAL_STAGGER * 2}
                className="mt-4"
              >
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Everything you need to know about Kinto. Still have questions?
                  Reach out anytime.
                </p>
              </TextReveal>
            </motion.div>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            className="md:col-span-3"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <Accordion type="single" collapsible>
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  <AccordionItem value={`faq-${i}`} className="border-none">
                    <div className="mb-2 flex items-center gap-3 pt-6">
                      <span className="text-accent font-mono text-[0.625rem] font-medium tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="bg-accent/30 h-px flex-1" />
                    </div>
                    <AccordionTrigger className="font-display pt-2 pb-4 text-xl leading-tight tracking-tight md:text-2xl">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
