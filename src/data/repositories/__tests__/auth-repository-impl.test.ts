import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthRepositoryImpl } from "../auth-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  LoginDocument: { kind: "Document" },
  RegisterDocument: { kind: "Document" },
  MeDocument: { kind: "Document" },
  UserDocument: { kind: "Document" },
  MyInvitationCodeDocument: { kind: "Document" },
  MyInvitationRecordsDocument: { kind: "Document" },
  BindInvitationCodeDocument: { kind: "Document" },
  MyInviterDocument: { kind: "Document" },
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("AuthRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: AuthRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new AuthRepositoryImpl(client);
  });

  describe("login", () => {
    it("returns success with auth result", async () => {
      client.mutate.mockResolvedValue({
        data: { login: { token: "tk", user: { id: "1", name: "u", gender: 1 } } },
      });
      const result = await repo.login({ account: "a", password: "p" });
      expect(result.isSuccess).toBe(true);
      expect(result.value!.token).toBe("tk");
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.login({ account: "a", password: "p" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("register", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({
        data: { register: { token: "tk2", user: { id: "2", name: "u2" } } },
      });
      const result = await repo.register({ account: "a", password: "p" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.register({ account: "a", password: "p" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getCurrentUser", () => {
    it("returns user when exists", async () => {
      client.query.mockResolvedValue({ data: { me: { id: "1", name: "u" } } });
      const result = await repo.getCurrentUser();
      expect(result.isSuccess).toBe(true);
      expect(result.value!.id).toBe("1");
    });

    it("returns null when no user", async () => {
      client.query.mockResolvedValue({ data: { me: null } });
      const result = await repo.getCurrentUser();
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeNull();
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getCurrentUser();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getUser", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({ data: { user: { id: "1", name: "u" } } });
      const result = await repo.getUser("1");
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getUser("1");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getMyInvitationCode", () => {
    it("returns code", async () => {
      client.query.mockResolvedValue({ data: { myInvitationCode: { code: "ABC" } } });
      const result = await repo.getMyInvitationCode();
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe("ABC");
    });
  });

  describe("getMyInvitationRecords", () => {
    it("returns records", async () => {
      client.query.mockResolvedValue({
        data: { myInvitationRecords: { data: [{ id: "1", created_at: "2024-01-01", invitee: { id: "2", name: "inv" } }] } },
      });
      const result = await repo.getMyInvitationRecords({ first: 10 });
      expect(result.isSuccess).toBe(true);
      expect(result.value!.length).toBe(1);
    });
  });

  describe("bindInvitationCode", () => {
    it("returns success result", async () => {
      client.mutate.mockResolvedValue({
        data: { bindInvitationCode: { success: true, message: "ok" } },
      });
      const result = await repo.bindInvitationCode("CODE");
      expect(result.isSuccess).toBe(true);
      expect(result.value!.success).toBe(true);
    });
  });

  describe("getMyInviter", () => {
    it("returns inviter", async () => {
      client.query.mockResolvedValue({
        data: { myInviter: { id: "1", created_at: "2024-01-01", inviter: { name: "inv" } } },
      });
      const result = await repo.getMyInviter();
      expect(result.isSuccess).toBe(true);
    });

    it("returns null when no inviter", async () => {
      client.query.mockResolvedValue({ data: { myInviter: null } });
      const result = await repo.getMyInviter();
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeNull();
    });
  });
});
