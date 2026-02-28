"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import type { Banner } from "@/domain/entities/banner";
import { BannerLinkType } from "@/domain/entities/banner";

interface Props {
  banners: readonly Banner[];
}

function getBannerHref(banner: Banner): string | null {
  switch (banner.linkType) {
    case BannerLinkType.Movie:
      return banner.linkValue ? `/movie/${banner.linkValue}` : null;
    case BannerLinkType.Actor:
      return banner.linkValue ? `/star/${banner.linkValue}` : null;
    case BannerLinkType.Topic:
      return banner.linkValue ? `/topic/${banner.linkValue}` : null;
    default:
      return null;
  }
}

export function BannerCarousel({ banners }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full" style={{ height: 386 }}>
      <div ref={emblaRef} className="h-full w-full overflow-hidden">
        <div className="flex h-full">
          {banners.map((banner, idx) => {
            const href = getBannerHref(banner);
            const key = banner.id || `banner-${idx}`;
            const slide = (
              <div className="relative h-full w-full">
                <Image
                  src={banner.cover}
                  alt={banner.title ?? ""}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                {/* Top gradient mask */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: 120,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.54), transparent)",
                  }}
                />
                {/* Bottom gradient mask */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 140,
                    background:
                      "linear-gradient(to top, #0D0C0B 0%, rgba(13,12,11,0.3) 30%, transparent 100%)",
                  }}
                />
                {/* Info bar */}
                {banner.title && (
                  <div className="absolute" style={{ left: 20, bottom: 20 }}>
                    <p
                      className="line-clamp-1"
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        lineHeight: 1,
                      }}
                    >
                      {banner.title}
                    </p>
                    {banner.subtitle && (
                      <p
                        className="mt-2 line-clamp-1"
                        style={{
                          fontSize: 14,
                          color: "#E4D5D1",
                          lineHeight: "20px",
                        }}
                      >
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                )}
                {/* Play icon */}
                {href && (
                  <div className="absolute" style={{ right: 25, bottom: 44 }}>
                    <Image
                      src="/images/play.webp"
                      alt="play"
                      width={46}
                      height={46}
                    />
                  </div>
                )}
              </div>
            );

            return href ? (
              <Link
                key={key}
                href={href}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                {slide}
              </Link>
            ) : (
              <div
                key={key}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>
      {/* Indicators - positioned bottom-right */}
      <div
        className="absolute flex items-center"
        style={{ right: 32, bottom: 24, gap: 2 }}
      >
        {banners.map((_, idx) => (
          <span
            key={idx}
            style={{
              height: 4,
              width: idx === selectedIndex ? 8 : 4,
              borderRadius: 2,
              backgroundColor:
                idx === selectedIndex ? "#F9315C" : "#E4D5D1",
              transition: "width 200ms ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
