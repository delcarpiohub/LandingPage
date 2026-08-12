"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

type HighlightContextValue = {
  layoutId: string;
  hoveredId: string | null;
  hover: boolean;
  setHoveredId: React.Dispatch<React.SetStateAction<string | null>>;
  highlightClassName?: string;
  highlightStyle?: React.CSSProperties;
  transition: Transition;
};

const HighlightContext = React.createContext<HighlightContextValue | null>(
  null,
);

type HighlightProps = React.ComponentPropsWithRef<"div"> & {
  /**
   * Positioning strategy for the moving highlight. Only "parent" is
   * implemented: the highlight is rendered inside whichever
   * `HighlightItem` is currently active and animated between items via a
   * shared Motion `layoutId`.
   */
  mode?: "parent";
  /**
   * Items opt in explicitly via `HighlightItem` rather than being
   * auto-detected from the DOM tree.
   */
  controlledItems?: boolean;
  /** Track the highlight on hover/focus instead of only on click. */
  hover?: boolean;
  containerClassName?: string;
  transition?: Transition;
};

function Highlight({
  children,
  className,
  containerClassName,
  style,
  hover = false,
  transition,
  ...props
}: HighlightProps) {
  const layoutId = React.useId();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const contextValue = React.useMemo<HighlightContextValue>(
    () => ({
      layoutId,
      hoveredId,
      hover,
      setHoveredId,
      highlightClassName: className,
      highlightStyle: style,
      transition: transition ?? {
        type: "spring",
        stiffness: 350,
        damping: 32,
        bounce: 0,
      },
    }),
    [layoutId, hoveredId, hover, className, style, transition],
  );

  return (
    <HighlightContext.Provider value={contextValue}>
      <div className={cn(containerClassName)} {...props}>
        {children}
      </div>
    </HighlightContext.Provider>
  );
}

type HighlightItemProps = React.ComponentPropsWithRef<"span"> & {
  asChild?: boolean;
  id?: string;
};

function HighlightItem({
  asChild = false,
  id,
  className,
  children,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}: HighlightItemProps) {
  const context = React.useContext(HighlightContext);
  const generatedId = React.useId();
  const itemId = id ?? generatedId;
  const Comp = asChild ? Slot : "div";
  const isActive = !!context && context.hoveredId === itemId;

  return (
    <span
      className={cn("relative inline-flex", className)}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);

        if (context?.hover) {
          context.setHoveredId(itemId);
        }
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);

        if (context?.hover) {
          context.setHoveredId((current) =>
            current === itemId ? null : current,
          );
        }
      }}
      onFocus={(event) => {
        onFocus?.(event);

        if (context?.hover) {
          context.setHoveredId(itemId);
        }
      }}
      onBlur={(event) => {
        onBlur?.(event);

        if (context?.hover) {
          context.setHoveredId((current) =>
            current === itemId ? null : current,
          );
        }
      }}
      {...props}
    >
      <AnimatePresence>
        {isActive && context && (
          <motion.div
            layoutId={context.layoutId}
            className={cn(
              "absolute inset-0 -z-10",
              context.highlightClassName,
            )}
            style={context.highlightStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={context.transition}
          />
        )}
      </AnimatePresence>
      <Comp>{children}</Comp>
    </span>
  );
}

export { Highlight, HighlightItem };
