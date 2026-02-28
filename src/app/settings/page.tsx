"use client";

import { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useUserStore, useAppConfigStore } from "@/stores/use-store";
import { Modal } from "@/components/common/modal";

const SettingsPage = observer(function SettingsPage() {
  const router = useRouter();
  const userStore = useUserStore();
  const appConfigStore = useAppConfigStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    appConfigStore.loadAppConfig();
  }, [appConfigStore]);

  const handleLogout = useCallback(async () => {
    setShowLogoutModal(false);
    await userStore.logout();
    router.back();
  }, [userStore, router]);

  return (
    <div className="min-h-screen bg-scaffold">
      {/* AppBar */}
      <header
        className="sticky top-0 z-40 flex items-center bg-scaffold"
        style={{
          height: 42,
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Left: Back button */}
        <button
          onClick={() => router.back()}
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
        {/* Center: Title */}
        <span
          className="absolute left-1/2 -translate-x-1/2 text-text-primary"
          style={{ fontSize: 15, fontWeight: 500 }}
        >
          设置
        </span>
      </header>

      {/* Content */}
      <div className="flex flex-col items-center">
        {/* App Icon */}
        <div style={{ marginTop: 20 }}>
          <Image
            src="/images/logo.webp"
            alt="Logo"
            width={72}
            height={72}
            style={{ borderRadius: 16 }}
          />
        </div>
        {/* Version */}
        <p
          style={{
            marginTop: 10,
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.5)",
            lineHeight: "20px",
          }}
        >
          当前版本：V1.0
        </p>

        {/* Info Section */}
        <div style={{ marginTop: 49, width: "100%", padding: "0 16px" }}>
          {/* Official Email */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "15px 0" }}
          >
            <span style={{ fontSize: 14, color: "#FFFFFF" }}>官方邮箱</span>
            <span style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.6)" }}>
              {appConfigStore.appConfig?.customerService ?? "-"}
            </span>
          </div>
          {/* Divider */}
          <div style={{ height: 0.5, background: "rgba(255, 255, 255, 0.1)" }} />
          {/* Official Website */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "15px 0" }}
          >
            <span style={{ fontSize: 14, color: "#FFFFFF" }}>官方网站</span>
            <span style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.6)" }}>
              {appConfigStore.appConfig?.website ?? "-"}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="mx-auto"
          style={{
            marginTop: 32,
            width: 349,
            maxWidth: "calc(100% - 32px)",
            height: 48,
            background: "#252321",
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 500,
            color: "#E4D5D1",
          }}
        >
          退出登录
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal open={showLogoutModal} onClose={() => setShowLogoutModal(false)} showClose={false}>
        <div className="flex flex-col items-center" style={{ padding: 0 }}>
          <h3
            className="text-text-primary"
            style={{ fontSize: 16, fontWeight: 700 }}
          >
            退出登录
          </h3>
          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            确定要退出当前账号吗？
          </p>
          <div className="mt-5 flex w-full">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1"
              style={{
                height: 40,
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              取消
            </button>
            <button
              onClick={handleLogout}
              className="flex-1"
              style={{ height: 40, fontSize: 14, color: "#F64E36" }}
            >
              确定
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default SettingsPage;
