"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const shouldRenderVideo = useSyncExternalStore(
    subscribeToDesktopMotion,
    getDesktopMotionSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldRenderVideo]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (!isInViewport) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      video.pause();
    });
  }, [isInViewport, shouldRenderVideo]);

  if (!shouldRenderVideo) {
    return null;
  }

  return (
    <video
      aria-hidden="true"
      ref={videoRef}
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
