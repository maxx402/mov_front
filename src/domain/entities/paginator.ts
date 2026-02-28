export interface PaginatorInfo {
  readonly currentPage: number;
  readonly lastPage: number;
  readonly hasMorePages: boolean;
  readonly total: number;
}

export interface PaginatedList<T> {
  readonly items: readonly T[];
  readonly paginator: PaginatorInfo;
}

export function hasMorePages(paginator: PaginatorInfo): boolean {
  return paginator.hasMorePages;
}

export function getNextPage(paginator: PaginatorInfo): number {
  return paginator.currentPage + 1;
}

export function isPaginatorEmpty(paginator: PaginatorInfo): boolean {
  return paginator.total === 0;
}
