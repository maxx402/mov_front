"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OptimizedImage } from "@/components/common/optimized-image";
import type { Channel } from "@/domain/entities/channel";
import { hasChannelMore } from "@/domain/entities/channel";
import type { Movie } from "@/domain/entities/movie";
import { isMovieFHD, getMovieStatusText } from "@/domain/entities/movie";

interface Props {
  channel: Channel;
}

export function ChannelSection({ channel }: Props) {
  const router = useRouter();

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 236 }}
    >
      {/* Background image */}
      <Image
        src={channel.backgroundImage ?? "/images/channel_card_bg.webp"}
        alt=""
        fill
        className="object-cover"
      />
      {/* Content overlay */}
      <div className="relative flex h-full flex-col" style={{ paddingTop: 16 }}>
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ paddingLeft: 12, paddingRight: 16 }}
        >
          <div className="flex items-center">
            {/* Channel icon */}
            <Image
              src={channel.icon ?? "/images/channel_card_icon.webp"}
              alt=""
              width={15}
              height={15}
              style={{ width: 15, height: 15 }}
            />
            <span
              className="ml-1.5"
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: "16px",
              }}
            >
              {channel.name}
            </span>
          </div>
          {hasChannelMore(channel) && (
            <button
              onClick={() => router.push(`/channel/${channel.id}`)}
              className="flex items-center"
            >
              <span style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)" }}>
                更多
              </span>
              <ChevronRight size={12} color="#979797" />
            </button>
          )}
        </div>
        {/* Movie list */}
        <div
          className="scrollbar-none mt-4 flex flex-1 items-start overflow-x-auto"
          style={{ paddingLeft: 12, gap: 8 }}
        >
          {channel.movies.map((movie) => (
            <ChannelMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChannelMovieCard({ movie }: { movie: Movie }) {
  const fhd = isMovieFHD(movie);
  const statusText = getMovieStatusText(movie);

  return (
    <Link href={`/movie/${movie.id}`} className="shrink-0" style={{ width: 108 }}>
      {/* Cover */}
      <div
        className="relative overflow-hidden"
        style={{ width: 108, height: 150, borderRadius: 5 }}
      >
        <OptimizedImage
          src={movie.cover}
          alt={movie.title}
          width={108}
          height={150}
          className="h-full w-full object-cover"
        />
        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 32,
            background: "linear-gradient(to top, #0D0C0B, transparent)",
            borderRadius: "0 0 5px 5px",
          }}
        />
        {/* FHD badge */}
        {fhd && (
          <Image
            src="/images/fhd_badge_r.webp"
            alt="FHD"
            width={28}
            height={16}
            className="absolute top-0 right-0"
          />
        )}
        {/* Score + Status */}
        <div
          className="absolute flex items-end"
          style={{ bottom: 8, right: 8, gap: 6 }}
        >
          {statusText && (
            <span style={{ fontSize: 12, color: "#E4D5D1" }}>
              {statusText}
            </span>
          )}
          {movie.score > 0 && (
            <span
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              {movie.score.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      {/* Title */}
      <p
        className="mt-2 truncate"
        style={{ fontSize: 13, color: "#FFFFFF" }}
      >
        {movie.title}
      </p>
    </Link>
  );
}
