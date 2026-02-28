"use client";

import { useState } from "react";
import ReactPlayer from "react-player";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import clsx from "clsx";

interface Props {
  url: string;
  className?: string;
  onEnded?: () => void;
}

export function VideoPlayer({ url, className, onEnded }: Props) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className={clsx("relative w-full bg-black", className)} style={{ aspectRatio: "3/2" }}>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls
        playing
        onReady={() => setIsReady(true)}
        onEnded={onEnded}
      />
    </div>
  );
}
