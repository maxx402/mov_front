import type { Result } from "@/core/errors/result";
import type { AuthResult, User } from "@/domain/entities/user";
import type { InvitationRecord } from "@/domain/entities/invitation-record";

export interface IAuthRepository {
  login(params: { account: string; password: string }): Promise<Result<AuthResult>>;
  register(params: { account: string; password: string }): Promise<Result<AuthResult>>;
  getCurrentUser(): Promise<Result<User | null>>;
  getUser(id: string): Promise<Result<User>>;
  getMyInvitationCode(): Promise<Result<string>>;
  getMyInvitationRecords(params: { first: number; page?: number }): Promise<Result<InvitationRecord[]>>;
  bindInvitationCode(code: string): Promise<Result<{ success: boolean; message?: string }>>;
  getMyInviter(): Promise<Result<InvitationRecord | null>>;
}
