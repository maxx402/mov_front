"use client";

interface Props {
  readonly selectedCount: number;
  readonly totalCount: number;
  readonly isAllSelected: boolean;
  readonly onSelectAll: () => void;
  readonly onDelete: () => void;
  readonly isDeleting?: boolean;
}

export function EditModeActionBar({
  selectedCount,
  totalCount,
  isAllSelected,
  onSelectAll,
  onDelete,
  isDeleting = false,
}: Props) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        height: 56,
        paddingLeft: 16,
        paddingRight: 16,
        background: "#1A1A1A",
        borderTop: "0.5px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Select all */}
      <button
        onClick={onSelectAll}
        className="flex items-center"
        style={{ gap: 8 }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: isAllSelected ? "none" : "1.5px solid rgba(255,255,255,0.8)",
            background: isAllSelected ? "#FFE5B4" : "transparent",
          }}
        />
        <span style={{ fontSize: 14, color: "#FFFFFF" }}>
          全选
        </span>
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        disabled={selectedCount === 0 || isDeleting}
        className="flex items-center justify-center"
        style={{
          height: 36,
          paddingLeft: 24,
          paddingRight: 24,
          borderRadius: 18,
          background: selectedCount > 0 ? "#F84048" : "rgba(255,255,255,0.1)",
          opacity: isDeleting ? 0.5 : 1,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
          {isDeleting ? "删除中..." : `删除${selectedCount > 0 ? `(${selectedCount})` : ""}`}
        </span>
      </button>
    </div>
  );
}
