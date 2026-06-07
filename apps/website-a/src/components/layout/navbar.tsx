'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ThemeToggle } from '@/components/elements/theme-toggle';
import { Logo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { useBannerVisibility } from '@/hooks/use-banner-visibility';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

function MobileMenu({
  onClose,
  pathname,
}: {
  onClose: () => void;
  pathname: string;
}) {
  return createPortal(
    <motion.div
      className="bg-background fixed inset-0 z-[9999] flex flex-col"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
      initial={{ clipPath: 'circle(0% at 50% 28px)' }}
      animate={{ clipPath: 'circle(200% at 50% 28px)' }}
      exit={{ clipPath: 'circle(0% at 50% 28px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container flex items-center justify-between py-5">
        <div onClick={onClose}>
          <Logo />
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground py-2 font-mono text-[0.625rem] tracking-wider uppercase transition-colors"
        >
          Close
        </button>
      </div>

      <div className="container flex flex-1 flex-col justify-center">
        {NAV_LINKS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-baseline gap-4 border-b border-dashed py-6 no-underline transition-colors',
                pathname === item.href || pathname.startsWith(item.href + '/')
                  ? 'text-accent'
                  : 'text-foreground hover:text-accent',
              )}
            >
              <span className="text-accent/40 font-mono text-xs">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-4xl tracking-tight">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="container flex gap-3 pb-10">
        <Button asChild variant="outline" size="lg" className="flex-1">
          <Link href="/login" onClick={onClose}>
            Sign in
          </Link>
        </Button>
        <Button asChild size="lg" className="flex-1">
          <Link href="/signup" onClick={onClose}>
            Start writing
          </Link>
        </Button>
      </div>
    </motion.div>,
    document.body,
  );
}

const AUTH_ROUTES = ['/login', '/signup'];

export default function Navbar({
  initialBannerVisible = true,
}: {
  initialBannerVisible?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolledPastBanner, setScrolledPastBanner] = useState(false);
  const { scrollY } = useScroll();
  const { isBannerVisible } = useBannerVisibility(initialBannerVisible);
  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - lastY.current;
    lastY.current = y;
    // Show at top, hide on scroll down, reveal on scroll up
    if (y < 20) {
      setHidden(false);
      setScrolledPastBanner(false);
    } else if (delta > 3) {
      setHidden(true);
      setScrolledPastBanner(true);
    } else if (delta < -3) {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  if (isAuthPage) return null;

  return (
    <>
      <motion.nav
        className={cn(
          'fixed inset-x-0 top-0 z-20 py-4 transition-[margin] duration-300 md:py-5',
          isBannerVisible && !scrolledPastBanner && 'mt-14',
        )}
        animate={{
          y: hidden ? '-100%' : '0%',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <div className="container flex justify-center">
          <div className="bg-background/90 border-border/30 flex min-w-[175px] items-center justify-between gap-1 rounded-full border px-1.5 py-1 shadow-sm backdrop-blur-2xl md:min-w-fit md:gap-1 md:px-2 md:py-1.5">
            {/* Logo */}
            <Logo className="rounded-full px-3 py-2 md:px-4" />

            {/* Desktop links */}
            <div className="hidden items-center md:mx-4 md:flex">
              {NAV_LINKS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'rounded-full px-3.5 py-2 text-sm no-underline transition-colors lg:px-4',
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden items-center gap-1.5 md:flex">
              <ThemeToggle />
              <Button asChild variant="ghost" className="rounded-full">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/signup">Start writing</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              className="text-muted-foreground hover:text-foreground flex items-center rounded-full px-4 py-2 font-mono text-[0.625rem] tracking-wider uppercase transition-colors md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <MobileMenu onClose={() => setOpen(false)} pathname={pathname} />
        )}
      </AnimatePresence>
    </>
  );
}
