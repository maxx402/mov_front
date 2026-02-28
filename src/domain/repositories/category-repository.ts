import type { Result } from "@/core/errors/result";
import type { Category, CategoryHome } from "@/domain/entities/category";
import type { Channel } from "@/domain/entities/channel";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface ICategoryRepository {
  getCategories(): Promise<Result<Category[]>>;
  getCategoryHome(categoryId: string): Promise<Result<CategoryHome>>;
  getChannelsByCategory(params: {
    categoryId: string;
    isGrid?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Channel>>>;
}
