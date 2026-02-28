"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import { useAppConfigStore } from "@/stores/use-store";
import { AuthGuard } from "@/components/common/auth-guard";
import { LoadingSpinner } from "@/components/common/loading-spinner";

const ShareFriendsContent = observer(function ShareFriendsContent() {
  const router = useRouter();
  const container = useContainer();
  const authRepo = useMemo(
    () => container.get<IAuthRepository>(DI_KEYS.AuthRepository),
    [container],
  );
  const appConfigStore = useAppConfigStore();

  const [invitationCode, setInvitationCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await authRepo.getMyInvitationCode();
      result.fold(
        () => {},
        (code) => setInvitationCode(code),
      );
      setIsLoading(false);
    };
    load();
  }, [authRepo]);

  const handleCopyLink = () => {
    const link = appConfigStore.appConfig?.website ?? appConfigStore.appConfig?.shareLink ?? "";
    if (link) {
      navigator.clipboard.writeText(link);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col bg-scaffold">
        <LoadingSpinner text="加载中..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col" style={{ background: "#0D0C0B" }}>
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
          分享好友
        </span>
        <button
          onClick={() => router.push("/invitation-records")}
          style={{ height: 42, padding: "0 14px", fontSize: 14, color: "#FFE5B4" }}
        >
          邀请记录
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center overflow-y-auto" style={{ padding: "40px 26px" }}>
        {/* Share card */}
        <div
          className="flex w-full flex-col items-center"
          style={{
            padding: "32px 24px",
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(255,229,180,0.1), rgba(255,198,92,0.05))",
            border: "0.5px solid rgba(255,229,180,0.2)",
          }}
        >
          {/* Logo */}
          <img
            src="/images/logo.webp"
            alt="Logo"
            style={{ width: 60, height: 60, borderRadius: 12 }}
          />
          <span className="mt-3" style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF" }}>
            {appConfigStore.appConfig?.appName ?? "影视APP"}
          </span>
          <span className="mt-1" style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
            海量影视 免费观看
          </span>

          {/* Divider */}
          <div
            className="my-6 w-full"
            style={{ height: 0.5, background: "rgba(255,255,255,0.1)" }}
          />

          {/* Invitation code */}
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>我的邀请码</span>
          <span className="mt-2" style={{ fontSize: 16, fontWeight: 600, color: "#FFE5B4" }}>
            {invitationCode || "---"}
          </span>
        </div>

        {/* Bottom buttons */}
        <div className="mt-8 flex w-full" style={{ gap: 12 }}>
          <button
            className="flex flex-1 items-center justify-center"
            style={{
              height: 44,
              borderRadius: 22,
              border: "1px solid rgba(255,229,180,0.4)",
              background: "transparent",
              fontSize: 16,
              fontWeight: 500,
              color: "#FFE5B4",
            }}
          >
            保存图片
          </button>
          <button
            onClick={handleCopyLink}
            className="flex flex-1 items-center justify-center"
            style={{
              height: 44,
              borderRadius: 22,
              border: "1px solid rgba(255,229,180,0.4)",
              background: "transparent",
              fontSize: 16,
              fontWeight: 500,
              color: "#FFE5B4",
            }}
          >
            分享链接
          </button>
        </div>
      </div>
    </div>
  );
});

export default function ShareFriendsPage() {
  return (
    <AuthGuard>
      <ShareFriendsContent />
    </AuthGuard>
  );
}
