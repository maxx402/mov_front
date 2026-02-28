"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  autoFocus = false,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div
      className={className}
      style={{
        height: 32,
        borderRadius: 18,
        border: "0.5px solid rgba(255, 255, 255, 0.55)",
        background: "rgba(255, 255, 255, 0.05)",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
      }}
    >
      <Image
        src="/svgs/ic_search.svg"
        alt="search"
        width={14}
        height={14}
        style={{ flexShrink: 0 }}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
        placeholder="搜索你想看的影片"
        style={{
          flex: 1,
          marginLeft: 8,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 14,
          color: "#FFFFFF",
          lineHeight: 1,
        }}
      />
      {value && (
        <button
          onClick={onClear ?? (() => onChange(""))}
          style={{ marginLeft: 8, flexShrink: 0 }}
        >
          <X size={16} color="rgba(255, 255, 255, 0.6)" />
        </button>
      )}
    </div>
  );
}
