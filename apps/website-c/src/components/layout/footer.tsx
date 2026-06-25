import Link from 'next/link';

import { Instagram } from 'lucide-react';

import Logo from '../ui/logo';

import { cn } from '@/lib/utils';

const ITEMS = [
  {
    title: 'Company',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: '@Shadcnblocks.com',
    href: 'https://www.shadcnblocks.com',
    icon: null,
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/shadcnblocks',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M20.1328 20.4259L14.264 11.2028L20.0549 4.8325C20.1859 4.68487 20.2534 4.49156 20.2428 4.29449C20.2322 4.09742 20.1444 3.91247 19.9983 3.77974C19.8523 3.64701 19.6598 3.5772 19.4626 3.58543C19.2654 3.59367 19.0794 3.6793 18.9449 3.82375L13.4287 9.89125L9.63276 3.92594C9.56507 3.81939 9.47158 3.73166 9.36097 3.67086C9.25035 3.61006 9.12617 3.57816 8.99994 3.57813H4.49994C4.36547 3.57806 4.23345 3.61415 4.11771 3.68262C4.00198 3.75109 3.90677 3.84941 3.84208 3.9673C3.77738 4.08519 3.74558 4.21831 3.74998 4.35271C3.75439 4.48711 3.79485 4.61785 3.86713 4.73125L9.73588 13.9534L3.94494 20.3284C3.87732 20.4011 3.82479 20.4864 3.79039 20.5795C3.75599 20.6726 3.74041 20.7716 3.74455 20.8708C3.74869 20.9699 3.77248 21.0673 3.81452 21.1572C3.85657 21.2471 3.91604 21.3278 3.98949 21.3945C4.06293 21.4613 4.1489 21.5128 4.2424 21.546C4.3359 21.5793 4.43508 21.5937 4.53419 21.5884C4.63329 21.5831 4.73035 21.5581 4.81974 21.515C4.90914 21.4719 4.98908 21.4114 5.05494 21.3372L10.5712 15.2697L14.3671 21.235C14.4354 21.3407 14.5291 21.4275 14.6397 21.4874C14.7503 21.5474 14.8742 21.5786 14.9999 21.5781H19.4999C19.6343 21.5781 19.7661 21.542 19.8817 21.4735C19.9973 21.4051 20.0924 21.3069 20.1571 21.1892C20.2218 21.0714 20.2536 20.9385 20.2493 20.8042C20.2451 20.67 20.2048 20.5393 20.1328 20.4259ZM15.4115 20.0781L5.86588 5.07812H8.58463L18.134 20.0781H15.4115Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://x.com/shadcnblocks',
    icon: <Instagram />,
  },
];

const Footer = () => {
  return (
    <section className="bg-footer-background text-background py-11 md:py-15">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:gap-14">
          <div className="flex w-full flex-col divide-y md:w-auto md:flex-row md:items-center md:divide-x md:divide-y-0">
            <Logo wrapperClassName="md:pe-4 border-background/10 pb-4 md:pb-0 [&_img]:invert dark:[&_img]:invert-0" />

            <p className="pt-4 text-xl md:ps-4 md:pt-0">
              The Perfect Sound, Anywhere
            </p>
          </div>

          {/* Menu */}
          <div className="grid flex-1 justify-center gap-6 md:flex md:grid-cols-2 md:gap-20 lg:gap-24">
            {ITEMS.map((section, sectionIdx) => (
              <div key={sectionIdx} className="min-w-[120px]">
                <h3 className="text-xl">{section.title}</h3>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="transition-opacity hover:opacity-80"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Logo
          wrapperClassName="my-8  md:my-10 opacity-10"
          className="h-24 w-[min(90%,400px)] md:h-32 md:w-full lg:h-73 [&_img]:invert dark:[&_img]:invert-0"
        />

        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <p className="text-xl opacity-70">
            © {new Date().getFullYear()}. All rights reserved. SONIC
          </p>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  'opacity-70 transition-opacity hover:opacity-100',
                  link.icon && 'opacity-100 hover:opacity-80',
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
              >
                {link.icon || link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
