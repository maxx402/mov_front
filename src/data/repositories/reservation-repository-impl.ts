import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import { ApiFailure } from "@/core/errors/failure";
import type { IReservationRepository } from "@/domain/repositories/reservation-repository";
import type { Reservation } from "@/domain/entities/reservation";
import { ReservationStatus } from "@/domain/entities/reservation";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  MyReservationsDocument,
  AddReservationDocument,
  ReservationStatus as GqlReservationStatus,
} from "@/data/graphql/__generated__/graphql";

function mapReservation(data: any): Reservation {
  return {
    id: data.id,
    movieId: data.movie?.id ?? data.movie_id ?? "",
    movieTitle: data.movie?.title ?? "",
    movieCover: data.movie?.cover ?? "",
    releaseDate: data.movie?.release_date ?? undefined,
    status: data.movie?.status === "RELEASED"
      ? ReservationStatus.Released
      : ReservationStatus.Upcoming,
    createdAt: data.created_at,
  };
}

function toGqlStatus(status?: ReservationStatus): GqlReservationStatus | undefined {
  if (!status) return undefined;
  return status === ReservationStatus.Upcoming
    ? GqlReservationStatus.Upcoming
    : GqlReservationStatus.Released;
}

export class ReservationRepositoryImpl implements IReservationRepository {
  constructor(private readonly client: ApolloClient) {}

  async getReservations(params?: {
    status?: ReservationStatus;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Reservation>>> {
    try {
      const { data } = await this.client.query({
        query: MyReservationsDocument,
        variables: {
          page: params?.page ?? 1,
          first: params?.pageSize ?? 20,
          status: toGqlStatus(params?.status),
        },
      });
      return Result.success(mapPaginatedList(data!.myReservations, mapReservation));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async addReservation(movieId: string): Promise<Result<Reservation>> {
    try {
      const { data } = await this.client.mutate({
        mutation: AddReservationDocument,
        variables: { movie_id: movieId },
      });
      return Result.success(mapReservation(data!.addReservation));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async removeReservation(_movieId: string): Promise<Result<boolean>> {
    return Result.failure(
      new ApiFailure({ message: "removeReservation not supported by server" }),
    );
  }

  async removeReservations(_movieIds: string[]): Promise<Result<boolean>> {
    return Result.failure(
      new ApiFailure({ message: "removeReservations not supported by server" }),
    );
  }
}
