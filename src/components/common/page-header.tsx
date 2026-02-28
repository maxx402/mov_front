"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

export function PageHeader({
  title,
  showBack = true,
  onBack,
  right,
  className,
  transparent = false,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 flex items-center",
        transparent ? "bg-transparent" : "bg-scaffold",
        className,
      )}
      style={{
        height: 42,
        borderBottom: transparent ? "none" : "0.5px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* Left */}
      <div style={{ width: 80 }}>
        {showBack && (
          <button
            onClick={handleBack}
            className="flex items-center"
            style={{ height: 42, padding: "0 12px" }}
          >
            <ChevronLeft size={20} className="text-text-primary" />
            <span
              className="text-text-primary"
              style={{ fontSize: 15, fontWeight: 500, marginLeft: 4 }}
            >
              返回
            </span>
          </button>
        )}
      </div>
      {/* Center */}
      {title && (
        <span
          className="absolute left-1/2 -translate-x-1/2 text-text-primary"
          style={{ fontSize: 15, fontWeight: 500 }}
        >
          {title}
        </span>
      )}
      {/* Right */}
      <div className="ml-auto flex items-center" style={{ width: 80, justifyContent: "flex-end" }}>
        {right}
      </div>
    </header>
  );
}
