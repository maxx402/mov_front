import type { PaginatorInfo, PaginatedList } from "@/domain/entities/paginator";

export function mapPaginatorInfo(data: {
  currentPage?: number;
  lastPage?: number;
  hasMorePages?: boolean;
  total?: number;
}): PaginatorInfo {
  return {
    currentPage: data.currentPage ?? 1,
    lastPage: data.lastPage ?? 1,
    hasMorePages: data.hasMorePages ?? false,
    total: data.total ?? 0,
  };
}

export function mapPaginatedList<TRaw, TDomain>(
  data: { paginatorInfo: { currentPage?: number; lastPage?: number; hasMorePages?: boolean; total?: number }; data: readonly TRaw[] },
  mapItem: (item: TRaw) => TDomain,
): PaginatedList<TDomain> {
  return {
    items: data.data.map(mapItem),
    paginator: mapPaginatorInfo(data.paginatorInfo),
  };
}
