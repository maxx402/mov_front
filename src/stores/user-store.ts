import { makeAutoObservable, runInAction } from "mobx";
import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import type { User } from "@/domain/entities/user";
import type { Failure } from "@/core/errors/failure";
import { storage } from "@/core/storage/storage";

export class UserStore {
  private _token: string | null = null;
  private _currentUser: User | null = null;
  isRestoring = false;
  isLoggingIn = false;
  errorMessage: string | null = null;
  showLoginSheet = false;

  constructor(private readonly authRepository: IAuthRepository) {
    makeAutoObservable(this);
  }

  get token(): string | null {
    return this._token;
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  get isAuthenticated(): boolean {
    return this._token !== null && this._currentUser !== null;
  }

  get displayName(): string {
    return this._currentUser?.nickname ?? this._currentUser?.name ?? "未登录";
  }

  openLoginSheet(): void {
    this.showLoginSheet = true;
  }

  closeLoginSheet(): void {
    this.showLoginSheet = false;
  }

  handleUnauthenticated(): void {
    this._token = null;
    this._currentUser = null;
    storage.clear();
    this.showLoginSheet = true;
  }

  async restore(): Promise<boolean> {
    this.isRestoring = true;
    const savedToken = storage.getToken();
    if (!savedToken) {
      runInAction(() => { this.isRestoring = false; });
      return false;
    }
    this._token = savedToken;
    const result = await this.authRepository.getCurrentUser();
    runInAction(() => {
      this.isRestoring = false;
      result.fold(
        () => {
          this._token = null;
          storage.clear();
        },
        (user) => {
          if (user) {
            this._currentUser = user;
            storage.setCachedUser(user);
          } else {
            this._token = null;
            storage.clear();
          }
        },
      );
    });
    return this.isAuthenticated;
  }

  async login(params: { account: string; password: string }): Promise<Failure | null> {
    this.isLoggingIn = true;
    this.errorMessage = null;
    const result = await this.authRepository.login(params);
    return runInAction(() => {
      this.isLoggingIn = false;
      return result.fold(
        (error) => {
          this.errorMessage = error.userMessage;
          return error;
        },
        (authResult) => {
          this._token = authResult.token;
          this._currentUser = authResult.user;
          storage.setToken(authResult.token);
          storage.setCachedUser(authResult.user);
          this.showLoginSheet = false;
          return null;
        },
      );
    });
  }

  async register(params: { account: string; password: string }): Promise<Failure | null> {
    this.isLoggingIn = true;
    this.errorMessage = null;
    const result = await this.authRepository.register(params);
    return runInAction(() => {
      this.isLoggingIn = false;
      return result.fold(
        (error) => {
          this.errorMessage = error.userMessage;
          return error;
        },
        (authResult) => {
          this._token = authResult.token;
          this._currentUser = authResult.user;
          storage.setToken(authResult.token);
          storage.setCachedUser(authResult.user);
          this.showLoginSheet = false;
          return null;
        },
      );
    });
  }

  async logout(): Promise<void> {
    runInAction(() => {
      this._token = null;
      this._currentUser = null;
      storage.clear();
    });
  }

  async refreshUser(): Promise<void> {
    const result = await this.authRepository.getCurrentUser();
    runInAction(() => {
      result.fold(
        () => {},
        (user) => {
          if (user) {
            this._currentUser = user;
            storage.setCachedUser(user);
          }
        },
      );
    });
  }
}
