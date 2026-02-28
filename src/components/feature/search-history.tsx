"use client";

import Image from "next/image";

interface Props {
  items: readonly string[];
  onSelect: (keyword: string) => void;
  onClear: () => void;
}

export function SearchHistory({ items, onSelect, onClear }: Props) {
  if (items.length === 0) return null;

  return (
    <div style={{ padding: "16px 12px 0" }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
          搜索历史
        </span>
        <button onClick={onClear} style={{ padding: 4 }}>
          <Image
            src="/svgs/ic_trash.svg"
            alt="clear"
            width={18}
            height={18}
            style={{ opacity: 0.6 }}
          />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap" style={{ gap: 8 }}>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            style={{
              background: "rgba(26, 26, 26, 0.65)",
              borderRadius: 4,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: "16px",
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
