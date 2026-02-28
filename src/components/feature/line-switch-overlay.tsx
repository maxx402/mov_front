"use client";

import { useMemo } from "react";
import Image from "next/image";
import type { Episode, PlayLine } from "@/domain/entities/episode";
import { getEpisodeDisplayTitle } from "@/domain/entities/episode";

interface Props {
  readonly visible: boolean;
  readonly episodes: readonly Episode[];
  readonly currentEpisodeIndex: number;
  readonly currentLineIndex: number;
  readonly lines: readonly PlayLine[];
  readonly isAscending: boolean;
  readonly isOngoing: boolean;
  readonly onEpisodeSelect: (index: number) => void;
  readonly onLineSelect: (index: number) => void;
  readonly onSortToggle: () => void;
  readonly onClose: () => void;
}

export function LineSwitchOverlay({
  visible,
  episodes,
  currentEpisodeIndex,
  currentLineIndex,
  lines,
  isAscending,
  isOngoing,
  onEpisodeSelect,
  onLineSelect,
  onSortToggle,
  onClose,
}: Props) {
  const count = episodes.length > 0 ? episodes.length : 12;
  const statusText = isOngoing ? `更第${count}集` : "已完结";

  const displayList = useMemo(() => {
    return isAscending
      ? Array.from({ length: count }, (_, i) => i)
      : Array.from({ length: count }, (_, i) => count - 1 - i);
  }, [count, isAscending]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        overflow: "hidden",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: visible ? "rgba(0, 0, 0, 0.4)" : "transparent",
          transition: "background 300ms ease-out",
        }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#1A1A1A",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms ease-out",
          maxHeight: "70%",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ height: 17 }} />
        <div
          className="flex items-center"
          style={{ paddingLeft: 12, paddingRight: 12 }}
        >
          {/* Title */}
          <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
            选集
          </span>
          {/* Sort button */}
          <button
            className="flex items-center"
            onClick={onSortToggle}
            style={{ marginLeft: 12, gap: 4 }}
          >
            <Image
              src={isAscending ? "/images/ic_sort_down.webp" : "/images/ic_sort_up.webp"}
              alt=""
              width={16}
              height={16}
            />
            <span style={{ fontSize: 12, color: "#FFE5B4", lineHeight: "16px" }}>
              {isAscending ? "正序" : "倒序"}
            </span>
          </button>
          {/* Tip tag */}
          <div
            className="flex items-center justify-center"
            style={{
              width: 186,
              height: 26,
              marginLeft: 15,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255, 255, 255, 0.5)", lineHeight: "16px" }}>
              如遇卡顿或无法播放请切换资源或反馈
            </span>
          </div>
          <div className="flex-1" />
          {/* Close button */}
          <button onClick={onClose}>
            <Image src="/images/ov_close_btn.webp" alt="close" width={30} height={30} />
          </button>
        </div>

        {/* Line selector */}
        {lines.length > 0 && (
          <>
            <div style={{ height: 16 }} />
            <div
              className="flex overflow-x-auto"
              style={{ height: 56, paddingLeft: 12, gap: 8 }}
            >
              {lines.map((line, idx) => {
                const isSelected = idx === currentLineIndex;
                return (
                  <button
                    key={line.id}
                    onClick={() => onLineSelect(idx)}
                    className="relative shrink-0 flex flex-col justify-center"
                    style={{
                      paddingLeft: 10,
                      paddingRight: 31,
                      paddingTop: 8,
                      paddingBottom: 8,
                      borderRadius: isSelected ? 0 : 4,
                      background: isSelected ? undefined : "rgba(255, 255, 255, 0.08)",
                      backgroundImage: isSelected ? "url(/images/ic_episode_btn.webp)" : undefined,
                      backgroundSize: isSelected ? "100% 100%" : undefined,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
                      {line.name}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255, 255, 255, 0.6)", lineHeight: "16px", marginTop: 2 }}>
                      极速高清
                    </span>
                    {isSelected && (
                      <Image
                        src="/images/ic_tick_fill.webp"
                        alt=""
                        width={16}
                        height={16}
                        style={{ position: "absolute", top: 8, right: 8 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Episode section */}
        <div style={{ marginTop: 16, paddingLeft: 12, paddingRight: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
            {statusText}
          </span>
          <div style={{ height: 12 }} />
          {/* 4-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
            }}
          >
            {displayList.map((episodeIndex) => {
              const isSelected = episodeIndex === currentEpisodeIndex;
              const title = episodes.length > 0
                ? getEpisodeDisplayTitle(episodes[episodeIndex])
                : `第${episodeIndex + 1}集`;

              return (
                <button
                  key={episodeIndex}
                  onClick={() => {
                    onEpisodeSelect(episodeIndex);
                    onClose();
                  }}
                  className="flex items-center justify-center"
                  style={{
                    height: 32,
                    borderRadius: isSelected ? 0 : 4,
                    background: isSelected ? undefined : "rgba(255, 255, 255, 0.08)",
                    backgroundImage: isSelected ? "url(/images/ic_episode_btn.webp)" : undefined,
                    backgroundSize: isSelected ? "100% 100%" : undefined,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)",
                      lineHeight: "16px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {/* Bottom safe area */}
        <div style={{ height: 32 }} />
      </div>
    </div>
  );
}
