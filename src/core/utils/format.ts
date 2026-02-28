export function formatViewCount(count: number): string {
  if (count >= 100_000_000) {
    const value = count / 100_000_000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}亿`;
  }
  if (count >= 10_000) {
    const value = count / 10_000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}万`;
  }
  return count.toString();
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function formatProgress(position: number, duration: number): string {
  return `${formatDuration(position)} / ${formatDuration(duration)}`;
}
