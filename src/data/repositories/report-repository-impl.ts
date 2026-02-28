import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IReportRepository } from "@/domain/repositories/report-repository";
import type { Report } from "@/domain/entities/report";
import { ReportReason, ReportStatus } from "@/domain/entities/report";
import { CreateReportDocument } from "@/data/graphql/__generated__/graphql";

export class ReportRepositoryImpl implements IReportRepository {
  constructor(private readonly client: ApolloClient) {}

  async createReport(params: {
    targetType: string;
    targetId: string;
    reason: ReportReason;
    description?: string;
  }): Promise<Result<Report>> {
    try {
      const { data } = await this.client.mutate({
        mutation: CreateReportDocument,
        variables: {
          input: {
            reportable_type: params.targetType,
            reportable_id: params.targetId,
            reason: params.reason.toUpperCase(),
            description: params.description,
          },
        },
      });
      const r = data!.createReport!;
      return Result.success({
        id: r.id,
        reason: (String(r.reason ?? "").toLowerCase() || "other") as ReportReason,
        description: r.description ?? undefined,
        status: (String(r.status ?? "").toLowerCase() || "pending") as ReportStatus,
        createdAt: r.created_at,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
