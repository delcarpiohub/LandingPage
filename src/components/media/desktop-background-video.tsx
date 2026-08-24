"use client";

import { useSyncExternalStore } from "react";

const DESKTOP_MOTION_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribeToDesktopMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MOTION_QUERY);

  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopMotionSnapshot() {
  return window.matchMedia(DESKTOP_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

type DesktopBackgroundVideoProps = {
  className?: string;
  poster: string;
  src: string;
};

export function DesktopBackgroundVideo({
  className,
  poster,
  src,
}: DesktopBackgroundVideoProps) {
  const shouldRenderVideo = useSyncExternalStore(
    subscribeToDesktopMotion,
    getDesktopMotionSnapshot,
    getServerSnapshot,
  );

  if (!shouldRenderVideo) {
    return null;
  }

  return (
    <video
      aria-hidden="true"
      autoPlay
      className={className}
      loop
      muted
      playsInline
      poster={poster}
      preload="metadata"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
