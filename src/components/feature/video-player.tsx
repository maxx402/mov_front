"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

interface Props {
  url: string;
  className?: string;
  onEnded?: () => void;
}

export function VideoPlayer({ url, className, onEnded }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<import("dplayer").default | null>(null);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let dp: import("dplayer").default | null = null;

    import("dplayer").then((mod) => {
      const DPlayer = mod.default;
      dp = new DPlayer({
        container,
        video: { url },
        autoplay: true,
        theme: "#F53C3D",
        lang: "zh-cn",
        preload: "auto",
      });
      dp.on("ended", () => onEndedRef.current?.());
      playerRef.current = dp;
    });

    return () => {
      dp?.destroy();
      playerRef.current = null;
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={clsx("relative w-full bg-black", className)}
      style={{ aspectRatio: "3/2" }}
    />
  );
}
