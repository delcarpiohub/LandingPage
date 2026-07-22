import { useCallback, useRef, useState, useEffect } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export function useInfiniteScroll({
  hasMore,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollOptions) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const observerRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node) {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasMore) {
              setIsIntersecting(true);
              onLoadMore();
            } else {
              setIsIntersecting(false);
            }
          },
          {
            rootMargin,
            threshold: 0,
          }
        );

        observer.current.observe(node);
      }
    },
    [hasMore, onLoadMore, rootMargin]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { observerRef, isIntersecting };
}
