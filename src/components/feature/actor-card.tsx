"use client";

import Link from "next/link";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { Actor } from "@/domain/entities/actor";
import clsx from "clsx";

interface Props {
  actor: Actor;
  className?: string;
}

export function ActorCard({ actor, className }: Props) {
  return (
    <Link
      href={'/star/' + actor.id}
      className={clsx("block", className)}
    >
      <div className="flex" style={{ height: 135 }}>
        {/* Avatar */}
        <OptimizedImage
          src={actor.avatar ?? ""}
          alt={actor.name}
          width={100}
          height={135}
          rounded="rounded-[5px]"
          className="shrink-0 object-cover w-[100px] h-[135px]"
        />
        {/* Info */}
        <div
          className="flex flex-1 flex-col"
          style={{ marginLeft: 10 }}
        >
          {/* Name + Area */}
          <div className="flex items-start" style={{ height: 22 }}>
            <span
              className="flex-1 truncate"
              style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "18px" }}
            >
              {actor.name}
            </span>
            {actor.area && (
              <span
                className="ml-2 flex shrink-0 items-center justify-center"
                style={{
                  height: 22,
                  padding: "0 8px",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: 4,
                  fontSize: 10,
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1,
                }}
              >
                {actor.area}
              </span>
            )}
          </div>
          {/* Description */}
          <p
            className="mt-2 flex-1"
            style={{
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: "17px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {actor.description ?? ""}
          </p>
          {/* Movie count */}
          {actor.movieCount !== undefined && actor.movieCount > 0 && (
            <div
              className="flex w-full items-center justify-center"
              style={{
                height: 30,
                background: "rgba(245, 60, 61, 0.1)",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 700,
                color: "#F53C3D",
                lineHeight: 1,
              }}
            >
              相关影片 {actor.movieCount}部
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
