import { makeAutoObservable, runInAction } from "mobx";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { IFavoriteRepository } from "@/domain/repositories/favorite-repository";
import type { ISubscriptionRepository } from "@/domain/repositories/subscription-repository";
import type { ICommentRepository } from "@/domain/repositories/comment-repository";
import type { Movie } from "@/domain/entities/movie";
import type { Episode } from "@/domain/entities/episode";
import type { Comment } from "@/domain/entities/comment";

export class MovieDetailStore {
  private _movieId: string | null = null;
  movie: Movie | null = null;
  episodes: Episode[] = [];
  recommendedMovies: Movie[] = [];
  isLoading = false;
  hasError = false;
  errorMessage: string | null = null;
  isFavorited = false;
  isSubscribed = false;
  isFavoriting = false;
  isSubscribing = false;
  private recommendPage = 1;

  // Comment state
  comments: Comment[] = [];
  isLoadingComments = false;
  commentPage = 1;
  hasMoreComments = true;
  isSubmittingComment = false;

  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly favoriteRepository: IFavoriteRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly commentRepository: ICommentRepository,
  ) {
    makeAutoObservable(this);
  }

  get movieId(): string | null {
    return this._movieId;
  }

  get isEmpty(): boolean {
    return this.movie === null && !this.isLoading;
  }

  async init(movieId: string): Promise<void> {
    this._movieId = movieId;
    await this.loadData();
  }

  async switchMovie(movieId: string): Promise<void> {
    this.reset();
    this._movieId = movieId;
    await this.loadData();
  }

  private reset(): void {
    this.movie = null;
    this.episodes = [];
    this.recommendedMovies = [];
    this.isLoading = false;
    this.hasError = false;
    this.errorMessage = null;
    this.isFavorited = false;
    this.isSubscribed = false;
    this.recommendPage = 1;
    this.comments = [];
    this.isLoadingComments = false;
    this.commentPage = 1;
    this.hasMoreComments = true;
    this.isSubmittingComment = false;
  }

  private async loadData(): Promise<void> {
    if (!this._movieId) return;
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = null;

    const result = await this.movieRepository.getMovieDetail(this._movieId);
    runInAction(() => {
      this.isLoading = false;
      result.fold(
        (error) => {
          this.hasError = true;
          this.errorMessage = error.userMessage;
        },
        (detail) => {
          this.movie = detail.movie;
          this.episodes = [...(detail.movie.episodes ?? [])];
          this.recommendedMovies = [...detail.recommendedMovies.items];
          this.isFavorited = detail.movie.isFavorited;
          this.isSubscribed = detail.movie.isSubscribed;
        },
      );
    });
  }

  async refresh(): Promise<void> {
    await this.loadData();
  }

  async toggleFavorite(): Promise<string | null> {
    if (this.isFavoriting || !this._movieId) return null;
    this.isFavoriting = true;
    const wasFavorited = this.isFavorited;
    this.isFavorited = !wasFavorited;

    const result = wasFavorited
      ? await this.favoriteRepository.removeFavorite(this._movieId)
      : await this.favoriteRepository.addFavorite(this._movieId);

    return runInAction(() => {
      this.isFavoriting = false;
      return result.fold(
        (error) => {
          this.isFavorited = wasFavorited;
          return error.userMessage;
        },
        () => null,
      );
    });
  }

  async toggleSubscribe(): Promise<string | null> {
    if (this.isSubscribing || !this._movieId) return null;
    this.isSubscribing = true;
    const wasSubscribed = this.isSubscribed;
    this.isSubscribed = !wasSubscribed;

    const result = wasSubscribed
      ? await this.subscriptionRepository.removeSubscription(this._movieId)
      : await this.subscriptionRepository.addSubscription({ movieId: this._movieId });

    return runInAction(() => {
      this.isSubscribing = false;
      return result.fold(
        (error) => {
          this.isSubscribed = wasSubscribed;
          return error.userMessage;
        },
        () => null,
      );
    });
  }

  async loadMoreRecommended(): Promise<void> {
    if (!this._movieId) return;
    this.recommendPage += 1;
    const result = await this.movieRepository.getRecommendedMovies({
      movieId: this._movieId,
      page: this.recommendPage,
      pageSize: 6,
    });
    runInAction(() => {
      result.fold(
        () => {},
        (list) => {
          this.recommendedMovies = [...this.recommendedMovies, ...list.items];
        },
      );
    });
  }

  async refreshRecommended(): Promise<void> {
    if (!this._movieId) return;
    this.recommendPage = 1;
    const result = await this.movieRepository.getRecommendedMovies({
      movieId: this._movieId,
      page: 1,
      pageSize: 6,
    });
    runInAction(() => {
      result.fold(
        () => {},
        (list) => {
          this.recommendedMovies = [...list.items];
        },
      );
    });
  }

  async loadComments(): Promise<void> {
    if (!this._movieId || this.isLoadingComments) return;
    this.isLoadingComments = true;
    this.commentPage = 1;
    const result = await this.commentRepository.getComments({
      targetType: "movie",
      targetId: this._movieId,
      page: 1,
      pageSize: 15,
    });
    runInAction(() => {
      this.isLoadingComments = false;
      result.fold(
        () => {},
        (list) => {
          this.comments = [...list.items];
          this.hasMoreComments = list.items.length >= 15;
        },
      );
    });
  }

  async loadMoreComments(): Promise<void> {
    if (!this._movieId || this.isLoadingComments || !this.hasMoreComments) return;
    this.isLoadingComments = true;
    this.commentPage += 1;
    const result = await this.commentRepository.getComments({
      targetType: "movie",
      targetId: this._movieId,
      page: this.commentPage,
      pageSize: 15,
    });
    runInAction(() => {
      this.isLoadingComments = false;
      result.fold(
        () => {},
        (list) => {
          this.comments = [...this.comments, ...list.items];
          this.hasMoreComments = list.items.length >= 15;
        },
      );
    });
  }

  async submitComment(content: string): Promise<string | null> {
    if (!this._movieId || this.isSubmittingComment) return null;
    this.isSubmittingComment = true;
    const result = await this.commentRepository.createComment({
      targetType: "movie",
      targetId: this._movieId,
      content,
    });
    return runInAction(() => {
      this.isSubmittingComment = false;
      return result.fold(
        (error) => error.userMessage,
        (comment) => {
          this.comments = [comment, ...this.comments];
          return null;
        },
      );
    });
  }

  async toggleCommentLike(commentId: string): Promise<void> {
    const idx = this.comments.findIndex((c) => c.id === commentId);
    if (idx === -1) return;
    const comment = this.comments[idx];
    const wasLiked = comment.isLiked;

    // Optimistic update
    this.comments = this.comments.map((c) =>
      c.id === commentId
        ? { ...c, isLiked: !wasLiked, likeCount: wasLiked ? c.likeCount - 1 : c.likeCount + 1 }
        : c,
    );

    const result = wasLiked
      ? await this.commentRepository.unlikeComment(commentId)
      : await this.commentRepository.likeComment(commentId);

    runInAction(() => {
      result.fold(
        () => {
          // Revert on error
          this.comments = this.comments.map((c) =>
            c.id === commentId
              ? { ...c, isLiked: wasLiked, likeCount: wasLiked ? c.likeCount + 1 : c.likeCount - 1 }
              : c,
          );
        },
        () => {},
      );
    });
  }
}
