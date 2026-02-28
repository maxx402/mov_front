"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function WithdrawalPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-scaffold">
      {/* AppBar */}
      <div
        className="flex shrink-0 items-center pt-safe"
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.2)" }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center"
          style={{ height: 42, padding: "0 12px" }}
        >
          <ChevronLeft size={20} className="text-text-primary" />
          <span style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", marginLeft: 4 }}>返回</span>
        </button>
        <span className="flex-1 text-center" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>
          真金提现
        </span>
        <div style={{ width: 60 }} />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>提现中心页</span>
      </div>
    </div>
  );
}
