declare module "dplayer" {
  interface DPlayerOptions {
    container: HTMLElement;
    video: {
      url: string;
      type?: string;
    };
    autoplay?: boolean;
    theme?: string;
    lang?: string;
    preload?: "none" | "metadata" | "auto";
    volume?: number;
  }

  interface DPlayerEvents {
    ended: () => void;
  }

  export default class DPlayer {
    constructor(options: DPlayerOptions);
    on(event: keyof DPlayerEvents, callback: DPlayerEvents[keyof DPlayerEvents]): void;
    destroy(): void;
    play(): void;
    pause(): void;
  }
}
