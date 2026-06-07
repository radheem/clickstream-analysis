'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconApple } from '@/components/icons/apple';
import { IconGooglePlay } from '@/components/icons/google-play';
import { Logo } from '@/components/layout/logo';
import { STORE_LINKS } from '@/lib/constants';

const AUTH_ROUTES = ['/login', '/signup'];

const PRODUCT_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
] as const;

const COMPANY_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
] as const;

export default function Footer() {
  const pathname = usePathname();
  if (AUTH_ROUTES.includes(pathname)) return null;

  return (
    <footer className="container pb-12">
      <div className="border-t border-dashed pt-10">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left — brand */}
          <div>
            <Logo />
            <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
              A journal that grows with you. Private, beautiful, and quietly
              powerful.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Link
                href={STORE_LINKS.appStore.href}
                aria-label={STORE_LINKS.appStore.label}
                className="bg-foreground hover:bg-foreground/90 flex h-9 items-center gap-2 rounded-lg px-3 transition-colors"
              >
                <IconApple className="text-background size-4" />
                <div className="text-background">
                  <p className="text-[0.45rem] leading-none">Download on the</p>
                  <p className="text-xs leading-tight font-semibold">
                    App Store
                  </p>
                </div>
              </Link>
              <Link
                href={STORE_LINKS.googlePlay.href}
                aria-label={STORE_LINKS.googlePlay.label}
                className="bg-foreground hover:bg-foreground/90 flex h-9 items-center gap-2 rounded-lg px-3 transition-colors"
              >
                <IconGooglePlay className="text-background size-4" />
                <div className="text-background">
                  <p className="text-[0.45rem] leading-none">Get it on</p>
                  <p className="text-xs leading-tight font-semibold">
                    Google Play
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-muted-foreground mb-3 block font-mono text-[0.625rem] tracking-wider uppercase">
                Product
              </span>
              <div className="flex flex-col gap-2.5">
                {PRODUCT_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-foreground hover:text-accent text-sm no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground mb-3 block font-mono text-[0.625rem] tracking-wider uppercase">
                Company
              </span>
              <div className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-foreground hover:text-accent text-sm no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-dashed pt-6">
          <span className="text-muted-foreground font-mono text-[0.625rem]">
            &copy; 2026 Kinto
          </span>
        </div>
      </div>
    </footer>
  );
}
