/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string with format `Y-m-d`, e.g. `2018-05-23`. */
  Date: { input: string; output: string; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: string; output: string; }
  /** 文件上传类型 */
  Upload: { input: File; output: File; }
};

/** 明星 */
export type Actor = {
  __typename?: 'Actor';
  area?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['Date']['output']>;
  created_at: Scalars['DateTime']['output'];
  credits: Array<MovieCredit>;
  description?: Maybe<Scalars['String']['output']>;
  /** 性别：0=未知, 1=男, 2=女 */
  gender: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  original_name?: Maybe<Scalars['String']['output']>;
  sort: Scalars['Int']['output'];
  statistics?: Maybe<ActorStatistics>;
  updated_at: Scalars['DateTime']['output'];
};

/** A paginated list of Actor items. */
export type ActorPaginator = {
  __typename?: 'ActorPaginator';
  /** A list of Actor items. */
  data: Array<Actor>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 明星统计 */
export type ActorStatistics = {
  __typename?: 'ActorStatistics';
  actor: Actor;
  actor_id: Scalars['ID']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  movie_count: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  view_count: Scalars['Int']['output'];
};

/** 广告 */
export type Advertisement = {
  __typename?: 'Advertisement';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** 广告图片 */
  image?: Maybe<Scalars['String']['output']>;
  /** 跳转链接 */
  link?: Maybe<Scalars['String']['output']>;
  /** 广告名称 */
  name?: Maybe<Scalars['String']['output']>;
  /** 排序 */
  sort: Scalars['Int']['output'];
  /** 状态：0=下架，1=上架 */
  status: Scalars['Int']['output'];
  /** 广告类型 */
  type: AdvertisementType;
  updated_at: Scalars['DateTime']['output'];
};

/** 广告类型枚举 */
export enum AdvertisementType {
  /** 横幅广告 */
  Banner = 'BANNER',
  /** 悬浮广告 */
  Float = 'FLOAT',
  /** 前贴片 */
  PreRoll = 'PRE_ROLL',
  /** 开屏广告 */
  Splash = 'SPLASH',
  /** 置顶栏目 */
  TopChannel = 'TOP_CHANNEL'
}

/** App版本 */
export type AppVersion = {
  __typename?: 'AppVersion';
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  download_url?: Maybe<Scalars['String']['output']>;
  /** 文件大小（字节） */
  file_size: Scalars['Int']['output'];
  force_update: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  md5?: Maybe<Scalars['String']['output']>;
  /** 平台 */
  platform: Platform;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  /** 版本号：1.0.0 */
  version: Scalars['String']['output'];
  version_code: Scalars['Int']['output'];
};

/** 资源文件 */
export type Asset = {
  __typename?: 'Asset';
  created_at: Scalars['DateTime']['output'];
  /** 存储源 */
  disk: Scalars['String']['output'];
  /** 高度 */
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  /** 存储路径 */
  path: Scalars['String']['output'];
  /** 用途标识 */
  purpose?: Maybe<AssetPurpose>;
  /** 资源类型 */
  type: AssetType;
  /** 访问链接 */
  url: Scalars['String']['output'];
  /** 宽度 */
  width?: Maybe<Scalars['Int']['output']>;
};

/** 资源用途 */
export enum AssetPurpose {
  /** 用户头像 */
  Avatar = 'AVATAR',
  /** 封面图 */
  Cover = 'COVER',
  /** 反馈附件 */
  Feedback = 'FEEDBACK'
}

/** 资源类型 */
export enum AssetType {
  /** 音频 */
  Audio = 'AUDIO',
  /** 图片 */
  Image = 'IMAGE',
  /** 视频 */
  Video = 'VIDEO'
}

/** 认证响应 */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  /** 访问令牌 */
  token: Scalars['String']['output'];
  /** 用户信息 */
  user: User;
};

/** 轮播图 */
export type Banner = {
  __typename?: 'Banner';
  category?: Maybe<Category>;
  category_id?: Maybe<Scalars['ID']['output']>;
  cover: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  end_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  /** 关联ID（link_type为MOVIE/ACTOR/TOPIC时有值） */
  link_id?: Maybe<Scalars['ID']['output']>;
  /**
   * 跳转类型:
   * - MOVIE: 影片详情
   * - ACTOR: 演员详情
   * - TOPIC: 专题页面
   * - PAGE: 应用内页面（link_url为页面路径，如 /rank、/preview）
   * - URL: 外部链接（link_url为完整URL）
   */
  link_type: Scalars['String']['output'];
  /** 跳转链接（link_type为PAGE/URL时有值） */
  link_url?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  sort: Scalars['Int']['output'];
  start_at?: Maybe<Scalars['DateTime']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 绑定邀请码结果 */
export type BindInvitationCodePayload = {
  __typename?: 'BindInvitationCodePayload';
  /** 错误信息 */
  message?: Maybe<Scalars['String']['output']>;
  /** 邀请记录 */
  record?: Maybe<InvitationRecord>;
  /** 是否成功 */
  success: Scalars['Boolean']['output'];
};

/** 一级分类 */
export type Category = {
  __typename?: 'Category';
  banners: Array<Banner>;
  channels: Array<Channel>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  is_recommend: Scalars['Boolean']['output'];
  movies: Array<Movie>;
  name: Scalars['String']['output'];
  sort: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 分类首页数据 */
export type CategoryHome = {
  __typename?: 'CategoryHome';
  /** 轮播图列表 */
  banners: Array<Banner>;
  /** 栏目列表（前10个常规栏目） */
  channels: Array<Channel>;
  /** 宫格位列表（仅推荐分类有数据） */
  grids: Array<Channel>;
  /** 热播排行影片（仅推荐分类有数据，前10部） */
  hotMovies: Array<Movie>;
};

/** 栏目/频道 */
export type Channel = {
  __typename?: 'Channel';
  /** 背景图 */
  background_image?: Maybe<Scalars['String']['output']>;
  category: Category;
  category_id: Scalars['ID']['output'];
  cover?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** 宫格图标（is_grid为true时使用） */
  grid_icon?: Maybe<Scalars['String']['output']>;
  /** 图标 */
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_grid: Scalars['Boolean']['output'];
  /**
   * 链接类型:
   * - MOVIES: 影片列表（展示栏目关联的影片）
   * - PAGE: 应用内页面（link_url为页面路径，如 /rank、/preview）
   * - URL: 外部链接（link_url为完整URL）
   */
  link_type: Scalars['String']['output'];
  /** 跳转链接（link_type为PAGE/URL时有值） */
  link_url?: Maybe<Scalars['String']['output']>;
  movies: MoviePaginator;
  name: Scalars['String']['output'];
  sort: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};


/** 栏目/频道 */
export type ChannelMoviesArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** A paginated list of Channel items. */
export type ChannelPaginator = {
  __typename?: 'ChannelPaginator';
  /** A list of Channel items. */
  data: Array<Channel>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 检查更新结果 */
export type CheckUpdateResult = {
  __typename?: 'CheckUpdateResult';
  /** 是否强制更新（当前版本到最新版本之间有任意版本标记为强制更新时为true） */
  force_update: Scalars['Boolean']['output'];
  /** 是否有更新 */
  has_update: Scalars['Boolean']['output'];
  /** 最新版本信息 */
  latest_version?: Maybe<AppVersion>;
};

/** 评论 */
export type Comment = {
  __typename?: 'Comment';
  /** 子评论（分页） */
  children: CommentPaginator;
  /** 评论目标ID */
  commentable_id: Scalars['ID']['output'];
  /** 评论目标类型 */
  commentable_type: CommentableType;
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  is_top: Scalars['Boolean']['output'];
  /** 当前用户是否已点赞 */
  liked: Scalars['Boolean']['output'];
  likes: Array<CommentLike>;
  parent?: Maybe<Comment>;
  parent_id?: Maybe<Scalars['ID']['output']>;
  replies: Array<Comment>;
  replyToComment?: Maybe<Comment>;
  reply_to_comment_id?: Maybe<Scalars['ID']['output']>;
  statistics?: Maybe<CommentStatistics>;
  /** 状态 */
  status: CommentStatus;
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};


/** 评论 */
export type CommentChildrenArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** 评论点赞 */
export type CommentLike = {
  __typename?: 'CommentLike';
  comment: Comment;
  comment_id: Scalars['ID']['output'];
  created_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** A paginated list of Comment items. */
export type CommentPaginator = {
  __typename?: 'CommentPaginator';
  /** A list of Comment items. */
  data: Array<Comment>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 评论统计 */
export type CommentStatistics = {
  __typename?: 'CommentStatistics';
  comment: Comment;
  comment_id: Scalars['ID']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  like_count: Scalars['Int']['output'];
  /** 回复数（仅一级评论） */
  reply_count: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 评论状态 */
export enum CommentStatus {
  /** 禁用 */
  Disabled = 'DISABLED',
  /** 正常 */
  Enabled = 'ENABLED'
}

/** 评论目标类型 */
export enum CommentableType {
  /** 反馈回复 */
  Feedback = 'FEEDBACK',
  /** 影片评论 */
  Movie = 'MOVIE'
}

export type CreateAssetInput = {
  /** 存储源 */
  disk?: InputMaybe<Scalars['String']['input']>;
  /** 高度 */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** 存储路径 */
  path: Scalars['String']['input'];
  /** 用途标识 */
  purpose?: InputMaybe<AssetPurpose>;
  /** 资源类型 */
  type: AssetType;
  /** 访问链接 */
  url: Scalars['String']['input'];
  /** 宽度 */
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateFeedbackCommentInput = {
  /** 评论内容 */
  content: Scalars['String']['input'];
  /** 反馈ID */
  feedback_id: Scalars['ID']['input'];
};

export type CreateFeedbackInput = {
  /** App版本 */
  app_version?: InputMaybe<Scalars['String']['input']>;
  /** 联系方式 */
  contact?: InputMaybe<Scalars['String']['input']>;
  /** 反馈内容（最多1000字） */
  content: Scalars['String']['input'];
  /** 设备信息 */
  device_info?: InputMaybe<Scalars['String']['input']>;
  /** 反馈类型ID */
  feedback_type_id: Scalars['ID']['input'];
  /** 图片资源ID数组（最多9张） */
  image_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** 影片ID（从播放详情页进入时携带） */
  movie_id?: InputMaybe<Scalars['ID']['input']>;
  /** 播放线路ID（正在播放时携带） */
  play_line_id?: InputMaybe<Scalars['ID']['input']>;
  /** 播放链接（正在播放时携带） */
  play_url?: InputMaybe<Scalars['String']['input']>;
  /** 视频资源ID */
  video_id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateMovieCommentInput = {
  /** 评论内容 */
  content: Scalars['String']['input'];
  /** 影片ID */
  movie_id: Scalars['ID']['input'];
  /** 父评论ID（回复一级评论时传入） */
  parent_id?: InputMaybe<Scalars['ID']['input']>;
  /** 被回复的评论ID（回复二级评论时传入） */
  reply_to_comment_id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateReportInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
  reportable_id: Scalars['ID']['input'];
  reportable_type: Scalars['String']['input'];
};

/** 演职人员角色类型 */
export enum CreditRole {
  /** 演员 */
  Actor = 'ACTOR',
  /** 导演 */
  Director = 'DIRECTOR',
  /** 制片人 */
  Producer = 'PRODUCER',
  /** 编剧 */
  Writer = 'WRITER'
}

/** 剧集 */
export type Episode = {
  __typename?: 'Episode';
  cover?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  /** 时长（秒） */
  duration: Scalars['Int']['output'];
  episode_number: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  playLines: Array<PlayLine>;
  published_at?: Maybe<Scalars['DateTime']['output']>;
  statistics?: Maybe<EpisodeStatistics>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

/** 剧集统计 */
export type EpisodeStatistics = {
  __typename?: 'EpisodeStatistics';
  created_at: Scalars['DateTime']['output'];
  episode: Episode;
  episode_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  play_count: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 收藏 */
export type Favorite = {
  __typename?: 'Favorite';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** A paginated list of Favorite items. */
export type FavoritePaginator = {
  __typename?: 'FavoritePaginator';
  /** A list of Favorite items. */
  data: Array<Favorite>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 意见反馈 */
export type Feedback = {
  __typename?: 'Feedback';
  app_version?: Maybe<Scalars['String']['output']>;
  /** 回复列表 */
  comments: Array<Comment>;
  contact?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  device_info?: Maybe<Scalars['String']['output']>;
  /** 反馈类型 */
  feedbackType?: Maybe<FeedbackType>;
  feedback_type_id?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  /** 图片列表 */
  images: Array<Asset>;
  /** 用户IP */
  ip?: Maybe<Scalars['String']['output']>;
  /** 关联影片 */
  movie?: Maybe<Movie>;
  /** 播放线路 */
  playLine?: Maybe<PlayLine>;
  /** 播放链接 */
  play_url?: Maybe<Scalars['String']['output']>;
  /** 状态：0=待处理, 1=已回复, 2=已关闭 */
  status: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['ID']['output']>;
  /** 视频 */
  video?: Maybe<Asset>;
};

/** A paginated list of Feedback items. */
export type FeedbackPaginator = {
  __typename?: 'FeedbackPaginator';
  /** A list of Feedback items. */
  data: Array<Feedback>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 反馈类型 */
export type FeedbackType = {
  __typename?: 'FeedbackType';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** 是否启用 */
  is_active: Scalars['Boolean']['output'];
  /** 类型名称 */
  name: Scalars['String']['output'];
  /** 排序 */
  sort: Scalars['Int']['output'];
};

/** 游戏 */
export type Game = {
  __typename?: 'Game';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** 图片 */
  image: Scalars['String']['output'];
  /** 链接 */
  link: Scalars['String']['output'];
  /** 副标题 */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** 标题 */
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 游戏分类枚举 */
export enum GameCategory {
  /** 热门推荐 */
  HotRecommend = 'HOT_RECOMMEND',
  /** 最多人玩 */
  MostPlayed = 'MOST_PLAYED',
  /** 赚钱最多 */
  MostProfitable = 'MOST_PROFITABLE'
}

/** 游戏分类信息 */
export type GameCategoryInfo = {
  __typename?: 'GameCategoryInfo';
  /** 分类 */
  category: GameCategory;
  /** 分类名称 */
  name: Scalars['String']['output'];
};

/** A paginated list of Game items. */
export type GamePaginator = {
  __typename?: 'GamePaginator';
  /** A list of Game items. */
  data: Array<Game>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 类型（用于筛选） */
export type Genre = {
  __typename?: 'Genre';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  movies: Array<Movie>;
  name: Scalars['String']['output'];
  sort: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 热门搜索关键词 */
export type HotKeyword = {
  __typename?: 'HotKeyword';
  id: Scalars['ID']['output'];
  /** 关键词 */
  keyword: Scalars['String']['output'];
  /** 关联ID（影片/演员/类型） */
  link_id?: Maybe<Scalars['ID']['output']>;
  /** 关键词类型 */
  type: HotKeywordType;
};

/** 热门关键词类型 */
export enum HotKeywordType {
  /** 演员 */
  Actor = 'ACTOR',
  /** 自定义 */
  Custom = 'CUSTOM',
  /** 类型 */
  Genre = 'GENRE',
  /** 影片 */
  Movie = 'MOVIE'
}

/** 邀请码 */
export type InvitationCode = {
  __typename?: 'InvitationCode';
  /** 邀请码（6位） */
  code: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  records: Array<InvitationRecord>;
  updated_at: Scalars['DateTime']['output'];
  /** 已使用次数 */
  used_count: Scalars['Int']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** 邀请记录 */
export type InvitationRecord = {
  __typename?: 'InvitationRecord';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invitationCode: InvitationCode;
  invitation_code_id: Scalars['ID']['output'];
  /** 被邀请人 */
  invitee: User;
  /** 被邀请人ID */
  invitee_id: Scalars['ID']['output'];
  /** 邀请人 */
  inviter: User;
  /** 邀请人ID */
  inviter_id: Scalars['ID']['output'];
};

/** A paginated list of InvitationRecord items. */
export type InvitationRecordPaginator = {
  __typename?: 'InvitationRecordPaginator';
  /** A list of InvitationRecord items. */
  data: Array<InvitationRecord>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 登录输入 */
export type LoginInput = {
  /** 邮箱或手机号 */
  account: Scalars['String']['input'];
  /** 密码 */
  password: Scalars['String']['input'];
};

/** 影片 */
export type Movie = {
  __typename?: 'Movie';
  aliases?: Maybe<Array<Scalars['String']['output']>>;
  area?: Maybe<Scalars['String']['output']>;
  /** 平台上映日期 */
  available_at?: Maybe<Scalars['Date']['output']>;
  categories: Array<Category>;
  channels: Array<Channel>;
  cover?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  credits: Array<MovieCredit>;
  current_episode: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** 时长（秒） */
  duration: Scalars['Int']['output'];
  episodes: Array<Episode>;
  genres: Array<Genre>;
  id: Scalars['ID']['output'];
  /** 当前用户是否已收藏（未登录返回false） */
  isFavorited: Scalars['Boolean']['output'];
  /** 当前用户是否已预约（未登录返回false） */
  isReserved: Scalars['Boolean']['output'];
  /** 当前用户是否已订阅（未登录返回false） */
  isSubscribed: Scalars['Boolean']['output'];
  language?: Maybe<Scalars['String']['output']>;
  /** 当前用户上次观看记录（未登录或无记录返回null） */
  lastWatchHistory?: Maybe<WatchHistory>;
  original_title?: Maybe<Scalars['String']['output']>;
  /** 发布状态：0=草稿, 1=已发布, 2=下架 */
  publish_status: Scalars['Int']['output'];
  /** 最高清晰度：480P/720P/1080P/2K/4K/8K */
  quality?: Maybe<Scalars['String']['output']>;
  release_date?: Maybe<Scalars['Date']['output']>;
  score: Scalars['Float']['output'];
  series?: Maybe<MovieSeries>;
  series_id?: Maybe<Scalars['ID']['output']>;
  series_sort: Scalars['Int']['output'];
  /** 系列类型：1=正剧, 2=剧场版, 3=番外 */
  series_type: Scalars['Int']['output'];
  sources: Array<MovieSource>;
  statistics?: Maybe<MovieStatistics>;
  /** 状态：0=预告, 1=更新中, 2=已完结 */
  status: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  total_episodes: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

/** 演职人员关联 */
export type MovieCredit = {
  __typename?: 'MovieCredit';
  actor: Actor;
  actor_id: Scalars['ID']['output'];
  /** 饰演角色名 */
  character?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  /** 角色类型 */
  role: CreditRole;
  sort: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 影片筛选选项 */
export type MovieFilters = {
  __typename?: 'MovieFilters';
  /** 地区列表 */
  areas: Array<Scalars['String']['output']>;
  /** 类型列表 */
  genres: Array<Genre>;
  /** 年份列表（降序） */
  years: Array<Scalars['Int']['output']>;
};

/** A paginated list of Movie items. */
export type MoviePaginator = {
  __typename?: 'MoviePaginator';
  /** A list of Movie items. */
  data: Array<Movie>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 求片 */
export type MovieRequest = {
  __typename?: 'MovieRequest';
  admin_reply?: Maybe<Scalars['String']['output']>;
  /** 求片内容（0-100字） */
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** 状态：0=待处理, 1=已采纳, 2=已忽略 */
  status: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** A paginated list of MovieRequest items. */
export type MovieRequestPaginator = {
  __typename?: 'MovieRequestPaginator';
  /** A list of MovieRequest items. */
  data: Array<MovieRequest>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 影片系列/合集 */
export type MovieSeries = {
  __typename?: 'MovieSeries';
  cover?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  movies: Array<Movie>;
  sort: Scalars['Int']['output'];
  /** 状态：1=连载中, 2=已完结 */
  status: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  total_parts: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** A paginated list of MovieSeries items. */
export type MovieSeriesPaginator = {
  __typename?: 'MovieSeriesPaginator';
  /** A list of MovieSeries items. */
  data: Array<MovieSeries>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 片源信息 */
export type MovieSource = {
  __typename?: 'MovieSource';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  last_synced_at?: Maybe<Scalars['DateTime']['output']>;
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  source_id: Scalars['String']['output'];
  source_name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 影片统计 */
export type MovieStatistics = {
  __typename?: 'MovieStatistics';
  created_at: Scalars['DateTime']['output'];
  favorite_count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  updated_at: Scalars['DateTime']['output'];
  view_count: Scalars['Int']['output'];
};

/** 追番/订阅 */
export type MovieSubscription = {
  __typename?: 'MovieSubscription';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  notify_update: Scalars['Boolean']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** A paginated list of MovieSubscription items. */
export type MovieSubscriptionPaginator = {
  __typename?: 'MovieSubscriptionPaginator';
  /** A list of MovieSubscription items. */
  data: Array<MovieSubscription>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 按上映日期分组的影片 */
export type MoviesByDate = {
  __typename?: 'MoviesByDate';
  /** 该日期的影片数量 */
  count: Scalars['Int']['output'];
  /** 日期 */
  date: Scalars['Date']['output'];
  /** 日期标签（如：今日上映、昨日上映、3天后上映） */
  label: Scalars['String']['output'];
  /** 该日期的影片列表 */
  movies: Array<Movie>;
};

/** 按日期分组的影片分页结果 */
export type MoviesByDatePaginator = {
  __typename?: 'MoviesByDatePaginator';
  /** 当前页码 */
  currentPage: Scalars['Int']['output'];
  /** 数据列表 */
  data: Array<MoviesByDate>;
  /** 是否有更多数据 */
  hasMorePages: Scalars['Boolean']['output'];
  /** 总日期数 */
  totalDates: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 添加收藏 */
  addFavorite?: Maybe<Favorite>;
  /** 添加预约（针对即将上映的影片） */
  addReservation?: Maybe<Reservation>;
  /** 添加搜索历史（自动去重，最多保留10条） */
  addSearchHistory?: Maybe<SearchHistory>;
  /** 添加订阅 */
  addSubscription?: Maybe<MovieSubscription>;
  /** 记录观看历史（自动创建或更新，以 user_id + movie_id 为唯一标识） */
  addWatchHistory?: Maybe<WatchHistory>;
  /** 绑定邀请码（只能绑定一次） */
  bindInvitationCode: BindInvitationCodePayload;
  /** 清空所有搜索历史（返回删除数量） */
  clearSearchHistories: Scalars['Int']['output'];
  /** 创建资源记录（上传完成后调用） */
  createAsset: Asset;
  /** 创建反馈 */
  createFeedback?: Maybe<Feedback>;
  /** 创建反馈评论（不支持回复，仅直接评论反馈） */
  createFeedbackComment?: Maybe<Comment>;
  /** 创建影片评论（支持回复） */
  createMovieComment?: Maybe<Comment>;
  /** 创建求片请求 */
  createMovieRequest?: Maybe<MovieRequest>;
  /** 创建举报 */
  createReport?: Maybe<Report>;
  /** 删除评论 */
  deleteComment?: Maybe<Comment>;
  /** 点赞评论 */
  likeComment?: Maybe<CommentLike>;
  /** 用户登录（账号为手机号或邮箱） */
  login: AuthPayload;
  /** 标记所有通知为已读 */
  markAllNotificationsAsRead?: Maybe<Scalars['Boolean']['output']>;
  /** 标记通知为已读 */
  markNotificationAsRead?: Maybe<Notification>;
  /** 记录演员页面浏览量（进入演员详情页时调用） */
  recordActorView: Scalars['Boolean']['output'];
  /** 记录剧集播放次数（开始播放时调用） */
  recordEpisodePlay: Scalars['Boolean']['output'];
  /** 记录影片浏览量（进入详情页时调用） */
  recordMovieView: Scalars['Boolean']['output'];
  /** 用户注册（账号为手机号或邮箱） */
  register: AuthPayload;
  /** 取消收藏 */
  removeFavorite?: Maybe<Scalars['Boolean']['output']>;
  /** 批量取消收藏（返回成功取消的数量） */
  removeFavorites: Scalars['Int']['output'];
  /** 删除单条搜索历史 */
  removeSearchHistory: Scalars['Boolean']['output'];
  /** 取消订阅 */
  removeSubscription?: Maybe<Scalars['Boolean']['output']>;
  /** 批量取消订阅（返回成功取消的数量） */
  removeSubscriptions: Scalars['Int']['output'];
  /** 批量删除观看历史（不传movie_ids则清空全部，返回删除数量） */
  removeWatchHistories: Scalars['Int']['output'];
  /** 取消点赞评论 */
  unlikeComment?: Maybe<Scalars['Boolean']['output']>;
  /** 更新订阅设置 */
  updateSubscription?: Maybe<MovieSubscription>;
  /** 上传文件（图片或视频），返回资源记录 */
  uploadFile: Asset;
};


export type MutationAddFavoriteArgs = {
  movie_id: Scalars['ID']['input'];
};


export type MutationAddReservationArgs = {
  movie_id: Scalars['ID']['input'];
};


export type MutationAddSearchHistoryArgs = {
  keyword: Scalars['String']['input'];
};


export type MutationAddSubscriptionArgs = {
  movie_id: Scalars['ID']['input'];
  notify_update?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationAddWatchHistoryArgs = {
  input: WatchHistoryInput;
};


export type MutationBindInvitationCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateAssetArgs = {
  input: CreateAssetInput;
};


export type MutationCreateFeedbackArgs = {
  input: CreateFeedbackInput;
};


export type MutationCreateFeedbackCommentArgs = {
  input: CreateFeedbackCommentInput;
};


export type MutationCreateMovieCommentArgs = {
  input: CreateMovieCommentInput;
};


export type MutationCreateMovieRequestArgs = {
  content: Scalars['String']['input'];
};


export type MutationCreateReportArgs = {
  input: CreateReportInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikeCommentArgs = {
  comment_id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRecordActorViewArgs = {
  actor_id: Scalars['ID']['input'];
};


export type MutationRecordEpisodePlayArgs = {
  episode_id: Scalars['ID']['input'];
};


export type MutationRecordMovieViewArgs = {
  movie_id: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveFavoriteArgs = {
  movie_id: Scalars['ID']['input'];
};


export type MutationRemoveFavoritesArgs = {
  movie_ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveSearchHistoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSubscriptionArgs = {
  movie_id: Scalars['ID']['input'];
};


export type MutationRemoveSubscriptionsArgs = {
  movie_ids: Array<Scalars['ID']['input']>;
};


export type MutationRemoveWatchHistoriesArgs = {
  movie_ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationUnlikeCommentArgs = {
  comment_id: Scalars['ID']['input'];
};


export type MutationUpdateSubscriptionArgs = {
  movie_id: Scalars['ID']['input'];
  notify_update: Scalars['Boolean']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
  purpose?: InputMaybe<AssetPurpose>;
};

/** 通知 */
export type Notification = {
  __typename?: 'Notification';
  content?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  /** 扩展数据（JSON格式） */
  data?: Maybe<NotificationData>;
  id: Scalars['ID']['output'];
  notifiable_id?: Maybe<Scalars['ID']['output']>;
  notifiable_type?: Maybe<Scalars['String']['output']>;
  read_at?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  /** 通知类型 */
  type: NotificationType;
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/**
 * 通知扩展数据
 * 根据通知类型包含不同字段：
 * - LIKE: 点赞通知，包含点赞者信息、评论内容、影片信息
 * - COMMENT: 评论/回复通知，包含反馈信息、回复内容
 */
export type NotificationData = {
  __typename?: 'NotificationData';
  /** 评论内容 */
  comment_content?: Maybe<Scalars['String']['output']>;
  /** 评论ID */
  comment_id?: Maybe<Scalars['ID']['output']>;
  /** 反馈内容（反馈回复通知） */
  feedback_content?: Maybe<Scalars['String']['output']>;
  /** 反馈ID（反馈回复通知） */
  feedback_id?: Maybe<Scalars['ID']['output']>;
  /** 反馈类型名称（反馈回复通知） */
  feedback_type?: Maybe<Scalars['String']['output']>;
  /** 点赞者头像 */
  liker_avatar?: Maybe<Scalars['String']['output']>;
  /** 点赞者ID */
  liker_id?: Maybe<Scalars['ID']['output']>;
  /** 点赞者名称 */
  liker_name?: Maybe<Scalars['String']['output']>;
  /** 影片封面（点赞通知） */
  movie_cover?: Maybe<Scalars['String']['output']>;
  /** 影片ID（点赞通知） */
  movie_id?: Maybe<Scalars['ID']['output']>;
  /** 影片标题（点赞通知） */
  movie_title?: Maybe<Scalars['String']['output']>;
  /** 回复者ID（反馈回复通知） */
  replier_id?: Maybe<Scalars['ID']['output']>;
  /** 回复者名称（反馈回复通知） */
  replier_name?: Maybe<Scalars['String']['output']>;
  /** 回复内容（反馈回复通知） */
  reply_content?: Maybe<Scalars['String']['output']>;
  /** 回复ID（反馈回复通知） */
  reply_id?: Maybe<Scalars['ID']['output']>;
};

/** A paginated list of Notification items. */
export type NotificationPaginator = {
  __typename?: 'NotificationPaginator';
  /** A list of Notification items. */
  data: Array<Notification>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 通知类型 */
export enum NotificationType {
  /** 评论通知 */
  Comment = 'COMMENT',
  /** 点赞通知 */
  Like = 'LIKE',
  /** 系统通知 */
  System = 'SYSTEM',
  /** 更新通知 */
  Update = 'UPDATE'
}

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

/** 设备/App平台 */
export enum Platform {
  /** Android */
  Android = 'ANDROID',
  /** H5/Web */
  H5 = 'H5',
  /** iOS */
  Ios = 'IOS'
}

/** 播放线路 */
export type PlayLine = {
  __typename?: 'PlayLine';
  created_at: Scalars['DateTime']['output'];
  episode: Episode;
  episode_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  is_active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  quality?: Maybe<Scalars['String']['output']>;
  sort: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** 查询单个明星 */
  actor?: Maybe<Actor>;
  /** 分页查询明星列表 */
  actors: ActorPaginator;
  /** 查询广告列表（按排序，仅上架状态） */
  advertisements: Array<Advertisement>;
  /** 分页查询影片系列列表 */
  allMovieSeries: MovieSeriesPaginator;
  /** 获取所有App版本 */
  appVersions: Array<AppVersion>;
  /** 查询单个轮播图 */
  banner?: Maybe<Banner>;
  /** 查询轮播图列表 */
  banners: Array<Banner>;
  /** 查询所有分类 */
  categories: Array<Category>;
  /** 查询单个分类 */
  category?: Maybe<Category>;
  /** 获取分类首页数据（banners + grids + channels） */
  categoryHome: CategoryHome;
  /** 查询单个栏目 */
  channel?: Maybe<Channel>;
  /** 根据分类ID查询栏目（分页，仅返回非宫格栏目） */
  channelsByCategory: ChannelPaginator;
  /** 检查更新（从请求header中获取platform和build） */
  checkUpdate: CheckUpdateResult;
  /** 查询单个评论 */
  comment?: Maybe<Comment>;
  /** 查询一级评论的子评论列表 */
  commentReplies: CommentPaginator;
  /** 查询单个剧集 */
  episode?: Maybe<Episode>;
  /** 根据影片ID查询所有剧集 */
  episodesByMovie: Array<Episode>;
  /** 查询单个反馈详情 */
  feedback?: Maybe<Feedback>;
  /** 查询反馈评论列表（不分页） */
  feedbackComments: Array<Comment>;
  /** 获取反馈类型列表（仅启用的，按排序） */
  feedbackTypes: Array<FeedbackType>;
  /** 获取游戏分类列表 */
  gameCategories: Array<GameCategoryInfo>;
  /** 根据分类获取游戏列表（分页） */
  games: GamePaginator;
  /** 查询单个类型 */
  genre?: Maybe<Genre>;
  /** 查询所有类型 */
  genres: Array<Genre>;
  /** 获取热门搜索关键词列表（仅启用的，按排序） */
  hotKeywords: Array<HotKeyword>;
  /** 热门影片列表（按播放量排序） */
  hotMovies: MoviePaginator;
  /** 获取最新App版本 */
  latestAppVersion?: Maybe<AppVersion>;
  /** 获取走马灯公告列表 */
  marqueeNotices: Array<Scalars['String']['output']>;
  /** 获取当前登录用户 */
  me?: Maybe<User>;
  /** 查询单个影片（自动记录浏览量） */
  movie?: Maybe<Movie>;
  /** 分页查询影片评论列表 */
  movieComments: CommentPaginator;
  /** 获取影片筛选选项（带缓存） */
  movieFilters: MovieFilters;
  /** 查询单个影片系列 */
  movieSeries?: Maybe<MovieSeries>;
  /** 分页查询影片列表（带筛选和排序） */
  movies: MoviePaginator;
  /** 查询明星参演的影片列表（分页） */
  moviesByActor: MoviePaginator;
  /** 查询栏目下的影片列表（分页，按后台配置顺序） */
  moviesByChannel: MoviePaginator;
  /** 查询专题下的影片列表（分页，按后台配置顺序） */
  moviesByTopic: MoviePaginator;
  /** 获取当前用户收藏列表 */
  myFavorites: FavoritePaginator;
  /** 获取当前用户反馈列表 */
  myFeedbacks: FeedbackPaginator;
  /** 获取我的邀请码（没有则自动创建） */
  myInvitationCode: InvitationCode;
  /** 获取我的邀请记录列表 */
  myInvitationRecords: InvitationRecordPaginator;
  /** 获取我被邀请的记录（如果有） */
  myInviter?: Maybe<InvitationRecord>;
  /** 获取当前用户求片列表 */
  myMovieRequests: MovieRequestPaginator;
  /** 获取当前用户通知列表 */
  myNotifications: NotificationPaginator;
  /** 获取当前用户预约列表（可按状态筛选：UPCOMING=即将上映, RELEASED=已上映） */
  myReservations: ReservationPaginator;
  /** 获取当前用户搜索历史（最多10条，按时间倒序） */
  mySearchHistories: Array<SearchHistory>;
  /** 获取当前用户订阅列表 */
  mySubscriptions: MovieSubscriptionPaginator;
  /** 获取当前用户观看历史 */
  myWatchHistories: WatchHistoryPaginator;
  /** 猜你喜欢（基于影片的类型、地区推荐相似影片） */
  recommendedMovies: MoviePaginator;
  /** 已上映影片（今天及之前），按日期降序分页 */
  releasedMovies: MoviesByDatePaginator;
  /** 搜索（影片或演职人员） */
  search: SearchResult;
  /** 获取单个系统配置 */
  setting?: Maybe<Setting>;
  /** 获取所有系统配置 */
  settings: Array<Setting>;
  /** 分页查询专题分组 */
  topicGroups: TopicGroupPaginator;
  /** 分页查询专题列表 */
  topics: TopicPaginator;
  /** 获取未读通知数量 */
  unreadNotificationCount?: Maybe<Scalars['Int']['output']>;
  /** 即将上映影片（明天及之后），按日期升序分页 */
  upcomingMovies: MoviesByDatePaginator;
  /** 查询单个用户 */
  user?: Maybe<User>;
};


export type QueryActorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryActorsArgs = {
  area?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  gender?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdvertisementsArgs = {
  type?: InputMaybe<AdvertisementType>;
};


export type QueryAllMovieSeriesArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAppVersionsArgs = {
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBannerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBannersArgs = {
  category_id?: InputMaybe<Scalars['ID']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoryHomeArgs = {
  category_id: Scalars['ID']['input'];
};


export type QueryChannelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChannelsByCategoryArgs = {
  category_id: Scalars['ID']['input'];
  first?: Scalars['Int']['input'];
  is_grid?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentRepliesArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  parent_id: Scalars['ID']['input'];
};


export type QueryEpisodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEpisodesByMovieArgs = {
  movie_id: Scalars['ID']['input'];
};


export type QueryFeedbackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeedbackCommentsArgs = {
  feedback_id: Scalars['ID']['input'];
};


export type QueryGamesArgs = {
  category: GameCategory;
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGenreArgs = {
  id: Scalars['ID']['input'];
};


export type QueryHotMoviesArgs = {
  category_id?: InputMaybe<Scalars['ID']['input']>;
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLatestAppVersionArgs = {
  platform: Scalars['String']['input'];
};


export type QueryMovieArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMovieCommentsArgs = {
  first?: Scalars['Int']['input'];
  movie_id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMovieSeriesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMoviesArgs = {
  area?: InputMaybe<Scalars['String']['input']>;
  category_id?: InputMaybe<Scalars['ID']['input']>;
  first?: Scalars['Int']['input'];
  genre_id?: InputMaybe<Scalars['ID']['input']>;
  order_by?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMoviesByActorArgs = {
  actor_id: Scalars['ID']['input'];
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMoviesByChannelArgs = {
  channel_id: Scalars['ID']['input'];
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMoviesByTopicArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  topic_id: Scalars['ID']['input'];
};


export type QueryMyFavoritesArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyFeedbacksArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyInvitationRecordsArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyMovieRequestsArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyNotificationsArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMyReservationsArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ReservationStatus>;
};


export type QueryMySubscriptionsArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyWatchHistoriesArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecommendedMoviesArgs = {
  first?: Scalars['Int']['input'];
  movie_id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReleasedMoviesArgs = {
  category_id?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  keyword: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  type: SearchType;
};


export type QuerySettingArgs = {
  key: Scalars['String']['input'];
};


export type QuerySettingsArgs = {
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryTopicGroupsArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTopicsArgs = {
  first?: Scalars['Int']['input'];
  group_id?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUpcomingMoviesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

/** 注册输入 */
export type RegisterInput = {
  /** 账号（手机号或邮箱） */
  account: Scalars['String']['input'];
  /** 密码 */
  password: Scalars['String']['input'];
};

/** 举报 */
export type Report = {
  __typename?: 'Report';
  admin_remark?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  handled_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  /** 举报原因 */
  reason: ReportReason;
  reportable_id: Scalars['ID']['output'];
  /** 举报目标类型 */
  reportable_type: ReportableType;
  /** 状态：0=待处理, 1=已处理, 2=已忽略 */
  status: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** 举报原因 */
export enum ReportReason {
  /** 其他 */
  Other = 'OTHER',
  /** 色情内容 */
  Porn = 'PORN',
  /** 垃圾广告 */
  Spam = 'SPAM',
  /** 暴力内容 */
  Violence = 'VIOLENCE'
}

/** 举报目标类型 */
export enum ReportableType {
  /** 评论 */
  Comment = 'COMMENT',
  /** 剧集 */
  Episode = 'EPISODE',
  /** 影片 */
  Movie = 'MOVIE'
}

/** 预约 */
export type Reservation = {
  __typename?: 'Reservation';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** A paginated list of Reservation items. */
export type ReservationPaginator = {
  __typename?: 'ReservationPaginator';
  /** A list of Reservation items. */
  data: Array<Reservation>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** 预约列表筛选状态 */
export enum ReservationStatus {
  /** 已上映（available_at <= 今天） */
  Released = 'RELEASED',
  /** 即将上映（available_at > 今天） */
  Upcoming = 'UPCOMING'
}

/** 搜索历史 */
export type SearchHistory = {
  __typename?: 'SearchHistory';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  keyword: Scalars['String']['output'];
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['ID']['output']>;
};

/** 搜索结果 */
export type SearchResult = {
  __typename?: 'SearchResult';
  /** 演职人员列表（type=ACTOR时返回） */
  actors?: Maybe<Array<Actor>>;
  /** 影片列表（type=MOVIE时返回） */
  movies?: Maybe<Array<Movie>>;
  /** 分页信息 */
  paginatorInfo: PaginatorInfo;
};

/** 搜索类型 */
export enum SearchType {
  /** 搜索演职人员（根据名称） */
  Actor = 'ACTOR',
  /** 搜索影片（根据影片名、类型、演职人员） */
  Movie = 'MOVIE'
}

/** 系统配置 */
export type Setting = {
  __typename?: 'Setting';
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** 配置分组 */
  group: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** 配置键 */
  key: Scalars['String']['output'];
  /** 值类型：string/integer/boolean/json */
  type: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  /** 配置值 */
  value?: Maybe<Scalars['String']['output']>;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** 专题 */
export type Topic = {
  __typename?: 'Topic';
  cover?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  group?: Maybe<TopicGroup>;
  group_id?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  movie_count: Scalars['Int']['output'];
  movies: Array<Movie>;
  name: Scalars['String']['output'];
  sort: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** 专题分组 */
export type TopicGroup = {
  __typename?: 'TopicGroup';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sort: Scalars['Int']['output'];
  /** 专题列表（可指定数量，默认10个） */
  topics: TopicPaginator;
  updated_at: Scalars['DateTime']['output'];
};


/** 专题分组 */
export type TopicGroupTopicsArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** A paginated list of TopicGroup items. */
export type TopicGroupPaginator = {
  __typename?: 'TopicGroupPaginator';
  /** A list of TopicGroup items. */
  data: Array<TopicGroup>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** A paginated list of Topic items. */
export type TopicPaginator = {
  __typename?: 'TopicPaginator';
  /** A list of Topic items. */
  data: Array<Topic>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

/** 用户 */
export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  comments: Array<Comment>;
  created_at: Scalars['DateTime']['output'];
  devices: Array<UserDevice>;
  email?: Maybe<Scalars['String']['output']>;
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  favorites: Array<Favorite>;
  /** 性别：0=未知, 1=男, 2=女 */
  gender: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** 是否为游客账号 */
  is_guest: Scalars['Boolean']['output'];
  last_login_at?: Maybe<Scalars['DateTime']['output']>;
  last_login_ip?: Maybe<Scalars['String']['output']>;
  movieRequests: Array<MovieRequest>;
  name: Scalars['String']['output'];
  nickname?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  phone_verified_at?: Maybe<Scalars['DateTime']['output']>;
  subscriptions: Array<MovieSubscription>;
  updated_at: Scalars['DateTime']['output'];
  watchHistories: Array<WatchHistory>;
};

/** 用户设备 */
export type UserDevice = {
  __typename?: 'UserDevice';
  app_version?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  device_id: Scalars['String']['output'];
  device_name?: Maybe<Scalars['String']['output']>;
  /** 设备类型：ios/android/web */
  device_type: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ip?: Maybe<Scalars['String']['output']>;
  last_active_at?: Maybe<Scalars['DateTime']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  os_version?: Maybe<Scalars['String']['output']>;
  push_token?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

/** 用户角色 */
export enum UserRole {
  /** 管理员 */
  Admin = 'ADMIN',
  /** 超级管理员 */
  SuperAdmin = 'SUPER_ADMIN',
  /** 普通用户 */
  User = 'USER'
}

/** 观看历史 */
export type WatchHistory = {
  __typename?: 'WatchHistory';
  created_at: Scalars['DateTime']['output'];
  /** 该集总时长（秒） */
  duration: Scalars['Int']['output'];
  episode: Episode;
  episode_id: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  movie: Movie;
  movie_id: Scalars['ID']['output'];
  /** 播放进度（秒） */
  progress: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
  watched_at: Scalars['DateTime']['output'];
};

export type WatchHistoryInput = {
  /** 视频总时长（秒），由前端提供 */
  duration: Scalars['Int']['input'];
  episode_id: Scalars['ID']['input'];
  movie_id: Scalars['ID']['input'];
  /** 当前播放进度（秒） */
  progress: Scalars['Int']['input'];
};

/** A paginated list of WatchHistory items. */
export type WatchHistoryPaginator = {
  __typename?: 'WatchHistoryPaginator';
  /** A list of WatchHistory items. */
  data: Array<WatchHistory>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type ActorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ActorQuery = { __typename?: 'Query', actor?: { __typename?: 'Actor', id: string, name: string, original_name?: string | null, avatar?: string | null, description?: string | null, area?: string | null, birthday?: string | null, gender: number, statistics?: { __typename?: 'ActorStatistics', movie_count: number, view_count: number } | null } | null };

export type ActorsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type ActorsQuery = { __typename?: 'Query', actors: { __typename?: 'ActorPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Actor', id: string, name: string, avatar?: string | null, description?: string | null, area?: string | null, statistics?: { __typename?: 'ActorStatistics', movie_count: number } | null }> } };

export type AddFavoriteMutationVariables = Exact<{
  movieId: Scalars['ID']['input'];
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', addFavorite?: { __typename?: 'Favorite', id: string, movie_id: string, created_at: string } | null };

export type AddReservationMutationVariables = Exact<{
  movie_id: Scalars['ID']['input'];
}>;


export type AddReservationMutation = { __typename?: 'Mutation', addReservation?: { __typename?: 'Reservation', id: string, movie_id: string, created_at: string, movie: { __typename?: 'Movie', id: string, title: string, cover?: string | null, release_date?: string | null, status: number } } | null };

export type AddSearchHistoryMutationVariables = Exact<{
  keyword: Scalars['String']['input'];
}>;


export type AddSearchHistoryMutation = { __typename?: 'Mutation', addSearchHistory?: { __typename?: 'SearchHistory', id: string, keyword: string, created_at: string } | null };

export type AddSubscriptionMutationVariables = Exact<{
  movieId: Scalars['ID']['input'];
  notifyUpdate?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AddSubscriptionMutation = { __typename?: 'Mutation', addSubscription?: { __typename?: 'MovieSubscription', id: string, movie_id: string, notify_update: boolean, created_at: string } | null };

export type AddWatchHistoryMutationVariables = Exact<{
  input: WatchHistoryInput;
}>;


export type AddWatchHistoryMutation = { __typename?: 'Mutation', addWatchHistory?: { __typename?: 'WatchHistory', id: string, progress: number, duration: number, watched_at: string, episode: { __typename?: 'Episode', id: string, episode_number: number }, movie: { __typename?: 'Movie', id: string, title: string, cover?: string | null } } | null };

export type AdvertisementsQueryVariables = Exact<{
  type?: InputMaybe<AdvertisementType>;
}>;


export type AdvertisementsQuery = { __typename?: 'Query', advertisements: Array<{ __typename?: 'Advertisement', id: string, name?: string | null, image?: string | null, link?: string | null, type: AdvertisementType }> };

export type BindInvitationCodeMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type BindInvitationCodeMutation = { __typename?: 'Mutation', bindInvitationCode: { __typename?: 'BindInvitationCodePayload', success: boolean, message?: string | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type CategoryHomeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  movieFirst: Scalars['Int']['input'];
}>;


export type CategoryHomeQuery = { __typename?: 'Query', categoryHome: { __typename?: 'CategoryHome', banners: Array<{ __typename?: 'Banner', cover: string, title: string, subtitle?: string | null, link_type: string, link_url?: string | null, link_id?: string | null }>, channels: Array<{ __typename?: 'Channel', id: string, name: string, cover?: string | null, icon?: string | null, background_image?: string | null, description?: string | null, movies: { __typename?: 'MoviePaginator', data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, current_episode: number, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } }>, grids: Array<{ __typename?: 'Channel', id: string, name: string, cover?: string | null, icon?: string | null, background_image?: string | null, grid_icon?: string | null, description?: string | null, link_type: string, link_url?: string | null }>, hotMovies: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, current_episode: number, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type ChannelsByCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  movieFirst?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ChannelsByCategoryQuery = { __typename?: 'Query', channelsByCategory: { __typename?: 'ChannelPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', total: number, hasMorePages: boolean }, data: Array<{ __typename?: 'Channel', id: string, name: string, cover?: string | null, icon?: string | null, background_image?: string | null, description?: string | null, movies: { __typename?: 'MoviePaginator', data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, current_episode: number, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } }> } };

export type CheckUpdateQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckUpdateQuery = { __typename?: 'Query', checkUpdate: { __typename?: 'CheckUpdateResult', has_update: boolean, force_update: boolean, latest_version?: { __typename?: 'AppVersion', title: string, description?: string | null, download_url?: string | null, file_size: number, created_at: string } | null } };

export type ClearSearchHistoriesMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearSearchHistoriesMutation = { __typename?: 'Mutation', clearSearchHistories: number };

export type CommentRepliesQueryVariables = Exact<{
  parentId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type CommentRepliesQuery = { __typename?: 'Query', commentReplies: { __typename?: 'CommentPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean, total: number }, data: Array<{ __typename?: 'Comment', id: string, content: string, liked: boolean, created_at: string, statistics?: { __typename?: 'CommentStatistics', like_count: number } | null, user: { __typename?: 'User', id: string, name: string, avatar?: string | null, gender: number }, replyToComment?: { __typename?: 'Comment', id: string, user: { __typename?: 'User', id: string, name: string } } | null }> } };

export type CreateFeedbackMutationVariables = Exact<{
  input: CreateFeedbackInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback?: { __typename?: 'Feedback', id: string, content: string, status: number, created_at: string, feedbackType?: { __typename?: 'FeedbackType', id: string, name: string } | null } | null };

export type CreateFeedbackCommentMutationVariables = Exact<{
  input: CreateFeedbackCommentInput;
}>;


export type CreateFeedbackCommentMutation = { __typename?: 'Mutation', createFeedbackComment?: { __typename?: 'Comment', id: string, content: string, created_at: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } } | null };

export type CreateMovieCommentMutationVariables = Exact<{
  input: CreateMovieCommentInput;
}>;


export type CreateMovieCommentMutation = { __typename?: 'Mutation', createMovieComment?: { __typename?: 'Comment', id: string, content: string, liked: boolean, created_at: string, statistics?: { __typename?: 'CommentStatistics', like_count: number } | null, user: { __typename?: 'User', id: string, name: string, avatar?: string | null, gender: number }, replyToComment?: { __typename?: 'Comment', id: string, user: { __typename?: 'User', id: string, name: string } } | null } | null };

export type CreateReportMutationVariables = Exact<{
  input: CreateReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport?: { __typename?: 'Report', id: string, reportable_type: ReportableType, reportable_id: string, reason: ReportReason, description?: string | null, status: number, created_at: string } | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'Comment', id: string } | null };

export type FeedbackQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FeedbackQuery = { __typename?: 'Query', feedback?: { __typename?: 'Feedback', id: string, content: string, status: number, created_at: string, feedbackType?: { __typename?: 'FeedbackType', id: string, name: string } | null, images: Array<{ __typename?: 'Asset', id: string, url: string }>, video?: { __typename?: 'Asset', id: string, url: string } | null, comments: Array<{ __typename?: 'Comment', id: string, content: string, created_at: string, user: { __typename?: 'User', id: string, nickname?: string | null, avatar?: string | null } }> } | null };

export type FeedbackCommentsQueryVariables = Exact<{
  feedbackId: Scalars['ID']['input'];
}>;


export type FeedbackCommentsQuery = { __typename?: 'Query', feedbackComments: Array<{ __typename?: 'Comment', id: string, content: string, created_at: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> };

export type FeedbackTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedbackTypesQuery = { __typename?: 'Query', feedbackTypes: Array<{ __typename?: 'FeedbackType', id: string, name: string }> };

export type GameBannersQueryVariables = Exact<{ [key: string]: never; }>;


export type GameBannersQuery = { __typename?: 'Query', banners: Array<{ __typename?: 'Banner', id: string, title: string, subtitle?: string | null, cover: string, link_type: string, link_id?: string | null, link_url?: string | null }> };

export type GameCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GameCategoriesQuery = { __typename?: 'Query', gameCategories: Array<{ __typename?: 'GameCategoryInfo', category: GameCategory, name: string }> };

export type GamesQueryVariables = Exact<{
  category: GameCategory;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GamesQuery = { __typename?: 'Query', games: { __typename?: 'GamePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean, total: number }, data: Array<{ __typename?: 'Game', id: string, title: string, subtitle?: string | null, image: string, link: string }> } };

export type HotKeywordsQueryVariables = Exact<{ [key: string]: never; }>;


export type HotKeywordsQuery = { __typename?: 'Query', hotKeywords: Array<{ __typename?: 'HotKeyword', id: string, keyword: string, type: HotKeywordType, link_id?: string | null }> };

export type HotMoviesQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type HotMoviesQuery = { __typename?: 'Query', hotMovies: { __typename?: 'MoviePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, area?: string | null, year?: number | null, current_episode: number, description?: string | null, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type LatestAppVersionQueryVariables = Exact<{
  platform: Scalars['String']['input'];
}>;


export type LatestAppVersionQuery = { __typename?: 'Query', latestAppVersion?: { __typename?: 'AppVersion', id: string, platform: Platform, version: string, version_code: number, title: string, description?: string | null, download_url?: string | null, file_size: number, force_update: boolean } | null };

export type LikeCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type LikeCommentMutation = { __typename?: 'Mutation', likeComment?: { __typename?: 'CommentLike', user_id: string, comment_id: string, created_at: string } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string, nickname?: string | null, avatar?: string | null, gender: number, bio?: string | null, phone?: string | null, email?: string | null, is_guest: boolean } } };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead?: boolean | null };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead?: { __typename?: 'Notification', id: string } | null };

export type MarqueeNoticesQueryVariables = Exact<{ [key: string]: never; }>;


export type MarqueeNoticesQuery = { __typename?: 'Query', marqueeNotices: Array<string> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, nickname?: string | null, avatar?: string | null, gender: number, bio?: string | null, phone?: string | null, email?: string | null, is_guest: boolean } | null };

export type MovieCommentsQueryVariables = Exact<{
  movieId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type MovieCommentsQuery = { __typename?: 'Query', movieComments: { __typename?: 'CommentPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean, total: number }, data: Array<{ __typename?: 'Comment', id: string, content: string, liked: boolean, created_at: string, statistics?: { __typename?: 'CommentStatistics', like_count: number } | null, user: { __typename?: 'User', id: string, name: string, avatar?: string | null, gender: number }, children: { __typename?: 'CommentPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean, total: number }, data: Array<{ __typename?: 'Comment', id: string, content: string, liked: boolean, created_at: string, statistics?: { __typename?: 'CommentStatistics', like_count: number } | null, user: { __typename?: 'User', id: string, name: string, avatar?: string | null, gender: number }, replyToComment?: { __typename?: 'Comment', id: string, user: { __typename?: 'User', id: string, name: string } } | null }> } }> } };

export type MovieDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  recommendMoviesPage?: InputMaybe<Scalars['Int']['input']>;
  recommendMoviesFirst: Scalars['Int']['input'];
}>;


export type MovieDetailQuery = { __typename?: 'Query', movie?: { __typename?: 'Movie', id: string, title: string, cover?: string | null, description?: string | null, score: number, year?: number | null, area?: string | null, quality?: string | null, status: number, total_episodes: number, current_episode: number, isFavorited: boolean, isSubscribed: boolean, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number, favorite_count: number } | null, credits: Array<{ __typename?: 'MovieCredit', role: CreditRole, character?: string | null, actor: { __typename?: 'Actor', id: string, name: string, avatar?: string | null } }>, episodes: Array<{ __typename?: 'Episode', id: string, episode_number: number, title?: string | null, duration: number, playLines: Array<{ __typename?: 'PlayLine', id: string, name: string, url: string, quality?: string | null, sort: number }> }>, lastWatchHistory?: { __typename?: 'WatchHistory', episode_id: string, progress: number, duration: number, episode: { __typename?: 'Episode', episode_number: number } } | null } | null, recommendedMovies: { __typename?: 'MoviePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, hasMorePages: boolean }, data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, current_episode: number, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type MovieFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type MovieFiltersQuery = { __typename?: 'Query', movieFilters: { __typename?: 'MovieFilters', years: Array<number>, areas: Array<string>, genres: Array<{ __typename?: 'Genre', id: string, name: string }> } };

export type CreateMovieRequestMutationVariables = Exact<{
  content: Scalars['String']['input'];
}>;


export type CreateMovieRequestMutation = { __typename?: 'Mutation', createMovieRequest?: { __typename?: 'MovieRequest', id: string, content: string, status: number, admin_reply?: string | null, created_at: string } | null };

export type MoviesQueryVariables = Exact<{
  area?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
  genreId?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MoviesQuery = { __typename?: 'Query', movies: { __typename?: 'MoviePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, area?: string | null, year?: number | null, current_episode: number, description?: string | null, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type MoviesByActorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type MoviesByActorQuery = { __typename?: 'Query', moviesByActor: { __typename?: 'MoviePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, area?: string | null, year?: number | null, current_episode: number, description?: string | null, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type MoviesByChannelQueryVariables = Exact<{
  channelId: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MoviesByChannelQuery = { __typename?: 'Query', moviesByChannel: { __typename?: 'MoviePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, area?: string | null, year?: number | null, current_episode: number, description?: string | null, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type MoviesByTopicQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type MoviesByTopicQuery = { __typename?: 'Query', moviesByTopic: { __typename?: 'MoviePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, area?: string | null, year?: number | null, current_episode: number, description?: string | null, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type MyFavoritesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type MyFavoritesQuery = { __typename?: 'Query', myFavorites: { __typename?: 'FavoritePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Favorite', id: string, movie: { __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, area?: string | null, year?: number | null, current_episode: number, description?: string | null, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null } }> } };

export type MyFeedbacksQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  status?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MyFeedbacksQuery = { __typename?: 'Query', myFeedbacks: { __typename?: 'FeedbackPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Feedback', id: string, content: string, status: number, created_at: string, feedbackType?: { __typename?: 'FeedbackType', id: string, name: string } | null, images: Array<{ __typename?: 'Asset', id: string, url: string }>, video?: { __typename?: 'Asset', id: string, url: string } | null, comments: Array<{ __typename?: 'Comment', id: string, content: string, created_at: string, user: { __typename?: 'User', id: string, nickname?: string | null, avatar?: string | null } }> }> } };

export type MyInvitationCodeQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInvitationCodeQuery = { __typename?: 'Query', myInvitationCode: { __typename?: 'InvitationCode', id: string, code: string, used_count: number } };

export type MyInvitationRecordsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MyInvitationRecordsQuery = { __typename?: 'Query', myInvitationRecords: { __typename?: 'InvitationRecordPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, total: number }, data: Array<{ __typename?: 'InvitationRecord', id: string, invitee_id: string, created_at: string, invitee: { __typename?: 'User', id: string, name: string, nickname?: string | null, avatar?: string | null } }> } };

export type MyInviterQueryVariables = Exact<{ [key: string]: never; }>;


export type MyInviterQuery = { __typename?: 'Query', myInviter?: { __typename?: 'InvitationRecord', id: string, created_at: string, inviter: { __typename?: 'User', id: string, name: string, nickname?: string | null, avatar?: string | null } } | null };

export type MyNotificationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type MyNotificationsQuery = { __typename?: 'Query', myNotifications: { __typename?: 'NotificationPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Notification', id: string, title: string, content?: string | null, created_at: string, notifiable_id?: string | null, notifiable_type?: string | null, type: NotificationType, read_at?: string | null, data?: { __typename?: 'NotificationData', liker_id?: string | null, liker_name?: string | null, liker_avatar?: string | null, comment_id?: string | null, comment_content?: string | null, movie_id?: string | null, movie_title?: string | null, movie_cover?: string | null, feedback_id?: string | null, feedback_content?: string | null, feedback_type?: string | null, reply_id?: string | null, reply_content?: string | null, replier_id?: string | null, replier_name?: string | null } | null }> } };

export type MyReservationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  status?: InputMaybe<ReservationStatus>;
}>;


export type MyReservationsQuery = { __typename?: 'Query', myReservations: { __typename?: 'ReservationPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, hasMorePages: boolean, total: number }, data: Array<{ __typename?: 'Reservation', id: string, movie_id: string, created_at: string, movie: { __typename?: 'Movie', id: string, title: string, cover?: string | null, release_date?: string | null, status: number } }> } };

export type MySearchHistoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MySearchHistoriesQuery = { __typename?: 'Query', mySearchHistories: Array<{ __typename?: 'SearchHistory', id: string, keyword: string, created_at: string }> };

export type MySubscriptionsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type MySubscriptionsQuery = { __typename?: 'Query', mySubscriptions: { __typename?: 'MovieSubscriptionPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'MovieSubscription', id: string, movie: { __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, area?: string | null, year?: number | null, current_episode: number, description?: string | null, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null } }> } };

export type MyWatchHistoriesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type MyWatchHistoriesQuery = { __typename?: 'Query', myWatchHistories: { __typename?: 'WatchHistoryPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'WatchHistory', id: string, progress: number, duration: number, watched_at: string, episode: { __typename?: 'Episode', id: string, episode_number: number }, movie: { __typename?: 'Movie', id: string, title: string, cover?: string | null, status: number, current_episode: number, total_episodes: number } }> } };

export type RecommendedMoviesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type RecommendedMoviesQuery = { __typename?: 'Query', recommendedMovies: { __typename?: 'MoviePaginator', paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, hasMorePages: boolean }, data: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, current_episode: number, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> } };

export type RecordActorViewMutationVariables = Exact<{
  actor_id: Scalars['ID']['input'];
}>;


export type RecordActorViewMutation = { __typename?: 'Mutation', recordActorView: boolean };

export type RecordEpisodePlayMutationVariables = Exact<{
  episode_id: Scalars['ID']['input'];
}>;


export type RecordEpisodePlayMutation = { __typename?: 'Mutation', recordEpisodePlay: boolean };

export type RecordMovieViewMutationVariables = Exact<{
  movie_id: Scalars['ID']['input'];
}>;


export type RecordMovieViewMutation = { __typename?: 'Mutation', recordMovieView: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string, nickname?: string | null, avatar?: string | null, gender: number, bio?: string | null, phone?: string | null, email?: string | null, is_guest: boolean } } };

export type ReleasedMoviesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ReleasedMoviesQuery = { __typename?: 'Query', releasedMovies: { __typename?: 'MoviesByDatePaginator', hasMorePages: boolean, data: Array<{ __typename?: 'MoviesByDate', date: string, count: number, movies: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, current_episode: number, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> }> } };

export type RemoveFavoriteMutationVariables = Exact<{
  movieId: Scalars['ID']['input'];
}>;


export type RemoveFavoriteMutation = { __typename?: 'Mutation', removeFavorite?: boolean | null };

export type RemoveFavoritesMutationVariables = Exact<{
  movie_ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveFavoritesMutation = { __typename?: 'Mutation', removeFavorites: number };

export type RemoveSearchHistoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveSearchHistoryMutation = { __typename?: 'Mutation', removeSearchHistory: boolean };

export type RemoveSubscriptionMutationVariables = Exact<{
  movie_id: Scalars['ID']['input'];
}>;


export type RemoveSubscriptionMutation = { __typename?: 'Mutation', removeSubscription?: boolean | null };

export type RemoveSubscriptionsMutationVariables = Exact<{
  movie_ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveSubscriptionsMutation = { __typename?: 'Mutation', removeSubscriptions: number };

export type RemoveWatchHistoriesMutationVariables = Exact<{
  movie_ids?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type RemoveWatchHistoriesMutation = { __typename?: 'Mutation', removeWatchHistories: number };

export type SearchQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
  type: SearchType;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', movies?: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, description?: string | null, score: number, year?: number | null, area?: string | null, quality?: string | null, total_episodes: number, current_episode: number, status: number, genres: Array<{ __typename?: 'Genre', id: string, name: string }>, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> | null, actors?: Array<{ __typename?: 'Actor', id: string, name: string, avatar?: string | null, area?: string | null, statistics?: { __typename?: 'ActorStatistics', movie_count: number } | null }> | null, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, hasMorePages: boolean, total: number } } };

export type SettingsQueryVariables = Exact<{
  groups?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type SettingsQuery = { __typename?: 'Query', settings: Array<{ __typename?: 'Setting', key: string, value?: string | null }> };

export type TopicGroupsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  topicsFirst: Scalars['Int']['input'];
}>;


export type TopicGroupsQuery = { __typename?: 'Query', topicGroups: { __typename?: 'TopicGroupPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'TopicGroup', id: string, name: string, topics: { __typename?: 'TopicPaginator', data: Array<{ __typename?: 'Topic', id: string, name: string, cover?: string | null, description?: string | null, movie_count: number }> } }> } };

export type TopicsQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type TopicsQuery = { __typename?: 'Query', topics: { __typename?: 'TopicPaginator', paginatorInfo: { __typename?: 'PaginatorInfo', hasMorePages: boolean }, data: Array<{ __typename?: 'Topic', id: string, name: string, cover?: string | null, description?: string | null, movie_count: number }> } };

export type UnlikeCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type UnlikeCommentMutation = { __typename?: 'Mutation', unlikeComment?: boolean | null };

export type UnreadNotificationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UnreadNotificationCountQuery = { __typename?: 'Query', unreadNotificationCount?: number | null };

export type UpcomingMoviesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpcomingMoviesQuery = { __typename?: 'Query', upcomingMovies: { __typename?: 'MoviesByDatePaginator', hasMorePages: boolean, data: Array<{ __typename?: 'MoviesByDate', date: string, count: number, movies: Array<{ __typename?: 'Movie', id: string, title: string, cover?: string | null, score: number, status: number, quality?: string | null, current_episode: number, statistics?: { __typename?: 'MovieStatistics', view_count: number } | null }> }> } };

export type UpdateSubscriptionMutationVariables = Exact<{
  movieId: Scalars['ID']['input'];
  notifyUpdate: Scalars['Boolean']['input'];
}>;


export type UpdateSubscriptionMutation = { __typename?: 'Mutation', updateSubscription?: { __typename?: 'MovieSubscription', id: string, movie_id: string, user_id: string, notify_update: boolean, created_at: string } | null };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  purpose?: InputMaybe<AssetPurpose>;
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'Asset', id: string, url: string, type: AssetType } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, nickname?: string | null, avatar?: string | null, gender: number, bio?: string | null } | null };


export const ActorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Actor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"original_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie_count"}},{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]} as unknown as DocumentNode<ActorQuery, ActorQueryVariables>;
export const ActorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Actors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ActorsQuery, ActorsQueryVariables>;
export const AddFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const AddReservationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReservation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movie_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReservation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movie_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"release_date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<AddReservationMutation, AddReservationMutationVariables>;
export const AddSearchHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSearchHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSearchHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<AddSearchHistoryMutation, AddSearchHistoryMutationVariables>;
export const AddSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notifyUpdate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}},{"kind":"Argument","name":{"kind":"Name","value":"notify_update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notifyUpdate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie_id"}},{"kind":"Field","name":{"kind":"Name","value":"notify_update"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<AddSubscriptionMutation, AddSubscriptionMutationVariables>;
export const AddWatchHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWatchHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WatchHistoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addWatchHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"watched_at"}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episode_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}}]}}]}}]}}]} as unknown as DocumentNode<AddWatchHistoryMutation, AddWatchHistoryMutationVariables>;
export const AdvertisementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Advertisements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdvertisementType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"advertisements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<AdvertisementsQuery, AdvertisementsQueryVariables>;
export const BindInvitationCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BindInvitationCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bindInvitationCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<BindInvitationCodeMutation, BindInvitationCodeMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CategoryHome"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieFirst"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryHome"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"link_type"}},{"kind":"Field","name":{"kind":"Name","value":"link_url"}},{"kind":"Field","name":{"kind":"Name","value":"link_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"background_image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"grids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"background_image"}},{"kind":"Field","name":{"kind":"Name","value":"grid_icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"link_type"}},{"kind":"Field","name":{"kind":"Name","value":"link_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CategoryHomeQuery, CategoryHomeQueryVariables>;
export const ChannelsByCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChannelsByCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieFirst"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"2"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelsByCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"background_image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChannelsByCategoryQuery, ChannelsByCategoryQueryVariables>;
export const CheckUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUpdate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUpdate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"has_update"}},{"kind":"Field","name":{"kind":"Name","value":"force_update"}},{"kind":"Field","name":{"kind":"Name","value":"latest_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"download_url"}},{"kind":"Field","name":{"kind":"Name","value":"file_size"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<CheckUpdateQuery, CheckUpdateQueryVariables>;
export const ClearSearchHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearSearchHistories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearSearchHistories"}}]}}]} as unknown as DocumentNode<ClearSearchHistoriesMutation, ClearSearchHistoriesMutationVariables>;
export const CommentRepliesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommentReplies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentReplies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parent_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyToComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommentRepliesQuery, CommentRepliesQueryVariables>;
export const CreateFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFeedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFeedbackInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFeedbackMutation, CreateFeedbackMutationVariables>;
export const CreateFeedbackCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFeedbackComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFeedbackCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFeedbackComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFeedbackCommentMutation, CreateFeedbackCommentMutationVariables>;
export const CreateMovieCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMovieComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMovieCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMovieComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyToComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMovieCommentMutation, CreateMovieCommentMutationVariables>;
export const CreateReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reportable_type"}},{"kind":"Field","name":{"kind":"Name","value":"reportable_id"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<CreateReportMutation, CreateReportMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const FeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Feedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FeedbackQuery, FeedbackQueryVariables>;
export const FeedbackCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeedbackComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedbackId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedbackComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedback_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedbackId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<FeedbackCommentsQuery, FeedbackCommentsQueryVariables>;
export const FeedbackTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeedbackTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedbackTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FeedbackTypesQuery, FeedbackTypesQueryVariables>;
export const GameBannersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GameBanners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"position"},"value":{"kind":"StringValue","value":"game","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"is_active"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"link_type"}},{"kind":"Field","name":{"kind":"Name","value":"link_id"}},{"kind":"Field","name":{"kind":"Name","value":"link_url"}}]}}]}}]} as unknown as DocumentNode<GameBannersQuery, GameBannersQueryVariables>;
export const GameCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GameCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GameCategoriesQuery, GameCategoriesQueryVariables>;
export const GamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Games"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameCategory"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>;
export const HotKeywordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HotKeywords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotKeywords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"link_id"}}]}}]}}]} as unknown as DocumentNode<HotKeywordsQuery, HotKeywordsQueryVariables>;
export const HotMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HotMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hotMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<HotMoviesQuery, HotMoviesQueryVariables>;
export const LatestAppVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LatestAppVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latestAppVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"version_code"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"download_url"}},{"kind":"Field","name":{"kind":"Name","value":"file_size"}},{"kind":"Field","name":{"kind":"Name","value":"force_update"}}]}}]}}]} as unknown as DocumentNode<LatestAppVersionQuery, LatestAppVersionQueryVariables>;
export const LikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comment_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"comment_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<LikeCommentMutation, LikeCommentMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_guest"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MarkAllNotificationsAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkAllNotificationsAsRead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markAllNotificationsAsRead"}}]}}]} as unknown as DocumentNode<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export const MarkNotificationAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarqueeNoticesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarqueeNotices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marqueeNotices"}}]}}]} as unknown as DocumentNode<MarqueeNoticesQuery, MarqueeNoticesQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_guest"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MovieCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MovieComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movieComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"like_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyToComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MovieCommentsQuery, MovieCommentsQueryVariables>;
export const MovieDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MovieDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recommendMoviesPage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recommendMoviesFirst"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"total_episodes"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}},{"kind":"Field","name":{"kind":"Name","value":"favorite_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"credits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"character"}},{"kind":"Field","name":{"kind":"Name","value":"actor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episode_number"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"playLines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"sort"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isFavorited"}},{"kind":"Field","name":{"kind":"Name","value":"isSubscribed"}},{"kind":"Field","name":{"kind":"Name","value":"lastWatchHistory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode_id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode_number"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recommendedMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recommendMoviesPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recommendMoviesFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MovieDetailQuery, MovieDetailQueryVariables>;
export const MovieFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MovieFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movieFilters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"areas"}}]}}]}}]} as unknown as DocumentNode<MovieFiltersQuery, MovieFiltersQueryVariables>;
export const CreateMovieRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMovieRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMovieRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"admin_reply"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<CreateMovieRequestMutation, CreateMovieRequestMutationVariables>;
export const MoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"area"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"area"},"value":{"kind":"Variable","name":{"kind":"Name","value":"area"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"Argument","name":{"kind":"Name","value":"genre_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genreId"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;
export const MoviesByActorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MoviesByActor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moviesByActor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"actor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoviesByActorQuery, MoviesByActorQueryVariables>;
export const MoviesByChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MoviesByChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moviesByChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"channel_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoviesByChannelQuery, MoviesByChannelQueryVariables>;
export const MoviesByTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MoviesByTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moviesByTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topic_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MoviesByTopicQuery, MoviesByTopicQueryVariables>;
export const MyFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyFavorites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myFavorites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyFavoritesQuery, MyFavoritesQueryVariables>;
export const MyFeedbacksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyFeedbacks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myFeedbacks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"feedbackType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyFeedbacksQuery, MyFeedbacksQueryVariables>;
export const MyInvitationCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyInvitationCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myInvitationCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"used_count"}}]}}]}}]} as unknown as DocumentNode<MyInvitationCodeQuery, MyInvitationCodeQueryVariables>;
export const MyInvitationRecordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyInvitationRecords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myInvitationRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitee_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"invitee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyInvitationRecordsQuery, MyInvitationRecordsQueryVariables>;
export const MyInviterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyInviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myInviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"inviter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<MyInviterQuery, MyInviterQueryVariables>;
export const MyNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"notifiable_id"}},{"kind":"Field","name":{"kind":"Name","value":"notifiable_type"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liker_id"}},{"kind":"Field","name":{"kind":"Name","value":"liker_name"}},{"kind":"Field","name":{"kind":"Name","value":"liker_avatar"}},{"kind":"Field","name":{"kind":"Name","value":"comment_id"}},{"kind":"Field","name":{"kind":"Name","value":"comment_content"}},{"kind":"Field","name":{"kind":"Name","value":"movie_id"}},{"kind":"Field","name":{"kind":"Name","value":"movie_title"}},{"kind":"Field","name":{"kind":"Name","value":"movie_cover"}},{"kind":"Field","name":{"kind":"Name","value":"feedback_id"}},{"kind":"Field","name":{"kind":"Name","value":"feedback_content"}},{"kind":"Field","name":{"kind":"Name","value":"feedback_type"}},{"kind":"Field","name":{"kind":"Name","value":"reply_id"}},{"kind":"Field","name":{"kind":"Name","value":"reply_content"}},{"kind":"Field","name":{"kind":"Name","value":"replier_id"}},{"kind":"Field","name":{"kind":"Name","value":"replier_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"read_at"}}]}}]}}]}}]} as unknown as DocumentNode<MyNotificationsQuery, MyNotificationsQueryVariables>;
export const MyReservationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyReservations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ReservationStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myReservations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"release_date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyReservationsQuery, MyReservationsQueryVariables>;
export const MySearchHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MySearchHistories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mySearchHistories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<MySearchHistoriesQuery, MySearchHistoriesQueryVariables>;
export const MySubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MySubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mySubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MySubscriptionsQuery, MySubscriptionsQueryVariables>;
export const MyWatchHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyWatchHistories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myWatchHistories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"watched_at"}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episode_number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"total_episodes"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyWatchHistoriesQuery, MyWatchHistoriesQueryVariables>;
export const RecommendedMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecommendedMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendedMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"lastPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RecommendedMoviesQuery, RecommendedMoviesQueryVariables>;
export const RecordActorViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecordActorView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"actor_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recordActorView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"actor_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"actor_id"}}}]}]}}]} as unknown as DocumentNode<RecordActorViewMutation, RecordActorViewMutationVariables>;
export const RecordEpisodePlayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecordEpisodePlay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"episode_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recordEpisodePlay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"episode_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"episode_id"}}}]}]}}]} as unknown as DocumentNode<RecordEpisodePlayMutation, RecordEpisodePlayMutationVariables>;
export const RecordMovieViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecordMovieView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movie_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recordMovieView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movie_id"}}}]}]}}]} as unknown as DocumentNode<RecordMovieViewMutation, RecordMovieViewMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_guest"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ReleasedMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ReleasedMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"releasedMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}}]}}]} as unknown as DocumentNode<ReleasedMoviesQuery, ReleasedMoviesQueryVariables>;
export const RemoveFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}}]}]}}]} as unknown as DocumentNode<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;
export const RemoveFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFavorites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movie_ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFavorites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movie_ids"}}}]}]}}]} as unknown as DocumentNode<RemoveFavoritesMutation, RemoveFavoritesMutationVariables>;
export const RemoveSearchHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSearchHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSearchHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveSearchHistoryMutation, RemoveSearchHistoryMutationVariables>;
export const RemoveSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movie_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movie_id"}}}]}]}}]} as unknown as DocumentNode<RemoveSubscriptionMutation, RemoveSubscriptionMutationVariables>;
export const RemoveSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSubscriptions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movie_ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubscriptions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movie_ids"}}}]}]}}]} as unknown as DocumentNode<RemoveSubscriptionsMutation, RemoveSubscriptionsMutationVariables>;
export const RemoveWatchHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveWatchHistories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movie_ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeWatchHistories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movie_ids"}}}]}]}}]} as unknown as DocumentNode<RemoveWatchHistoriesMutation, RemoveWatchHistoriesMutationVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"20"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"total_episodes"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"actors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie_count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const SettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Settings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groups"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"settings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groups"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groups"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SettingsQuery, SettingsQueryVariables>;
export const TopicGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopicGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicsFirst"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topicGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicsFirst"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"movie_count"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TopicGroupsQuery, TopicGroupsQueryVariables>;
export const TopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Topics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"group_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"movie_count"}}]}}]}}]}}]} as unknown as DocumentNode<TopicsQuery, TopicsQueryVariables>;
export const UnlikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comment_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]} as unknown as DocumentNode<UnlikeCommentMutation, UnlikeCommentMutationVariables>;
export const UnreadNotificationCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UnreadNotificationCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unreadNotificationCount"}}]}}]} as unknown as DocumentNode<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>;
export const UpcomingMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpcomingMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upcomingMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"current_episode"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"view_count"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpcomingMoviesQuery, UpcomingMoviesQueryVariables>;
export const UpdateSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notifyUpdate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"movie_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}},{"kind":"Argument","name":{"kind":"Name","value":"notify_update"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notifyUpdate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"movie_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"notify_update"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<UpdateSubscriptionMutation, UpdateSubscriptionMutationVariables>;
export const UploadFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"purpose"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetPurpose"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"purpose"},"value":{"kind":"Variable","name":{"kind":"Name","value":"purpose"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UploadFileMutation, UploadFileMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;