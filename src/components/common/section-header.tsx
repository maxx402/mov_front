"use client";

import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface Props {
  title: string;
  onMore?: () => void;
  moreText?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function SectionHeader({
  title,
  onMore,
  moreText,
  className,
  icon,
}: Props) {
  return (
    <div className={clsx("flex items-center justify-between px-2.5 py-3", className)}>
      <div className="flex items-center gap-2">
        {icon}
        <h3
          className="text-text-primary"
          style={{ fontSize: 16, fontWeight: 600, lineHeight: 1 }}
        >
          {title}
        </h3>
      </div>
      {onMore && (
        <button
          onClick={onMore}
          className="flex items-center"
        >
          {moreText && (
            <span style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)" }}>
              {moreText}
            </span>
          )}
          <ChevronRight size={12} color="rgba(255, 255, 255, 0.6)" />
        </button>
      )}
    </div>
  );
}
