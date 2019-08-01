// @flow
// import {BaseMiddleware, BasePlugin, EngineType, Error, getCapabilities, Utils} from '@playkit-js/playkit-js';
import {
  BaseMiddleware,
  BasePlugin,
  Utils,
  Error,
  FakeEvent,
  EventType,
  Ad,
  AdBreak,
  AdBreakType,
  AudioTrack,
  TextTrack,
  Env
} from '@playkit-js/playkit-js';
import {BumperMiddleware} from './bumper-middleware';
import {BumperState} from './bumper-state';
import {BumperAdsController} from './bumper-ads-controller';
import {BumperEngineDecorator} from './bumper-engine-decorator';
import './assets/style.css';

const BUMPER_CONTAINER_CLASS: string = 'playkit-bumper-container';
const BUMPER_COVER_CLASS: string = 'playkit-bumper-cover';
const BUMPER_CLICK_THROUGH_CLASS: string = 'playkit-bumper-click-through';
const DEFAULT_POSITION: Array<number> = [0, -1];
const TIME_FOR_PRELOAD: number = 3;

/**
 * The bumper plugin.
 * @class Bumper
 * @param {string} name - The plugin name.
 * @param {Player} player - The player instance.
 * @param {Object} config - The plugin config.
 * @implements {IMiddlewareProvider}
 * @implements {IAdsControllerProvider}
 * @implements {IEngineDecoratorProvider}
 * @extends BasePlugin
 */
class Bumper extends BasePlugin implements IMiddlewareProvider, IAdsControllerProvider, IEngineDecoratorProvider {
  /**
   * The default configuration of the plugin.
   * @type {Object}
   * @static
   */
  static defaultConfig: Object = {
    id: '',
    url: '',
    clickThroughUrl: '',
    position: DEFAULT_POSITION,
    disableMediaPreload: false,
    playOnMainVideoTag: false
  };

  /**
   * @static
   * @public
   * @returns {boolean} - Whether the plugin is valid.
   */
  static isValid(): boolean {
    return true;
  }

  _bumperVideoElement: HTMLVideoElement;
  _bumperContainerDiv: HTMLDivElement;
  _bumperCoverDiv: HTMLDivElement;
  _bumperClickThroughDiv: HTMLAnchorElement;
  _bumperCompletedPromise: Promise<void>;
  _adBreak: boolean;
  _adBreakPosition: number;
  _bumperState: string;
  _engine: IEngine;
  _contentSrc: string;
  _contentCurrentTime: number;
  _contentDuration: number;
  _selectedAudioTrack: AudioTrack;
  _selectedTextTrack: TextTrack;
  _selectedPlaybackRate: number;

  /**
   * @constructor
   * @param {string} name - The plugin name.
   * @param {Player} player - The player instance.
   * @param {Object} config - The plugin config.
   */
  constructor(name: string, player: Player, config: Object) {
    super(name, player, config);
    this._initBumperContainer();
    this._initMembers();
    this._addBindings();
  }

  /**
   * Updates the config of the plugin.
   * @param {Object} update - The updated configuration.
   * @public
   * @returns {void}
   */
  updateConfig(update: Object): void {
    super.updateConfig(update);
    this._validatePosition();
  }

  /**
   * Gets the engine decorator.
   * @param {IEngine} engine - The engine to decorate.
   * @public
   * @returns {IEngineDecorator} - The ads api.
   * @instance
   * @memberof Bumper
   */
  getEngineDecorator(engine: IEngine): IEngineDecorator {
    this._engine = engine;
    return new BumperEngineDecorator(engine, this);
  }

  /**
   * Gets the middleware.
   * @public
   * @returns {BumperMiddleware} - The middleware api.
   * @instance
   * @memberof Bumper
   */
  getMiddlewareImpl(): BaseMiddleware {
    return new BumperMiddleware(this);
  }

  /**
   * Gets the ads controller.
   * @public
   * @returns {IAdsPluginController} - The ads api.
   * @instance
   * @memberof Bumper
   */
  getAdsController(): IAdsPluginController {
    return new BumperAdsController(this);
  }

  /**
   * Play/Resume the bumper
   * @public
   * @returns {void}
   * @instance
   * @memberof Bumper
   */
  play(): void {
    this.load();
    this._adBreak = true;
    this._videoElement.play();
    this._hideElement(this._bumperCoverDiv);
  }

  /**
   * Pause the bumper
   * @public
   * @returns {void}
   * @instance
   * @memberof Bumper
   */
  pause(): void {
    this._videoElement.pause();
  }

  /**
   * Bumper completed promise
   * @public
   * @returns {Promise<void>} - bumper completed
   * @instance
   * @memberof Bumper
   */
  complete(): Promise<void> {
    return this._bumperCompletedPromise;
  }

  /**
   * Resets the plugin.
   * @override
   * @public
   * @returns {void}
   * @instance
   * @memberof Bumper
   */
  reset(): void {
    this.eventManager.removeAll();
    this._hideElement(this._bumperContainerDiv);
    this._resetClickThroughElement();
    Utils.Dom.removeAttribute(this._bumperVideoElement, 'src');
    this._initMembers();
    this._addBindings();
  }

  playOnMainVideoTag(): boolean {
    return (
      this.config.playOnMainVideoTag || (Env.os.name === 'iOS' && (this.player.isFullscreen() && !this.player.config.playback.inBrowserFullscreen))
    );
  }

  getContentTime(): number {
    return this._contentCurrentTime;
  }

  getContentDuration(): number {
    return this._contentDuration;
  }

  loadMedia(): void {
    if (this.config.url) {
      this.dispatchEvent(EventType.AD_MANIFEST_LOADED, {adBreaksPosition: this.config.position});
    } else {
      this._state = BumperState.DONE;
      this._bumperCompletedPromise = Promise.resolve();
    }
  }

  onEnded(): void {
    if (this._adBreak) {
      this._state = BumperState.LOADED;
      this._adBreak = false;
      this._hideElement(this._bumperContainerDiv);
      this.dispatchEvent(EventType.AD_COMPLETED);
      this.dispatchEvent(EventType.AD_BREAK_END);
      if (this._adBreakPosition === 0) {
        this._maybeSwitchToContent();
      }
      this._maybeDispatchAdsCompleted();
      this._adBreakPosition = -1;
    }
  }

  onPlayerEnded(): void {
    if (this._bumperState !== BumperState.DONE) {
      this.playOnMainVideoTag() && (this._state = BumperState.IDLE);
      this.initBumperCompletedPromise();
      this.play();
    }
  }

  set _state(newState: string) {
    this.logger.debug(`Change state: ${this._bumperState || 'none'} => ${newState}`);
    this._bumperState = newState;
  }

  get state(): string {
    return this._bumperState;
  }

  get adBreakPosition(): number {
    return this._adBreakPosition;
  }

  isAdPlaying(): boolean {
    return this._adBreak;
  }

  _initBumperContainer(): void {
    this.logger.debug('Init bumper container');
    const playerView = this.player.getView();
    // Create bumper video element
    this._bumperVideoElement = Utils.Dom.createElement('video');
    // Create bumper container
    this._bumperContainerDiv = Utils.Dom.createElement('div');
    this._bumperContainerDiv.id = BUMPER_CONTAINER_CLASS + playerView.id;
    this._bumperContainerDiv.className = BUMPER_CONTAINER_CLASS;
    Utils.Dom.appendChild(this._bumperContainerDiv, this._bumperVideoElement);
    // Append the bumper container to the dom
    Utils.Dom.appendChild(playerView, this._bumperContainerDiv);
    this._initBumperCover();
    this._initBumperClickElement();
  }

  _initBumperCover(): void {
    this._bumperCoverDiv = Utils.Dom.createElement('div');
    this._bumperCoverDiv.className = BUMPER_COVER_CLASS;
    this._bumperCoverDiv.onclick = () => this.play();
    Utils.Dom.appendChild(this._bumperContainerDiv, this._bumperCoverDiv);
  }

  _initBumperClickElement(): void {
    this._bumperClickThroughDiv = Utils.Dom.createElement('a');
    this._bumperClickThroughDiv.className = BUMPER_CLICK_THROUGH_CLASS;
    this._bumperClickThroughDiv.target = '_blank';
    this._bumperClickThroughDiv.onclick = () => {
      this.config.clickThroughUrl && this.dispatchEvent(EventType.AD_CLICKED);
      this.pause();
      this._showElement(this._bumperCoverDiv);
    };
    Utils.Dom.appendChild(this._bumperContainerDiv, this._bumperClickThroughDiv);
  }

  _initMembers(): void {
    this._adBreak = false;
    this._validatePosition();
    this.config.clickThroughUrl && (this._bumperClickThroughDiv.href = this.config.clickThroughUrl);
    this._contentSrc = '';
    this._contentCurrentTime = 0;
    this._contentDuration = NaN;
    this._selectedAudioTrack = null;
    this._selectedTextTrack = null;
    this._selectedPlaybackRate = 1;
    this._state = BumperState.IDLE;
  }

  _validatePosition(): void {
    // position should be [0], [-1] or [0, -1]
    if (!this.config.position || this.config.position.length !== 1 || (this.config.position[0] !== 0 && this.config.position[0] !== -1)) {
      this.config.position = DEFAULT_POSITION;
    }
    this._adBreakPosition = this.config.position[0];
  }

  initBumperCompletedPromise(): void {
    this.logger.debug('Init bumper complete promise');
    this._bumperCompletedPromise = new Promise((resolve, reject) => {
      if (this.playOnMainVideoTag()) {
        if (this._engine) {
          this.eventManager.listenOnce(this._engine, EventType.ENDED, resolve);
          this.eventManager.listenOnce(this._engine, EventType.ERROR, reject);
        } else {
          this.eventManager.listenOnce(this.player, EventType.SOURCE_SELECTED, () => {
            this.eventManager.listenOnce(this._engine, EventType.ENDED, resolve);
            this.eventManager.listenOnce(this._engine, EventType.ERROR, reject);
          });
        }
      }
      this.eventManager.listenOnce(this._bumperVideoElement, EventType.ENDED, resolve);
      this.eventManager.listenOnce(this._bumperVideoElement, EventType.ERROR, reject);
    }).catch(() => {
      // silence the promise rejection, error is handled by the ad error event
    });
  }

  _addBindings(): void {
    this.eventManager.listen(this._bumperVideoElement, EventType.ENDED, () => this.onEnded());
    this.eventManager.listen(this.player, EventType.SOURCE_SELECTED, () => this._onPlayerSourceSelected());
    this.eventManager.listen(this.player, EventType.PLAYBACK_START, () => this._onPlayerPlaybackStart());
    this.eventManager.listen(this.player, EventType.PLAYBACK_ENDED, () => this._onPlayerPlaybackEnded());
    this.eventManager.listen(this.player, EventType.TIME_UPDATE, () => this._onPlayerTimeUpdate());
    this.eventManager.listen(this.player, EventType.VOLUME_CHANGE, () => this._onPlayerVolumeChange());
    this.eventManager.listen(this.player, EventType.MUTE_CHANGE, event => this._onPlayerMuteChange(event));
    this.eventManager.listen(this.player, EventType.EXIT_FULLSCREEN, () => this._onPlayerExitFullscreen());
  }

  _onLoadedData(): void {
    this._state = BumperState.LOADED;
  }

  _onPlaying(): void {
    if (this._adBreak) {
      if (this._bumperState === BumperState.LOADED) {
        this.dispatchEvent(EventType.AD_BREAK_START, {adBreak: this._getAdBreak()});
        this.dispatchEvent(EventType.AD_STARTED, {ad: this._getAd()});
      }
      if (this._bumperState === BumperState.PAUSED) {
        this.dispatchEvent(EventType.AD_RESUMED);
      }
      this._state = BumperState.PLAYING;
      this._showElement(this._bumperContainerDiv);
    }
  }

  _onPause(): void {
    if (this._bumperState === BumperState.PLAYING && !this._videoElement.ended) {
      this._state = BumperState.PAUSED;
      this.dispatchEvent(EventType.AD_PAUSED);
    }
  }

  get _videoElement(): IEngine | HTMLVideoElement {
    return this.playOnMainVideoTag() ? this._engine : this._bumperVideoElement;
  }

  _onTimeUpdate(): void {
    this._adBreak &&
      this.dispatchEvent(EventType.AD_PROGRESS, {
        adProgress: {
          currentTime: this._videoElement.currentTime,
          duration: this._videoElement.duration
        }
      });
  }

  _onError(): void {
    if (this._adBreak || this._bumperState === BumperState.LOADING) {
      this._adBreak = false;
      this._state = BumperState.IDLE;
      this.dispatchEvent(EventType.AD_ERROR, this._getAdError());
      this._maybeDispatchAdsCompleted();
      this._adBreakPosition = -1;
    }
  }

  _onWaiting(): void {
    this._adBreak && this.dispatchEvent(EventType.AD_BUFFERING);
  }

  _onVolumeChange(): void {
    this._adBreak && this.dispatchEvent(EventType.AD_VOLUME_CHANGED);
  }

  _onPlayerSourceSelected(): void {
    this.eventManager.listen(this._videoElement, EventType.PLAYING, () => this._onPlaying());
    this.eventManager.listen(this._videoElement, EventType.PAUSE, () => this._onPause());
    this.eventManager.listen(this._videoElement, EventType.TIME_UPDATE, () => this._onTimeUpdate());
    this.eventManager.listen(this._videoElement, EventType.ERROR, () => this._onError());
    this.eventManager.listen(this._videoElement, EventType.WAITING, () => this._onWaiting());
    this.eventManager.listen(this._videoElement, EventType.VOLUME_CHANGE, () => this._onVolumeChange());
  }

  _onPlayerPlaybackStart(): void {
    this._bumperVideoElement.load();
  }

  _onPlayerPlaybackEnded(): void {
    this._maybeSwitchToContent();
  }

  _onPlayerTimeUpdate(): void {
    if (this.player.currentTime >= this.player.duration - TIME_FOR_PRELOAD && !this.playOnMainVideoTag()) {
      this.load();
    }
  }

  _maybeSwitchToContent(): void {
    if (this._contentSrc && this.player.getVideoElement().src === this.config.url && !this.player.config.playback.playAdsWithMSE) {
      this.logger.debug('Switch source to content url');
      this.eventManager.listenOnce(this._engine, EventType.PLAYING, () => {
        this.player.selectTrack(this._selectedAudioTrack);
        this.player.selectTrack(this._selectedTextTrack);
        this.player.playbackRate = this._selectedPlaybackRate;
      });
      this.player.getVideoElement().src = this._contentSrc;
      this._contentSrc = '';
    }
  }

  _maybeDispatchAdsCompleted(): void {
    if (!this.config.position.includes(-1) || this._adBreakPosition === -1) {
      this._state = BumperState.DONE;
      this.dispatchEvent(EventType.ADS_COMPLETED);
    }
  }

  _onPlayerVolumeChange(): void {
    this._syncPlayerVolume();
  }

  _onPlayerMuteChange(event: FakeEvent): void {
    this._syncPlayerVolume();
    if (this._adBreak) {
      event.payload.mute && this.dispatchEvent(EventType.AD_MUTED);
    }
  }

  _onPlayerExitFullscreen(): void {
    if (this._adBreak && this.player.config.playback.playsinline) {
      this.play();
    }
  }

  _syncPlayerVolume(): void {
    this._bumperVideoElement.volume = this.player.volume;
    this._bumperVideoElement.muted = this.player.muted;
  }

  _showElement(el: ?HTMLElement): void {
    el && (el.style.visibility = 'visible');
  }

  _hideElement(el: ?HTMLElement): void {
    el && (el.style.visibility = 'hidden');
  }

  _resetClickThroughElement(): void {
    Utils.Dom.removeAttribute(this._bumperClickThroughDiv, 'href');
  }

  load(): void {
    if (this._bumperState === BumperState.IDLE) {
      this.dispatchEvent(EventType.AD_LOADED, {ad: this._getAd()});
      this._state = BumperState.LOADING;
      this.eventManager.listenOnce(this._videoElement, EventType.LOADED_DATA, () => this._onLoadedData());
      if (this.playOnMainVideoTag()) {
        this.logger.debug('Switch source to bumper url');
        this._contentSrc = this._engine.src;
        this._contentCurrentTime = this._engine.currentTime;
        this._contentDuration = this._engine.duration;
        this._selectedAudioTrack = this.player.getActiveTracks().audio;
        this._selectedTextTrack = this.player.getActiveTracks().text;
        this._selectedPlaybackRate = this.player.playbackRate;
        this.player.getVideoElement().src = this.config.url;
      } else {
        this._bumperVideoElement.src = this.config.url;
        this._bumperVideoElement.setAttribute('playsinline', '');
      }
    }
  }

  _getAd(): Ad {
    const adOptions: PKAdOptions = {
      system: '',
      url: this.config.url,
      contentType: '',
      title: '',
      position: 1,
      duration: this._videoElement.duration,
      clickThroughUrl: this.config.clickThroughUrl,
      posterUrl: '',
      skipOffset: -1,
      linear: true,
      width: this._bumperVideoElement.videoWidth,
      height: this._bumperVideoElement.videoHeight,
      bitrate: 0,
      bumper: true
    };
    return new Ad(this.config.id, adOptions);
  }

  _getAdBreak(): Ad {
    const type = this._adBreakPosition === 0 ? AdBreakType.PRE : AdBreakType.POST;
    return new AdBreak({type, position: this._adBreakPosition, numAds: 1});
  }

  _getAdError(): Error {
    const severity = Error.Severity.CRITICAL;
    const category = Error.Category.ADS;
    const code = this._bumperVideoElement.error && this._bumperVideoElement.error.code;
    return new Error(severity, category, code, {
      ad: this._getAd(),
      innerError: this._bumperVideoElement.error
    });
  }
}

export {Bumper};
