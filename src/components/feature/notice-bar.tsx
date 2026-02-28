"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

interface Props {
  texts: readonly string[];
  className?: string;
}

export function NoticeBar({ texts, className }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [animStyle, setAnimStyle] = useState<React.CSSProperties>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentText = texts.length > 0 ? texts[currentIndex] : "";

  const startAnimation = useCallback(() => {
    if (!containerRef.current || !textRef.current || texts.length === 0) return;
    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    const needsScroll = textWidth > containerWidth;

    if (needsScroll) {
      const totalDistance = containerWidth + textWidth;
      const durationMs = (totalDistance / 50) * 1000;
      setAnimStyle({
        transform: `translateX(${containerWidth}px)`,
        transition: "none",
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimStyle({
            transform: `translateX(-${textWidth}px)`,
            transition: `transform ${durationMs}ms linear`,
          });
          timerRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }, durationMs);
        });
      });
    } else {
      setAnimStyle({ transform: "translateX(0)" });
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, 3000);
    }
  }, [texts]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, startAnimation]);

  if (texts.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        height: 28,
        margin: "0 12px",
        borderRadius: 14,
        border: "0.5px solid rgba(255, 255, 255, 0.15)",
        background: "rgba(37, 35, 33, 0.87)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ width: 10, flexShrink: 0 }} />
      <Image
        src="/images/notification.webp"
        alt="notice"
        width={16}
        height={16}
        style={{ flexShrink: 0 }}
      />
      <span
        style={{
          padding: "0 4px",
          fontSize: 14,
          color: "rgba(255, 255, 255, 0.5)",
          flexShrink: 0,
        }}
      >
        ·
      </span>
      <div
        ref={containerRef}
        style={{ flex: 1, overflow: "hidden", position: "relative", height: "100%", display: "flex", alignItems: "center" }}
      >
        <span
          ref={textRef}
          style={{
            fontSize: 14,
            lineHeight: 1,
            color: "rgba(255, 255, 255, 0.5)",
            whiteSpace: "nowrap",
            ...animStyle,
          }}
        >
          {currentText}
        </span>
      </div>
      <div style={{ width: 10, flexShrink: 0 }} />
    </div>
  );
}
