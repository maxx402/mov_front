"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export function ThrottleButton({
  children,
  onClick,
  delay = 300,
  className,
  disabled = false,
}: Props) {
  const lastClick = useRef(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClick.current < delay) return;
    lastClick.current = now;
    onClick?.();
  }, [onClick, delay]);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
