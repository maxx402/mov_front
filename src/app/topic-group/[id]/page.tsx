"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useContainer } from "@/core/di/provider";
import { DI_KEYS } from "@/core/di/keys";
import type { ITopicRepository } from "@/domain/repositories/topic-repository";
import type { Topic } from "@/domain/entities/topic";
import { OptimizedImage } from "@/components/common/optimized-image";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { EmptyState } from "@/components/common/empty-state";

interface Props {
  params: Promise<{ id: string }>;
}

export default function TopicGroupDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const container = useContainer();
  const topicRepo = useMemo(() => container.get<ITopicRepository>(DI_KEYS.TopicRepository), [container]);

  const groupName = searchParams.get("name") ?? "";

  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const result = await topicRepo.getTopics({ groupId: id });
      result.fold(
        () => {},
        (data) => setTopics(data.items.slice()),
      );
      setIsLoading(false);
    };
    load();
  }, [topicRepo, id]);

  const handleTopicTap = (topic: Topic) => {
    const params = new URLSearchParams();
    if (topic.name) params.set("name", topic.name);
    if (topic.cover) params.set("cover", topic.cover);
    if (groupName) params.set("groupName", groupName);
    router.push(`/topic/${topic.id}?${params.toString()}`);
  };

  return (
    <div className="flex h-screen flex-col bg-scaffold">
      {/* AppBar */}
      <div
        className="flex shrink-0 items-center justify-between pt-safe"
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
        {groupName && (
          <span className="truncate" style={{ fontSize: 15, fontWeight: 500, color: "#FFFFFF", flex: 1, textAlign: "center" }}>
            {groupName}
          </span>
        )}
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner text="加载中..." />
      ) : topics.length === 0 ? (
        <EmptyState text="暂无专题" />
      ) : (
        <div className="flex-1 overflow-y-auto" style={{ padding: "17px 10px 26px" }}>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicTap(topic)}
                className="relative overflow-hidden"
                style={{ width: "100%", height: 220, borderRadius: 5 }}
              >
                <OptimizedImage
                  src={topic.cover ?? ""}
                  alt={topic.name}
                  width={355}
                  height={220}
                  rounded="rounded-[5px]"
                  fill
                  sizes="100vw"
                />
                {/* Bottom gradient */}
                <div
                  className="absolute inset-x-0 bottom-0"
                  style={{
                    height: 80,
                    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))",
                  }}
                />
                {/* Info (bottom-left) */}
                <div className="absolute bottom-3 left-3 flex flex-col items-start">
                  <span style={{
                    fontSize: 16, fontWeight: 700, color: "#FFFFFF",
                    textShadow: "0 0 4px rgba(0,0,0,0.5)",
                  }}>
                    {topic.name}
                  </span>
                  <span className="mt-1" style={{
                    fontSize: 12, color: "rgba(255,255,255,0.8)",
                    textShadow: "0 0 4px rgba(0,0,0,0.5)",
                  }}>
                    共{topic.movieCount}部
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
