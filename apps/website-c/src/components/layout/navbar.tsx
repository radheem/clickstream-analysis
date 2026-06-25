'use client';
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import Logo from '../ui/logo';

import { cn } from '@/lib/utils';

const ITEMS = [
  { label: 'Product', href: '/product' },
  { label: 'Specifications', href: '/specifications' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="text-muted-foreground relative z-50 container flex items-center justify-between gap-4 py-3 md:py-4">
      <Logo wrapperClassName="flex w-47 justify-start dark:invert" />

      <nav className="">
        <ul className="hidden items-center gap-6 md:flex">
          {ITEMS.map((item) => (
            <li key={item.label} className="flex items-center">
              <Link
                href={item.href}
                className={cn(
                  'transition-all hover:opacity-80',
                  pathname === item.href && 'text-primary font-medium',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden w-47 items-center justify-end gap-4 md:flex">
        <ThemeToggle />
        <Button
          variant="outline"
          size="lg"
          className="rounded-full [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
          asChild
        >
          <Link href="/pricing">
            Buy now <ChevronRight />
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <ThemeToggle />
        <button
          className="text-base-dark relative z-10 flex size-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="absolute top-1/2 left-1/2 block w-6 -translate-x-1/2 -translate-y-1/2">
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
            ></span>

            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
            ></span>
          </div>
        </button>
      </div>
      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          'fixed inset-x-0 top-14 bottom-0 md:hidden',
          isMenuOpen ? 'visible' : 'invisible',
        )}
      >
        <div
          className={cn(
            'bg-base-dark/85 dark:bg-base-dark/25 absolute inset-0 backdrop-blur transition-opacity duration-500 ease-out',
            !isMenuOpen && 'opacity-0',
          )}
        />
        <nav
          className={cn(
            'bg-background relative ms-auto me-0 flex h-full w-[85%] flex-col border-t p-6 transition-all duration-500 ease-out',
            isMenuOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0',
          )}
        >
          {ITEMS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'py-3 text-center transition-all hover:opacity-80',
                pathname === link.href && 'text-primary font-medium',
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col items-center justify-end gap-4">
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/pricing">
                Buy now <ChevronRight />
              </Link>
            </Button>
          </div>
        </nav>
        <motion.div
          key={isMenuOpen ? 'open' : 'closed'}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/products/main-product.webp"
            alt="Sonic Logo"
            width={374}
            height={330}
            className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/4"
          />
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
