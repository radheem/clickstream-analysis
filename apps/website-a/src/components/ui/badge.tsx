import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-mono text-[0.625rem] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'text-muted-foreground',
        amber: 'border-accent-light bg-accent-subtle text-accent-hover',
        subtle:
          'border-transparent bg-accent-subtle text-foreground font-medium',
        destructive: 'border-transparent bg-destructive/10 text-destructive',
      },
      shape: {
        pill: '',
        rounded: 'rounded-lg',
      },
      size: {
        default: 'px-3 py-1',
        sm: 'px-2 py-0.5',
        lg: 'px-4 py-1.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'pill',
      size: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  shape,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, shape, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
