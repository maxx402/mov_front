import type { User, Gender } from "@/domain/entities/user";
import { Gender as GenderEnum } from "@/domain/entities/user";

export function mapGender(value: unknown): Gender {
  if (typeof value === "number") {
    switch (value) {
      case 1: return GenderEnum.Male;
      case 2: return GenderEnum.Female;
      default: return GenderEnum.Unknown;
    }
  }
  if (typeof value === "string") {
    switch (value.toLowerCase()) {
      case "male": return GenderEnum.Male;
      case "female": return GenderEnum.Female;
      default: return GenderEnum.Unknown;
    }
  }
  return GenderEnum.Unknown;
}

export function mapUser(data: {
  id: string;
  name: string;
  nickname?: string | null;
  avatar?: string | null;
  gender?: unknown;
  bio?: string | null;
  phone?: string | null;
  email?: string | null;
  is_guest?: boolean;
}): User {
  return {
    id: data.id,
    name: data.name,
    nickname: data.nickname ?? undefined,
    avatar: data.avatar ?? undefined,
    gender: mapGender(data.gender),
    bio: data.bio ?? undefined,
    phone: data.phone ?? undefined,
    email: data.email ?? undefined,
    isGuest: data.is_guest ?? false,
  };
}
