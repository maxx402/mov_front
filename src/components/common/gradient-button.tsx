"use client";

import { useState } from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export function GradientButton({
  children,
  onClick,
  disabled = false,
  className,
  type = "button",
}: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={clsx("relative overflow-hidden rounded-full", disabled && "opacity-50", className)}
      style={{
        padding: 1,
        background: "linear-gradient(135deg, rgba(254, 172, 166, 0.88), rgba(255, 183, 183, 0.86))",
      }}
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        className="w-full rounded-full px-6 py-3 text-sm font-medium text-white"
        style={{
          background: "linear-gradient(135deg, #F9315C, #F64E36)",
          transform: pressed ? "scale(0.9)" : "scale(1)",
          transition: "transform 300ms cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        {children}
      </button>
    </div>
  );
}
