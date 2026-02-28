"use client";

import { useEffect, useRef, useCallback } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface Props {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
  children: React.ReactNode;
  className?: string;
}

export function InfiniteList({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 200,
  children,
  className,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, isLoading],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: `0px 0px ${threshold}px 0px`,
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [handleIntersect, threshold]);

  return (
    <div className={className}>
      {children}
      <div ref={sentinelRef} />
      {isLoading && hasMore && <LoadingSpinner />}
    </div>
  );
}
