"use client";

import Link from "next/link";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { Topic } from "@/domain/entities/topic";
import clsx from "clsx";

interface Props {
  topic: Topic;
  className?: string;
}

export function TopicCard({ topic, className }: Props) {
  return (
    <Link href={'/topic/' + topic.id} className={clsx("block", className)}>
      <div style={{ height: 106, position: "relative", borderRadius: 5, overflow: "hidden" }}>
        <OptimizedImage
          src={topic.cover ?? ""}
          alt={topic.name}
          width={180}
          height={106}
          className="h-full w-full object-cover"
        />
        {topic.movieCount > 0 && (
          <span
            className="absolute flex items-center justify-center"
            style={{
              top: 5,
              right: 5,
              height: 22,
              padding: "0 8px",
              background: "#FF8D28",
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: "12px",
            }}
          >
            共{topic.movieCount}部
          </span>
        )}
      </div>
      <p
        className="truncate"
        style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}
      >
        {topic.name}
      </p>
    </Link>
  );
}
