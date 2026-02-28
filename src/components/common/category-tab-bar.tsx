"use client";

import { useRef, useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  items: readonly { id: string; name: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function CategoryTabBar({
  items,
  selectedIndex,
  onSelect,
  className,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const tab = tabRefs.current[selectedIndex];
    const container = scrollRef.current;
    if (!tab || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const left = tabRect.left - containerRect.left + container.scrollLeft;
    const width = tabRect.width;

    setIndicatorStyle({
      left,
      width,
      transition: "left 250ms cubic-bezier(0.33, 1, 0.68, 1), width 250ms cubic-bezier(0.33, 1, 0.68, 1)",
    });

    // Scroll tab into view
    const tabCenter = tabRect.left + tabRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const scrollOffset = tabCenter - containerCenter;
    container.scrollBy({ left: scrollOffset, behavior: "smooth" });
  }, [selectedIndex, items]);

  return (
    <div className={clsx("relative", className)} style={{ height: 27 }}>
      <div
        ref={scrollRef}
        className="scrollbar-none flex items-start overflow-x-auto"
        style={{ paddingLeft: 16, paddingRight: 16, gap: 22, height: 27 }}
      >
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              onClick={() => onSelect(index)}
              className="shrink-0 whitespace-nowrap"
              style={{
                fontSize: isSelected ? 15 : 14,
                fontWeight: isSelected ? 700 : 400,
                color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.85)",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
                lineHeight: "1",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      {/* Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 3,
          height: 2,
          borderRadius: 1,
          background: "#FFFFFF",
          ...indicatorStyle,
        }}
      />
    </div>
  );
}
