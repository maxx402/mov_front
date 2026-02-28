import Image from "next/image";
import clsx from "clsx";

interface Props {
  text?: string;
  className?: string;
}

export function EmptyState({
  text = "暂无数据",
  className,
}: Props) {
  return (
    <div className={clsx("flex flex-col items-center justify-center gap-3 py-16", className)}>
      <Image
        src="/images/ic_status_empty.webp"
        alt="empty"
        width={80}
        height={80}
        style={{ opacity: 0.6 }}
      />
      <span className="text-sm text-text-tertiary">{text}</span>
    </div>
  );
}
