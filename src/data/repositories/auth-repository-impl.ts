import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import type { AuthResult, User } from "@/domain/entities/user";
import type { InvitationRecord } from "@/domain/entities/invitation-record";
import { mapUser, mapGender } from "@/data/mappers/user-mapper";
import {
  LoginDocument,
  RegisterDocument,
  MeDocument,
  UserDocument,
  MyInvitationCodeDocument,
  MyInvitationRecordsDocument,
  BindInvitationCodeDocument,
  MyInviterDocument,
} from "@/data/graphql/__generated__/graphql";

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly client: ApolloClient) {}

  async login(params: { account: string; password: string }): Promise<Result<AuthResult>> {
    try {
      const { data } = await this.client.mutate({
        mutation: LoginDocument,
        variables: { input: { account: params.account, password: params.password } },
      });
      const result = data!.login;
      return Result.success({
        token: result.token,
        user: mapUser(result.user),
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async register(params: { account: string; password: string }): Promise<Result<AuthResult>> {
    try {
      const { data } = await this.client.mutate({
        mutation: RegisterDocument,
        variables: { input: { account: params.account, password: params.password } },
      });
      const result = data!.register;
      return Result.success({
        token: result.token,
        user: mapUser(result.user),
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getCurrentUser(): Promise<Result<User | null>> {
    try {
      const { data } = await this.client.query({ query: MeDocument });
      if (!data!.me) return Result.success(null);
      return Result.success(mapUser(data!.me));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getUser(id: string): Promise<Result<User>> {
    try {
      const { data } = await this.client.query({
        query: UserDocument,
        variables: { id },
      });
      return Result.success(mapUser(data!.user!));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMyInvitationCode(): Promise<Result<string>> {
    try {
      const { data } = await this.client.query({ query: MyInvitationCodeDocument });
      return Result.success(data!.myInvitationCode.code);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMyInvitationRecords(params: { first: number; page?: number }): Promise<Result<InvitationRecord[]>> {
    try {
      const { data } = await this.client.query({
        query: MyInvitationRecordsDocument,
        variables: { first: params.first, page: params.page },
      });
      const records = data!.myInvitationRecords.data.map((r: any) => ({
        id: r.id,
        inviteeId: r.invitee_id ?? r.invitee?.id ?? "",
        createdAt: r.created_at,
        inviteeName: r.invitee?.nickname ?? r.invitee?.name ?? undefined,
        inviteeAvatar: r.invitee?.avatar ?? undefined,
      }));
      return Result.success(records);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async bindInvitationCode(code: string): Promise<Result<{ success: boolean; message?: string }>> {
    try {
      const { data } = await this.client.mutate({
        mutation: BindInvitationCodeDocument,
        variables: { code },
      });
      return Result.success({
        success: data!.bindInvitationCode.success,
        message: data!.bindInvitationCode.message ?? undefined,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMyInviter(): Promise<Result<InvitationRecord | null>> {
    try {
      const { data } = await this.client.query({ query: MyInviterDocument });
      if (!data!.myInviter) return Result.success(null);
      const r = data!.myInviter;
      return Result.success({
        id: r.id,
        inviteeId: "",
        createdAt: r.created_at,
        inviterName: r.inviter?.nickname ?? r.inviter?.name ?? undefined,
        inviterAvatar: r.inviter?.avatar ?? undefined,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
