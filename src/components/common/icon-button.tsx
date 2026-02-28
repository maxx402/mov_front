"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  onClick?: () => void;
  size?: number;
  className?: string;
  label?: string;
  badge?: string | number;
}

export function IconButton({
  icon: Icon,
  onClick,
  size = 24,
  className,
  label,
  badge,
}: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={clsx("relative inline-flex items-center justify-center p-2", className)}
      aria-label={label}
    >
      <Icon size={size} />
      {badge !== undefined && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-medium text-white">
          {badge}
        </span>
      )}
    </motion.button>
  );
}
