"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const DESKTOP_MOTION_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const VIDEO_READY_TIMEOUT_MS = 5000;

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
  const [hasVideoFailed, setHasVideoFailed] = useState(false);
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

    if (!video || hasVideoFailed) {
      return;
    }

    if (!isInViewport) {
      video.pause();
      return;
    }

    let didReachCanPlay = video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
    const handleCanPlay = () => {
      didReachCanPlay = true;
    };
    const handleFailure = () => {
      video.pause();
      setHasVideoFailed(true);
    };
    const timeoutId = window.setTimeout(() => {
      if (!didReachCanPlay) {
        handleFailure();
      }
    }, VIDEO_READY_TIMEOUT_MS);

    video.addEventListener("canplay", handleCanPlay, { once: true });
    video.addEventListener("error", handleFailure, { once: true });
    void video.play().catch(handleFailure);

    return () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleFailure);
      video.pause();
    };
  }, [hasVideoFailed, isInViewport, shouldRenderVideo]);

  if (!shouldRenderVideo || hasVideoFailed) {
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
