import clsx from "clsx";

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TagPill({
  label,
  active = false,
  onClick,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex shrink-0 items-center justify-center",
        className,
      )}
      style={{
        height: 32,
        padding: "0 15px",
        borderRadius: 16,
        fontSize: 13,
        background: active ? "rgba(245, 60, 61, 0.1)" : "transparent",
        color: active ? "#F53C3D" : "rgba(255, 255, 255, 0.7)",
      }}
    >
      {label}
    </button>
  );
}
