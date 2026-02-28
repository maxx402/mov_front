import clsx from "clsx";

interface Props {
  text?: string;
  className?: string;
  size?: number;
}

export function LoadingSpinner({
  text,
  className,
  size = 24,
}: Props) {
  return (
    <div className={clsx("flex flex-col items-center justify-center gap-2 py-8", className)}>
      <div
        className="flex items-center justify-center"
        style={{
          width: size + 24,
          height: size + 24,
          background: "#232323",
          borderRadius: 6,
        }}
      >
        <div
          className="animate-spin"
          style={{
            width: size,
            height: size,
            border: "3px solid transparent",
            borderTopColor: "#ADADAD",
            borderRadius: "50%",
          }}
        />
      </div>
      {text && <span className="text-sm text-text-tertiary">{text}</span>}
    </div>
  );
}
