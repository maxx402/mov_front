"use client";

import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useUserStore } from "@/stores/use-store";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { MyStore } from "@/stores/my-store";
import { OptimizedImage } from "@/components/common/optimized-image";

interface MenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
}

function MenuItemRow({ icon, label, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center"
      style={{ height: 52, padding: "0 14px" }}
    >
      <Image src={icon} alt={label} width={20} height={20} />
      <span
        className="flex-1 text-left"
        style={{ marginLeft: 10, fontSize: 14, color: "#E4D5D1", lineHeight: "16px" }}
      >
        {label}
      </span>
      <ChevronRight size={20} color="#E4D5D1" />
    </button>
  );
}

const MyPage = observer(function MyPage() {
  const router = useRouter();
  const userStore = useUserStore();
  const container = useContainer();
  const myStore = useMemo(() => container.get<MyStore>(DI_KEYS.MyStore), [container]);

  useEffect(() => {
    if (userStore.isAuthenticated) {
      myStore.init();
    }
  }, [myStore, userStore.isAuthenticated]);

  const maskPhone = (phone: string) => {
    if (phone.length >= 11) {
      return `${phone.substring(0, 3)}****${phone.substring(7)}`;
    }
    return phone;
  };

  const getAccountText = () => {
    const user = userStore.currentUser;
    if (!user) return "";
    if (user.phone) return `账号：${maskPhone(user.phone)}`;
    if (user.email) return `账号：${user.email}`;
    return `账号：${user.id}`;
  };

  const handleUserTap = () => {
    if (!userStore.isAuthenticated) {
      userStore.openLoginSheet();
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="relative min-h-screen bg-scaffold">
      {/* Background Image */}
      <div className="absolute top-0 left-0 right-0">
        <Image
          src="/images/ic_my_bg_card.webp"
          alt="background"
          width={375}
          height={238}
          className="w-full object-cover"
          style={{ height: 238 }}
          priority
        />
      </div>

      {/* Scrollable Content */}
      <div className="relative">
        {/* User Info Section */}
        <button
          onClick={handleUserTap}
          className="flex w-full items-center pt-safe"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 34px)", paddingLeft: 14, paddingRight: 14 }}
        >
          {/* Avatar */}
          {userStore.isAuthenticated && userStore.currentUser?.avatar ? (
            <OptimizedImage
              src={userStore.currentUser.avatar}
              alt="avatar"
              width={60}
              height={60}
              rounded="rounded-full"
            />
          ) : (
            <Image
              src="/images/ic_auth_avatar.webp"
              alt="avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
          )}
          <div style={{ marginLeft: 14, flex: 1 }}>
            {/* Name row */}
            <div className="flex items-center">
              <span
                className="truncate font-bold text-text-primary"
                style={{ fontSize: 18, lineHeight: "1.2" }}
              >
                {userStore.isAuthenticated
                  ? userStore.displayName
                  : "登录之后更精彩"}
              </span>
              {userStore.isAuthenticated && (
                <ChevronRight size={18} className="ml-1 shrink-0 text-text-primary" />
              )}
            </div>
            {/* Account info */}
            <p
              className="mt-2 truncate"
              style={{ fontSize: 14, color: "#E4D5D1", lineHeight: "20px" }}
            >
              {userStore.isAuthenticated
                ? getAccountText()
                : "全球资源，所有影视免费看！"}
            </p>
          </div>
          {/* Right arrow for unauthenticated */}
          {!userStore.isAuthenticated && (
            <ChevronRight size={24} className="shrink-0 text-text-primary" />
          )}
        </button>

        {/* Menu Items */}
        <div style={{ marginTop: 16 }}>
          <MenuItemRow
            icon="/images/ic_notification.webp"
            label="我的通知"
            onClick={() => router.push("/notifications")}
          />
          <MenuItemRow
            icon="/images/ic_lovely.webp"
            label="分享好友"
            onClick={() => router.push("/share-friends")}
          />
          <MenuItemRow
            icon="/images/ic_watch_history.webp"
            label="观看历史"
            onClick={() => router.push("/watch-history")}
          />

          {/* Watch History Preview */}
          {myStore.watchHistories && myStore.watchHistories.length > 0 && (
            <div
              className="scrollbar-none flex gap-3 overflow-x-auto"
              style={{ height: 110, marginTop: 10, padding: "0 12px" }}
            >
              {myStore.watchHistories.map((history) => (
                <button
                  key={history.id}
                  onClick={() => router.push(`/movie/${history.movieId}`)}
                  className="shrink-0"
                  style={{ width: 130 }}
                >
                  <OptimizedImage
                    src={history.movieCover ?? ""}
                    alt={history.movieTitle ?? ""}
                    width={130}
                    height={73}
                    rounded="rounded"
                    className="w-full rounded"
                  />
                  <p
                    className="mt-1.5 truncate text-left text-text-secondary"
                    style={{ fontSize: 12 }}
                  >
                    {history.movieTitle}
                  </p>
                </button>
              ))}
            </div>
          )}

          <MenuItemRow
            icon="/images/ic_forever_link.webp"
            label="永久地址"
            onClick={() => {}}
          />
          <MenuItemRow
            icon="/images/ic_collection.webp"
            label="我的收藏"
            onClick={() => router.push("/favorites")}
          />
          <MenuItemRow
            icon="/images/ic_subscribe_movie.webp"
            label="我的追番"
            onClick={() => router.push("/subscriptions")}
          />
          <MenuItemRow
            icon="/images/ic_feedback.webp"
            label="我的反馈"
            onClick={() => router.push("/feedback")}
          />
          <MenuItemRow
            icon="/images/ic_request_movie.webp"
            label="我要求片"
            onClick={() => router.push("/movie-request")}
          />
          <MenuItemRow
            icon="/images/ic_coperation.webp"
            label="商务合作"
            onClick={() => router.push("/business-cooperation")}
          />
          <MenuItemRow
            icon="/images/ic_setting.webp"
            label="应用设置"
            onClick={() => router.push("/settings")}
          />
        </div>

        {/* Bottom spacing */}
        <div style={{ height: 30 }} />
      </div>
    </div>
  );
});

export default MyPage;
