import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'text-foreground flex items-center gap-2 no-underline',
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-accent size-6 shrink-0"
      >
        {/* Spine: Abstract Pen Nib */}
        <path
          d="M5 6a4 4 0 0 1 8 0v20a4 4 0 0 1-8 0V6z M8.5 4h1v6h-1V4z M8 11.5a1 1 0 1 1 2 0a1 1 0 1 1-2 0z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        {/* Bottom Page */}
        <path
          d="M 9 16 C 16 16 22 21 27 26 L 30 23 C 25 18 18 11 9 11 Z"
          fill="currentColor"
          opacity="0.4"
        />
        {/* Top Page */}
        <path
          d="M 9 16 C 16 16 22 11 27 6 L 30 9 C 25 14 18 21 9 21 Z"
          fill="currentColor"
          opacity="0.75"
        />
      </svg>
      <span className="font-display text-base">Kinto</span>
    </Link>
  );
}
