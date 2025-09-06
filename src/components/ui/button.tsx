import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-magical focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-card",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl",
        outline: "border-2 border-primary/20 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary/10 hover:border-primary/40 rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl shadow-card",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        // KahaniKaar special variants
        hero: "gradient-hero text-primary-foreground font-semibold rounded-2xl shadow-story hover:scale-105 btn-magical text-base",
        story: "bg-accent text-accent-foreground hover:bg-accent/80 rounded-2xl shadow-card font-medium",
        magical: "gradient-primary text-primary-foreground rounded-2xl shadow-story hover:animate-magical-glow btn-magical font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-2xl px-8 py-3",
        xl: "h-14 rounded-2xl px-10 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
