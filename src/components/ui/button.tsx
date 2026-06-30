import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-12 items-center justify-center gap-2 rounded-[2px] px-7 text-sm font-bold transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-strong)]",
        secondary:
          "border border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--science-cyan)] hover:text-[var(--science-cyan-dark)]",
        ghost:
          "text-[var(--foreground)] hover:bg-white/70",
        "ghost-white":
          "border border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-[var(--science-cyan-dark)]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
