"use client";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/common/toast";
import { useUserStore } from "@/stores/use-store";

interface Props {
  movieId: string;
  isFavorited: boolean;
  isSubscribed: boolean;
  isFavoriting: boolean;
  isSubscribing: boolean;
  onToggleFavorite: () => Promise<string | null>;
  onToggleSubscribe: () => Promise<string | null>;
}

export const VideoBottomBar = observer(function VideoBottomBar({
  movieId,
  isFavorited,
  isSubscribed,
  isFavoriting,
  isSubscribing,
  onToggleFavorite,
  onToggleSubscribe,
}: Props) {
  const router = useRouter();
  const userStore = useUserStore();
  const toast = useToast();

  const handleFeedback = () => {
    router.push(`/feedback?movieId=${movieId}`);
  };

  const handleFavorite = async () => {
    if (!userStore.isAuthenticated) {
      userStore.openLoginSheet();
      return;
    }
    const error = await onToggleFavorite();
    if (error) toast.show(error, "error");
  };

  const handleSubscribe = async () => {
    if (!userStore.isAuthenticated) {
      userStore.openLoginSheet();
      return;
    }
    const error = await onToggleSubscribe();
    if (error) toast.show(error, "error");
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center pb-safe"
      style={{ height: 56, background: "#0F0F0F", paddingLeft: 16 }}
    >
      {/* Feedback */}
      <button
        onClick={handleFeedback}
        className="flex flex-col items-center justify-center"
        style={{ height: 56, marginRight: 30 }}
      >
        <Image src="/images/feedback.webp" alt="反馈" width={20} height={20} />
        <span style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.7)", marginTop: 3 }}>
          反馈
        </span>
      </button>

      {/* Favorite */}
      <button
        onClick={handleFavorite}
        disabled={isFavoriting}
        className="flex flex-col items-center justify-center"
        style={{ height: 56, marginRight: 30 }}
      >
        <Image
          src={isFavorited ? "/images/star_fill.webp" : "/images/star.webp"}
          alt="收藏"
          width={20}
          height={20}
        />
        <span
          style={{
            fontSize: 13,
            color: isFavorited ? "#E4D5D1" : "rgba(255, 255, 255, 0.7)",
            marginTop: 3,
          }}
        >
          {isFavorited ? "已收藏" : "收藏"}
        </span>
      </button>

      {/* Subscribe */}
      <button
        onClick={handleSubscribe}
        disabled={isSubscribing}
        className="flex flex-col items-center justify-center"
        style={{ height: 56 }}
      >
        <Image
          src={isSubscribed ? "/images/heart_tick_fill.webp" : "/images/heart_tick.webp"}
          alt="追剧"
          width={20}
          height={20}
        />
        <span
          style={{
            fontSize: 13,
            color: isSubscribed ? "#E4D5D1" : "rgba(255, 255, 255, 0.7)",
            marginTop: 3,
          }}
        >
          {isSubscribed ? "已追剧" : "追剧"}
        </span>
      </button>
    </div>
  );
});
