"use client";

import Image from "next/image";
import clsx from "clsx";

interface Props {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export function ErrorState({
  message = "出错了",
  onRetry,
  retryText = "重试",
  className,
}: Props) {
  return (
    <div className={clsx("flex flex-col items-center justify-center gap-3 py-16", className)}>
      <Image
        src="/images/ic_status_error.webp"
        alt="error"
        width={80}
        height={80}
        style={{ opacity: 0.6 }}
      />
      <span className="text-sm text-text-tertiary">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full bg-card px-6 py-2 text-sm text-text-secondary hover:bg-surface"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
