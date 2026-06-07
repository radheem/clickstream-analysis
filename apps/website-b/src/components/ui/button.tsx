// components/ui/button.tsx
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm  transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-none hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'bg-transparent text-foreground border border-border shadow-xs hover:bg-muted rounded-full',
        toggle:
          'border rounded-full border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground border border-transparent text-foreground',
        link: 'underline-offset-4 hover:underline text-foreground font-medium',
        hatch: cn(
          'rounded-full gap-[6px]',
          'border-0 bg-primary text-primary-foreground shadow-none',
          'hover:bg-primary/90 active:bg-primary/85',
        ),
        text: 'bg-transparent text-foreground  hover:opacity-80 rounded-full',
        pill: 'bg-muted text-foreground rounded-full hover:bg-muted/80',
      },
      size: {
        default: 'h-10 px-6 py-[14px]',
        sm: 'h-9 px-3 text-xs',
        lg: 'p-2.5',
        icon: 'size-9',
        link: 'h-auto p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
