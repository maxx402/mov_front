"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import { AuthGuard } from "@/components/common/auth-guard";

function BindInvitationCodeContent() {
  const router = useRouter();
  const container = useContainer();
  const authRepo = useMemo(
    () => container.get<IAuthRepository>(DI_KEYS.AuthRepository),
    [container],
  );

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 20;

  const handleSubmit = async () => {
    if (!code.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const result = await authRepo.bindInvitationCode(code.trim());
    result.fold(
      () => {
        setIsSubmitting(false);
      },
      (data) => {
        if (data.success) {
          router.back();
        } else {
          setIsSubmitting(false);
        }
      },
    );
  };

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
          绑定邀请码
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "20px 16px" }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF" }}>输入邀请码</span>

        <div className="mt-3">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setCode(e.target.value);
              }
            }}
            placeholder="请输入邀请码"
            style={{
              width: "100%",
              height: 50,
              padding: "0 12px",
              borderRadius: 5,
              background: "rgba(26,26,26,0.65)",
              border: "0.5px solid rgba(255,255,255,0.5)",
              fontSize: 14,
              color: "#FFFFFF",
              lineHeight: "20px",
              outline: "none",
            }}
          />
        </div>

        {/* Hint */}
        <p className="mt-3" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: "17px" }}>
          说明：每个账号只能绑定一次邀请码，绑定后无法修改。
        </p>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !code.trim()}
          className="mt-8 flex w-full items-center justify-center"
          style={{
            height: 46,
            borderRadius: 23,
            background: code.trim()
              ? "linear-gradient(135deg, #FFE5B4, #FFC65C)"
              : "rgba(255,255,255,0.1)",
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: code.trim() ? "#1A1A1A" : "rgba(255,255,255,0.3)",
            }}
          >
            {isSubmitting ? "绑定中..." : "绑定"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function BindInvitationCodePage() {
  return (
    <AuthGuard>
      <BindInvitationCodeContent />
    </AuthGuard>
  );
}
