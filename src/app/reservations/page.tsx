"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { IReservationRepository } from "@/domain/repositories/reservation-repository";
import type { Reservation } from "@/domain/entities/reservation";
import { ReservationStatus } from "@/domain/entities/reservation";
import { AuthGuard } from "@/components/common/auth-guard";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";
import { OptimizedImage } from "@/components/common/optimized-image";

function ReservationsContent() {
  const router = useRouter();
  const container = useContainer();
  const reservationRepo = useMemo(
    () => container.get<IReservationRepository>(DI_KEYS.ReservationRepository),
    [container],
  );

  const [selectedTab, setSelectedTab] = useState(0);
  const [upcomingItems, setUpcomingItems] = useState<Reservation[]>([]);
  const [releasedItems, setReleasedItems] = useState<Reservation[]>([]);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true);
  const [isLoadingReleased, setIsLoadingReleased] = useState(false);
  const [releasedLoaded, setReleasedLoaded] = useState(false);

  const loadUpcoming = useCallback(async () => {
    setIsLoadingUpcoming(true);
    const result = await reservationRepo.getReservations({
      status: ReservationStatus.Upcoming,
      page: 1,
      pageSize: 20,
    });
    result.fold(
      () => {},
      (data) => setUpcomingItems([...data.items]),
    );
    setIsLoadingUpcoming(false);
  }, [reservationRepo]);

  const loadReleased = useCallback(async () => {
    setIsLoadingReleased(true);
    const result = await reservationRepo.getReservations({
      status: ReservationStatus.Released,
      page: 1,
      pageSize: 20,
    });
    result.fold(
      () => {},
      (data) => setReleasedItems([...data.items]),
    );
    setIsLoadingReleased(false);
    setReleasedLoaded(true);
  }, [reservationRepo]);

  useEffect(() => {
    loadUpcoming();
  }, [loadUpcoming]);

  // Lazy load released tab on first access
  useEffect(() => {
    if (selectedTab === 1 && !releasedLoaded) {
      loadReleased();
    }
  }, [selectedTab, releasedLoaded, loadReleased]);

  const currentItems = selectedTab === 0 ? upcomingItems : releasedItems;
  const currentLoading = selectedTab === 0 ? isLoadingUpcoming : isLoadingReleased;

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
          我的预约
        </span>
        <div style={{ width: 60 }} />
      </div>

      {/* Tab bar */}
      <div className="flex shrink-0 items-center" style={{ padding: "16px 10px 0" }}>
        {["即将上映", "已经上映"].map((label, i) => {
          const isSelected = selectedTab === i;
          return (
            <button
              key={label}
              onClick={() => setSelectedTab(i)}
              className="flex items-center justify-center"
              style={{
                width: 96,
                height: 32,
                borderRadius: 16,
                background: isSelected ? "rgba(255,255,255,0.12)" : "transparent",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {currentLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : currentItems.length === 0 ? (
        <EmptyState text="暂无预约记录" />
      ) : (
        <div className="flex-1 overflow-y-auto" style={{ padding: "16px 10.5px" }}>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px 9px",
            }}
          >
            {currentItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(`/movie/${item.movieId}`)}
                className="flex flex-col"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ width: "100%", aspectRatio: "112/151", borderRadius: 5 }}
                >
                  <OptimizedImage
                    src={item.movieCover}
                    alt={item.movieTitle}
                    width={112}
                    height={151}
                    rounded="rounded-[5px]"
                  />
                </div>
                <span
                  className="mt-1.5 line-clamp-1 w-full text-left"
                  style={{ fontSize: 12, color: "#FFFFFF" }}
                >
                  {item.movieTitle}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReservationsPage() {
  return (
    <AuthGuard>
      <ReservationsContent />
    </AuthGuard>
  );
}
