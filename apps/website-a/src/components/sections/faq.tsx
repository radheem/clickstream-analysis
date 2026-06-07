'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

import { TextReveal } from '@/components/elements/text-reveal';

const FAQ_ITEMS = [
  {
    q: 'How does Kinto protect my privacy?',
    a: 'Every journal entry is end-to-end encrypted before it leaves your device. We cannot read your entries, and neither can anyone else. Your encryption keys belong to you alone. We will never sell data, serve ads, or share your writing with third parties. Period.',
  },
  {
    q: 'How does the AI work without compromising my data?',
    a: 'Kinto processes your entries using privacy-preserving AI models that run in isolated, encrypted environments. Your text is never used to train models and is never stored beyond the time needed to generate your reflection. The AI sees one entry at a time, surfaces a response, and forgets.',
  },
  {
    q: 'Can I export or delete my data?',
    a: 'You own everything you write. Export your full journal at any time as PDF, markdown, or JSON. If you choose to delete your account, we erase all data within 24 hours \u2014 permanently, with no backup copies retained on our end.',
  },
  {
    q: 'How much does Kinto cost?',
    a: 'The Personal plan is free forever and includes unlimited entries, basic mood tracking, and three AI reflections per week. The Reflective plan is $8 per month (or $72 per year) and unlocks unlimited AI reflections, weekly synthesis reports, advanced analytics, and more.',
  },
  {
    q: 'Which platforms does Kinto support?',
    a: 'Kinto is available on iOS, Android, macOS, Windows, and the web. Your journal syncs automatically and instantly across every device. Write on your phone during your commute, then pick up on your laptop at home \u2014 it\u2019s seamless.',
  },
] as const;

export function Faq() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: {} }}
        >
          <TextReveal mode="animate" className="mb-12 md:mb-20">
            <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
              Common questions
            </h2>
          </TextReveal>
          <motion.div
            className="space-y-0"
            onMouseLeave={() => setHovered(null)}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.4 },
              },
            }}
          >
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className="cursor-pointer py-6 first:pt-0"
                onMouseEnter={() => setHovered(i)}
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
                <motion.div
                  animate={{
                    opacity: hovered === null || hovered === i ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ x: hovered === i ? 8 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-accent font-mono text-[0.625rem] font-medium tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="bg-accent/30 h-px flex-1" />
                    </div>
                    <h3 className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
                      {item.q}
                    </h3>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
