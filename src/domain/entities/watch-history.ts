export interface WatchHistory {
  readonly id: string;
  readonly movieId: string;
  readonly movieTitle: string;
  readonly movieCover: string;
  readonly episodeNumber: number;
  readonly progress: number;
  readonly duration: number;
  readonly watchedAt: string;
  readonly movieStatus: number;
  readonly movieCurrentEpisode: number;
  readonly movieTotalEpisodes: number;
}

export function getWatchHistoryProgressPercent(history: WatchHistory): number {
  return history.duration > 0 ? history.progress / history.duration : 0;
}

export function getWatchHistoryProgressText(history: WatchHistory): string {
  const min = Math.floor(history.progress / 60);
  const sec = history.progress % 60;
  return `第${history.episodeNumber}集 ${min}:${sec.toString().padStart(2, "0")}`;
}

export function getWatchProgressDisplayText(history: WatchHistory): string {
  const percent = Math.round(getWatchHistoryProgressPercent(history) * 100);
  const percentText = percent < 1 ? "不足1%" : `${percent}%`;
  return `第${history.episodeNumber}集·观看至${percentText}`;
}

export function getWatchHistoryMovieStatusText(history: WatchHistory): string {
  switch (history.movieStatus) {
    case 0:
      return "预告";
    case 1:
      if (history.movieCurrentEpisode > 0) {
        return `更新至${history.movieCurrentEpisode}集`;
      }
      return "更新中";
    case 2:
      if (history.movieTotalEpisodes > 0) {
        return `全${history.movieTotalEpisodes}集`;
      }
      return "已完结";
    default:
      return "";
  }
}

export function getWatchedAtText(history: WatchHistory): string {
  const now = new Date();
  const watchedAt = new Date(history.watchedAt);
  const diffMs = now.getTime() - watchedAt.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "刚刚";
  if (diffMinutes < 60) return `${diffMinutes}分钟前`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}小时前`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}天前`;

  const month = (watchedAt.getMonth() + 1).toString().padStart(2, "0");
  const day = watchedAt.getDate().toString().padStart(2, "0");
  const hour = watchedAt.getHours().toString().padStart(2, "0");
  const minute = watchedAt.getMinutes().toString().padStart(2, "0");
  return `${month}-${day} ${hour}:${minute}`;
}
