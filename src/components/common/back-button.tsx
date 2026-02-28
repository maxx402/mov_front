"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  className?: string;
  onBack?: () => void;
}

export function BackButton({ className, onBack }: Props) {
  const router = useRouter();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => (onBack ? onBack() : router.back())}
      className={clsx("inline-flex items-center justify-center p-2", className)}
      aria-label="Go back"
    >
      <ChevronLeft size={24} className="text-text-primary" />
    </motion.button>
  );
}
