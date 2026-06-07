import Image from 'next/image';
import Link from 'next/link';

import { HatchRadialSvgPattern } from '@/components/hatch-radial-svg-pattern';

type FooterProps = {
  name?: string;
  socials?: {
    href: string;
    label: string;
    iconSrc: string;
  }[];
};

export function Footer({
  name = 'shadcnblocks.com',
  socials = [
    {
      href: 'https://framer.com',
      label: 'Framer',
      iconSrc: '/icons/socials/framer.svg',
    },
    {
      href: 'https://instagram.com',
      label: 'Instagram',
      iconSrc: '/icons/socials/instagram.svg',
    },
    {
      href: 'https://x.com',
      label: 'X',
      iconSrc: '/icons/socials/x.svg',
    },
  ],
}: FooterProps) {
  return (
    <footer className="bg-background border-hatch-cta relative overflow-hidden border-b-4">
      <HatchRadialSvgPattern />
      <div className="relative z-10 container py-7 md:px-0">
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                aria-label={s.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">{s.label}</span>
                <Image
                  src={s.iconSrc}
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-80 transition-opacity hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
