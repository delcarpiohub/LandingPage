"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  text?: string;
  asChild?: boolean;
  children?: React.ReactElement;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ asChild = false, children, className, text = "Button", type = "button", ...props }, ref) => {
  const buttonClassName = cn(
    "group relative inline-flex h-12 min-w-40 cursor-pointer items-center justify-center overflow-hidden rounded-[2px] border border-[var(--primary)] bg-transparent px-5 text-center text-sm font-bold text-[var(--foreground)] transition-[border-color,transform] duration-300 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBE369] disabled:pointer-events-none disabled:opacity-50",
    className,
  );

  const content = (
    <>
      <span className="relative z-10 inline-block transition-all duration-300 ease-[var(--ease-out)] motion-reduce:transition-none group-hover:translate-x-10 group-hover:opacity-0">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-20 flex translate-x-10 items-center justify-center gap-2 text-[var(--primary-foreground)] opacity-0 transition-all duration-300 ease-[var(--ease-out)] motion-reduce:transition-none group-hover:translate-x-0 group-hover:opacity-100"
      >
        <span>{text}</span>
        <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} />
      </span>
      <span
        aria-hidden="true"
        className="absolute left-[20%] top-[40%] z-0 h-2 w-2 rounded-[2px] bg-[var(--primary)] transition-all duration-300 ease-[var(--ease-out)] motion-reduce:transition-none group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full"
      />
    </>
  );

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;

    return React.cloneElement(child, {
      ...props,
      className: cn(buttonClassName, child.props.className),
      children: content,
    });
  }

  return (
    <button ref={ref} type={type} className={buttonClassName} {...props}>
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
