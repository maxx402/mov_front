"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  selectedIndex: number;
  onSelect: (index: number) => void;
  onSwitchLine?: () => void;
}

const TABS = ["视频", "热议", "简介"];

export function DetailTabBar({ selectedIndex, onSelect, onSwitchLine }: Props) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorLeft, setIndicatorLeft] = useState(0);

  useEffect(() => {
    const tab = tabRefs.current[selectedIndex];
    if (!tab) return;
    const parent = tab.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const center = tabRect.left - parentRect.left + tabRect.width / 2;
    setIndicatorLeft(center - 10);
  }, [selectedIndex]);

  return (
    <div
      className="flex items-center bg-scaffold"
      style={{ height: 50, paddingRight: 12 }}
    >
      {/* Tabs */}
      <div className="relative flex items-center">
        {TABS.map((tab, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={tab}
              ref={(el) => { tabRefs.current[idx] = el; }}
              onClick={() => onSelect(idx)}
              className="flex flex-col items-center justify-center"
              style={{
                width: 42,
                height: 50,
                marginLeft: 4,
                marginRight: 4,
              }}
            >
              <span
                style={{
                  fontSize: isSelected ? 16 : 14,
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "#FFFFFF" : "#E4D5D1",
                  transition: "font-size 200ms, font-weight 200ms",
                }}
              >
                {tab}
              </span>
            </button>
          );
        })}
        {/* Animated indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 5,
            left: indicatorLeft,
            width: 20,
            height: 2,
            borderRadius: 1,
            background: "#FFFFFF",
            transition: "left 250ms cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Switch line button */}
      {onSwitchLine && (
        <button
          onClick={onSwitchLine}
          className="flex items-center justify-center"
          style={{
            width: 182,
            height: 32,
            borderRadius: 16,
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#F53C3D", lineHeight: "16px" }}>
            无法播放、卡顿？
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
            切换线路
          </span>
        </button>
      )}
    </div>
  );
}
