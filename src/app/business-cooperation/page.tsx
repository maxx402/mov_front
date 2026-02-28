"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useAppConfigStore } from "@/stores/use-store";

const BusinessCooperationContent = observer(function BusinessCooperationContent() {
  const router = useRouter();
  const appConfigStore = useAppConfigStore();
  const config = appConfigStore.appConfig;

  useEffect(() => {
    if (!config) {
      appConfigStore.loadAppConfig();
    }
  }, [config, appConfigStore]);

  const handleContact = () => {
    const link = config?.officialBizTelegramLink;
    if (link) {
      window.open(link, "_blank");
    }
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
          商务合作
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center" style={{ padding: "0 40px" }}>
        {/* Telegram info */}
        {config?.officialBizTelegram && (
          <span style={{ fontSize: 14, fontWeight: 500, color: "#FFE5B4", marginBottom: 24 }}>
            {config.officialBizTelegram}
          </span>
        )}

        {/* Contact button */}
        <button
          onClick={handleContact}
          className="flex items-center"
          style={{
            height: 32,
            padding: "0 16px",
            borderRadius: 16,
            border: "1px solid #363636",
            background: "rgba(38,33,34,0.53)",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 500, color: "#FFFFFF" }}>
            快来找我，聊一聊吧
          </span>
        </button>
      </div>
    </div>
  );
});

export default function BusinessCooperationPage() {
  return <BusinessCooperationContent />;
}
