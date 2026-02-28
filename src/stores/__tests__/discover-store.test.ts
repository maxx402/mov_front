import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { NetworkFailure } from "@/core/errors/failure";
import { DiscoverStore } from "../discover-store";

function createMockTopicRepo() {
  return { getTopicGroups: vi.fn(), getTopics: vi.fn() };
}
function createMockActorRepo() {
  return { getActor: vi.fn(), getActors: vi.fn() };
}

const defaultPaginator = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 0 };

const mockTopicGroups = [
  { id: "tg1", name: "Group 1", topics: [{ id: "t1", name: "Topic 1" }] },
  { id: "tg2", name: "Group 2", topics: [] },
];

const mockActors = [
  { id: "a1", name: "Actor 1" },
  { id: "a2", name: "Actor 2" },
];

describe("DiscoverStore", () => {
  let topicRepo: ReturnType<typeof createMockTopicRepo>;
  let actorRepo: ReturnType<typeof createMockActorRepo>;
  let store: DiscoverStore;

  beforeEach(() => {
    topicRepo = createMockTopicRepo();
    actorRepo = createMockActorRepo();
    store = new DiscoverStore(topicRepo, actorRepo);
  });

  describe("init", () => {
    it("loads topic groups and sets isLoading correctly", async () => {
      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: mockTopicGroups,
        paginator: { currentPage: 1, lastPage: 2, hasMorePages: true, total: 10 },
      }));

      const promise = store.init();
      expect(store.isLoading).toBe(true);
      await promise;

      expect(store.isLoading).toBe(false);
      expect(store.topicGroups).toEqual(mockTopicGroups);
      expect(store.topicPaginator).toEqual({ currentPage: 1, lastPage: 2, hasMorePages: true, total: 10 });
      expect(topicRepo.getTopicGroups).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    });

    it("sets errorMessage on failure", async () => {
      topicRepo.getTopicGroups.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "topic error" })),
      );
      await store.init();

      expect(store.errorMessage).toBe("topic error");
      expect(store.isLoading).toBe(false);
      expect(store.topicGroups).toEqual([]);
    });
  });

  describe("setSelectedTabIndex", () => {
    it("sets the tab index", () => {
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: [],
        paginator: defaultPaginator,
      }));
      store.setSelectedTabIndex(1);
      expect(store.selectedTabIndex).toBe(1);
    });

    it("triggers loadActors when switching to tab 1 with empty actors", async () => {
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: mockActors,
        paginator: defaultPaginator,
      }));

      store.setSelectedTabIndex(1);

      await vi.waitFor(() => {
        expect(actorRepo.getActors).toHaveBeenCalledWith({ page: 1, pageSize: 20 });
      });
      await vi.waitFor(() => {
        expect(store.actors).toEqual(mockActors);
      });
    });

    it("does not trigger loadActors when switching to tab 1 with existing actors", async () => {
      // First, load actors
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: mockActors,
        paginator: defaultPaginator,
      }));
      store.setSelectedTabIndex(1);
      await vi.waitFor(() => {
        expect(store.actors).toHaveLength(2);
      });

      const callCountAfterFirstLoad = actorRepo.getActors.mock.calls.length;

      // Switch away and back
      store.setSelectedTabIndex(0);
      store.setSelectedTabIndex(1);

      // Should NOT have called getActors again since actors are not empty
      expect(actorRepo.getActors).toHaveBeenCalledTimes(callCountAfterFirstLoad);
    });

    it("does not trigger loadActors when switching to tab 0", () => {
      store.setSelectedTabIndex(0);
      expect(actorRepo.getActors).not.toHaveBeenCalled();
    });
  });

  describe("loadMoreTopics", () => {
    it("skips when hasMorePages is false", async () => {
      await store.loadMoreTopics();
      expect(topicRepo.getTopicGroups).not.toHaveBeenCalled();
    });

    it("loads next page and appends when hasMorePages is true", async () => {
      // Set up initial state
      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: mockTopicGroups,
        paginator: { currentPage: 1, lastPage: 3, hasMorePages: true, total: 20 },
      }));
      await store.init();

      expect(store.topicGroups).toEqual(mockTopicGroups);

      // Load more
      const moreTopics = [{ id: "tg3", name: "Group 3", topics: [] }];
      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: moreTopics,
        paginator: { currentPage: 2, lastPage: 3, hasMorePages: true, total: 20 },
      }));
      await store.loadMoreTopics();

      expect(topicRepo.getTopicGroups).toHaveBeenCalledWith({ page: 2, pageSize: 10 });
      expect(store.topicGroups).toEqual([...mockTopicGroups, ...moreTopics]);
      expect(store.topicPaginator.currentPage).toBe(2);
    });

    it("sets errorMessage on failure during loadMoreTopics", async () => {
      store.topicPaginator = { currentPage: 1, lastPage: 3, hasMorePages: true, total: 20 };
      topicRepo.getTopicGroups.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "load more topics error" })),
      );
      await store.loadMoreTopics();
      expect(store.errorMessage).toBe("load more topics error");
    });
  });

  describe("loadMoreActors", () => {
    it("skips when hasMorePages is false", async () => {
      await store.loadMoreActors();
      expect(actorRepo.getActors).not.toHaveBeenCalled();
    });

    it("loads next page and appends when hasMorePages is true", async () => {
      // Set initial actor state
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: mockActors,
        paginator: { currentPage: 1, lastPage: 3, hasMorePages: true, total: 40 },
      }));
      store.setSelectedTabIndex(1);
      await vi.waitFor(() => {
        expect(store.actors).toHaveLength(2);
      });

      // Load more
      const moreActors = [{ id: "a3", name: "Actor 3" }];
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: moreActors,
        paginator: { currentPage: 2, lastPage: 3, hasMorePages: true, total: 40 },
      }));
      await store.loadMoreActors();

      expect(actorRepo.getActors).toHaveBeenCalledWith({ page: 2, pageSize: 20 });
      expect(store.actors).toEqual([...mockActors, ...moreActors]);
      expect(store.actorPaginator.currentPage).toBe(2);
    });

    it("sets errorMessage on failure during loadMoreActors", async () => {
      store.actorPaginator = { currentPage: 1, lastPage: 3, hasMorePages: true, total: 40 };
      actorRepo.getActors.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "load more actors error" })),
      );
      await store.loadMoreActors();
      expect(store.errorMessage).toBe("load more actors error");
    });
  });

  describe("refresh", () => {
    it("reloads topic groups when on tab 0", async () => {
      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: mockTopicGroups,
        paginator: defaultPaginator,
      }));
      await store.init();

      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: [{ id: "tg99", name: "Refreshed", topics: [] }],
        paginator: defaultPaginator,
      }));
      await store.refresh();

      expect(topicRepo.getTopicGroups).toHaveBeenCalledTimes(2);
      expect(store.topicGroups).toEqual([{ id: "tg99", name: "Refreshed", topics: [] }]);
      expect(actorRepo.getActors).not.toHaveBeenCalled();
    });

    it("reloads actors when on tab 1", async () => {
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: mockActors,
        paginator: defaultPaginator,
      }));
      store.setSelectedTabIndex(1);
      await vi.waitFor(() => {
        expect(store.actors).toHaveLength(2);
      });

      actorRepo.getActors.mockResolvedValue(Result.success({
        items: [{ id: "a99", name: "Refreshed Actor" }],
        paginator: defaultPaginator,
      }));
      await store.refresh();

      expect(store.actors).toEqual([{ id: "a99", name: "Refreshed Actor" }]);
    });

    it("replaces topics on page 1 during refresh (not append)", async () => {
      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: mockTopicGroups,
        paginator: { currentPage: 1, lastPage: 2, hasMorePages: true, total: 10 },
      }));
      await store.init();

      // Load more to have appended items
      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: [{ id: "tg3", name: "Extra", topics: [] }],
        paginator: { currentPage: 2, lastPage: 2, hasMorePages: false, total: 10 },
      }));
      await store.loadMoreTopics();
      expect(store.topicGroups).toHaveLength(3);

      // Refresh should replace, not append
      topicRepo.getTopicGroups.mockResolvedValue(Result.success({
        items: [{ id: "tg1", name: "Only One", topics: [] }],
        paginator: defaultPaginator,
      }));
      await store.refresh();
      expect(store.topicGroups).toEqual([{ id: "tg1", name: "Only One", topics: [] }]);
    });

    it("replaces actors on page 1 during refresh (not append)", async () => {
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: mockActors,
        paginator: { currentPage: 1, lastPage: 2, hasMorePages: true, total: 30 },
      }));
      store.setSelectedTabIndex(1);
      await vi.waitFor(() => {
        expect(store.actors).toHaveLength(2);
      });

      // Load more
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: [{ id: "a3", name: "Actor 3" }],
        paginator: { currentPage: 2, lastPage: 2, hasMorePages: false, total: 30 },
      }));
      await store.loadMoreActors();
      expect(store.actors).toHaveLength(3);

      // Refresh should replace
      actorRepo.getActors.mockResolvedValue(Result.success({
        items: [{ id: "a99", name: "Single" }],
        paginator: defaultPaginator,
      }));
      await store.refresh();
      expect(store.actors).toEqual([{ id: "a99", name: "Single" }]);
    });
  });
});
