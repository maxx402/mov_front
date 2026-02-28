"use client";

import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { ChevronLeft } from "lucide-react";
import { useUserStore } from "@/stores/use-store";
import { AuthGuard } from "@/components/common/auth-guard";
import { OptimizedImage } from "@/components/common/optimized-image";

const ProfileContent = observer(function ProfileContent() {
  const router = useRouter();
  const userStore = useUserStore();
  const user = userStore.currentUser;

  const maskedPhone = user?.phone
    ? user.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
    : "";

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
          个人信息
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "20px 16px" }}>
        {/* Gradient profile card */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 16,
            background: "linear-gradient(135deg, #FFE5B4, #FFC65C)",
            padding: "24px 20px",
          }}
        >
          <div className="flex items-center" style={{ gap: 16 }}>
            {/* Avatar */}
            <div
              className="shrink-0 overflow-hidden"
              style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(0,0,0,0.1)" }}
            >
              {user?.avatar ? (
                <OptimizedImage
                  src={user.avatar}
                  alt={userStore.displayName}
                  width={58}
                  height={58}
                  rounded="rounded-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span style={{ fontSize: 24, color: "rgba(0,0,0,0.3)" }}>
                    {userStore.displayName[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Name & phone */}
            <div className="flex min-w-0 flex-1 flex-col">
              <span style={{ fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}>
                {userStore.displayName}
              </span>
              {maskedPhone && (
                <span className="mt-1" style={{ fontSize: 14, color: "rgba(26,26,26,0.6)" }}>
                  {maskedPhone}
                </span>
              )}
            </div>
          </div>

          {/* Bottom glass blur effect with ID */}
          <div
            className="mt-4 flex items-center justify-between"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ fontSize: 12, color: "rgba(26,26,26,0.7)" }}>
              ID: {user?.id ?? ""}
            </span>
          </div>
        </div>

        {/* Menu items */}
        <div className="mt-6 flex flex-col" style={{ gap: 1 }}>
          <button
            onClick={() => router.push("/bind-invitation-code")}
            className="flex w-full items-center justify-between"
            style={{
              padding: "14px 0",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ fontSize: 15, color: "#FFFFFF" }}>绑定邀请码</span>
            <ChevronLeft size={16} color="rgba(255,255,255,0.3)" style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
