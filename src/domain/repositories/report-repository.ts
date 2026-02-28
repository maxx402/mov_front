import type { Result } from "@/core/errors/result";
import type { Report, ReportReason } from "@/domain/entities/report";

export interface IReportRepository {
  createReport(params: {
    targetType: string;
    targetId: string;
    reason: ReportReason;
    description?: string;
  }): Promise<Result<Report>>;
}
