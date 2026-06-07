'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease },
  },
};

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="gap-2">
        <svg className="size-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
          />
        </svg>
        Google
      </Button>
      <Button variant="outline" className="gap-2">
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.12 4.53-3.74 4.25Z" />
        </svg>
        Apple
      </Button>
    </div>
  );
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-muted-foreground font-mono text-[0.625rem] tracking-wider uppercase">
        or continue with email
      </span>
      <Separator className="flex-1" />
    </div>
  );
}

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
      }}
    >
      <motion.h1
        className="font-display mt-10 text-3xl tracking-tight"
        variants={fadeUp}
      >
        {mode === 'login' ? 'Welcome back' : 'Start your journal'}
      </motion.h1>
      <motion.p
        className="text-muted-foreground mt-2 text-sm"
        variants={fadeUp}
      >
        {mode === 'login'
          ? 'Pick up where you left off.'
          : 'Your first entry is waiting.'}
      </motion.p>

      <motion.div className="mt-8 flex flex-col gap-5" variants={fadeUp}>
        <SocialButtons />
        <OrDivider />
        <FieldGroup>
          {mode === 'signup' && (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" placeholder="Your name" />
            </Field>
          )}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="you@example.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            />
          </Field>
          {mode === 'signup' && (
            <Field>
              <FieldLabel htmlFor="confirm">Confirm password</FieldLabel>
              <Input
                id="confirm"
                type="password"
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              />
            </Field>
          )}
        </FieldGroup>
        <Button className="w-full">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>
      </motion.div>

      <motion.p
        className="text-muted-foreground mt-8 text-sm"
        variants={fadeUp}
      >
        {mode === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-accent hover:text-accent-hover font-medium"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-accent hover:text-accent-hover font-medium"
            >
              Sign in
            </Link>
          </>
        )}
      </motion.p>
    </motion.div>
  );
}
