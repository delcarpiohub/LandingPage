import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-12 items-center justify-center gap-2 rounded-[2px] px-7 text-sm font-bold transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-btn)] hover:bg-[var(--primary-strong)]",
        secondary:
          "border border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
        ghost:
          "text-[var(--foreground)] hover:bg-white/70",
        "ghost-white":
          "border border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#4A5560]",
        dark:
          "bg-ink text-white shadow-[var(--shadow-card)] hover:bg-black",
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
