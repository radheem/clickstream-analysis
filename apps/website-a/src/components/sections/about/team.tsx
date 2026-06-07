'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Badge } from '@/components/ui/badge';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { CONTACT_EMAIL } from '@/lib/constants';

const TEAM = [
  {
    name: 'James Moreno',
    role: 'Founder',
    avatar: '/images/about/team/james-moreno.webp',
  },
  {
    name: 'Priya Sharma',
    role: 'Co-founder',
    avatar: '/images/about/team/priya-sharma.webp',
  },
] as const;

const OPEN_ROLES = [
  {
    role: 'Product Engineer',
    description: 'Full-stack, product-minded. Ship features end to end.',
    avatar: '/images/about/team/open-role.png',
  },
  {
    role: 'Growth Designer',
    description:
      'Brand, landing pages, and conversion. Make Kinto unforgettable.',
    avatar: '/images/about/team/open-role.png',
  },
] as const;

function TeamCard({
  name,
  role,
  avatar,
}: {
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl sm:aspect-[3/5]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, filter: 'blur(3px)' }}
          whileInView={{ scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover object-top"
          />
        </motion.div>
        <ProgressiveBlur />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="font-display text-base leading-tight text-white md:text-lg lg:text-xl">
            {name}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/60 md:text-sm">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

function OpenRoleCard({ role, avatar }: { role: string; avatar: string }) {
  return (
    <Link
      href={`mailto:${CONTACT_EMAIL}?subject=Application: ${role}`}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl sm:aspect-[3/5]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, filter: 'blur(3px)' }}
          whileInView={{ scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={avatar}
            alt={`Open role: ${role}`}
            fill
            className="group-hover:blur-0 object-cover object-top opacity-60 blur-[1px] grayscale-[30%] transition-[transform,opacity,filter] duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
          />
        </motion.div>
        {/* Warm tint overlay */}
        <div className="bg-accent/10 absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" />

        {/* "You?" label — visible by default, hides on hover */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
          <span className="font-display text-3xl tracking-tight text-white/80 md:text-4xl">
            You?
          </span>
        </div>

        {/* Hover — "Apply now" pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="bg-accent text-accent-foreground inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-mono text-xs tracking-wider uppercase shadow-lg">
            Apply now &rarr;
          </span>
        </div>

        <ProgressiveBlur />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="font-display text-base leading-tight text-white md:text-lg lg:text-xl">
            {role}
          </p>
          <p className="text-accent mt-1 font-mono text-[0.625rem] tracking-wider uppercase">
            Open position
          </p>
        </div>

        {/* Dashed border ring to signal "empty slot" */}
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-white/20 transition-opacity duration-500 group-hover:opacity-0" />
      </div>
    </Link>
  );
}

export function MeetTheTeam() {
  return (
    <section id="team" className="section-padding scroll-mt-20">
      <div className="container">
        {/* Header — split layout */}
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-2">
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
              <Badge
                variant="subtle"
                shape="rounded"
                size="lg"
                className="mb-6"
              >
                The team
              </Badge>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER}>
              <h2 className="text-3xl leading-none tracking-tighter md:text-4xl lg:text-5xl">
                Small team,{' '}
                <span className="text-muted-foreground">big ambition.</span>
              </h2>
            </TextReveal>
          </motion.div>
          <TextReveal
            mode="whileInView"
            delay={0.1}
            viewportAmount={0.3}
            className="self-end"
          >
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              No layers, no middle management. Just two founders who ship fast
              and talk to users every day. We&apos;re growing the team &mdash;
              carefully.
            </p>
          </TextReveal>
        </div>

        {/* Team grid — founders + open role cards */}
        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <TeamCard {...member} />
            </motion.div>
          ))}
          {OPEN_ROLES.map((slot) => (
            <motion.div
              key={slot.role}
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <OpenRoleCard {...slot} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
