"use client";

interface Props {
  keywords: readonly string[];
  onSelect: (keyword: string) => void;
}

export function HotKeywords({ keywords, onSelect }: Props) {
  if (keywords.length === 0) return null;

  return (
    <div style={{ padding: "0 12px" }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", lineHeight: "16px" }}>
        热门搜索🔥
      </span>
      <div className="mt-3 flex flex-wrap" style={{ gap: 8 }}>
        {keywords.map((keyword, index) => {
          const isHot = index < 2;
          return (
            <button
              key={keyword}
              onClick={() => onSelect(keyword)}
              className="flex items-center"
              style={{
                background: isHot ? "rgba(245, 60, 61, 0.1)" : "rgba(26, 26, 26, 0.65)",
                borderRadius: 4,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 500,
                color: isHot ? "#F53C3D" : "rgba(255, 255, 255, 0.8)",
                lineHeight: "16px",
              }}
            >
              {keyword}
              {isHot && (
                <span
                  className="ml-1.5 flex items-center justify-center"
                  style={{
                    width: 14,
                    height: 16,
                    background: "#F53C3D",
                    borderRadius: 2,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1,
                  }}
                >
                  热
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
