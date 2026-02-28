export enum Gender {
  Unknown = "unknown",
  Male = "male",
  Female = "female",
}

export interface User {
  readonly id: string;
  readonly name: string;
  readonly nickname?: string;
  readonly avatar?: string;
  readonly gender: Gender;
  readonly bio?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly isGuest: boolean;
}

export interface AuthResult {
  readonly token: string;
  readonly user: User;
}

export function getUserDisplayName(user: User): string {
  return user.nickname ?? user.name;
}
