"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import type { InvitationRecord } from "@/domain/entities/invitation-record";
import { AuthGuard } from "@/components/common/auth-guard";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";

function InvitationRecordsContent() {
  const router = useRouter();
  const container = useContainer();
  const authRepo = useMemo(
    () => container.get<IAuthRepository>(DI_KEYS.AuthRepository),
    [container],
  );

  const [records, setRecords] = useState<InvitationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadRecords = async () => {
    setIsLoading(true);
    setHasError(false);
    const result = await authRepo.getMyInvitationRecords({ first: 50 });
    result.fold(
      () => setHasError(true),
      (data) => setRecords(data),
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDateTime = (dateStr: string): string => {
    const d = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
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
        <span className="flex-1 text-center" style={{ fontSize: 15, fontWeight: 500, color: "#FFE5B4" }}>
          邀请记录
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : hasError ? (
        <div className="flex flex-1 flex-col items-center justify-center" style={{ gap: 12 }}>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>加载失败</span>
          <button
            onClick={loadRecords}
            style={{
              padding: "8px 24px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              fontSize: 13,
              color: "#FFE5B4",
            }}
          >
            重试
          </button>
        </div>
      ) : records.length === 0 ? (
        <EmptyState text="暂无邀请记录" />
      ) : (
        <div className="flex-1 overflow-y-auto" style={{ paddingTop: 26 }}>
          {records.map((record, i) => (
            <div
              key={record.id}
              style={{
                padding: "0 14px",
                marginBottom: i < records.length - 1 ? 16 : 0,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, color: "#FFE5B4", lineHeight: "22px" }}>
                成功邀请
              </span>
              <p className="mt-1" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: "20px" }}>
                恭喜您邀请1人登陆成功
              </p>
              <span className="mt-1 block" style={{ fontSize: 13, color: "#979797" }}>
                {formatDateTime(record.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InvitationRecordsPage() {
  return (
    <AuthGuard>
      <InvitationRecordsContent />
    </AuthGuard>
  );
}
