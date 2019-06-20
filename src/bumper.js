// @flow
// import {BaseMiddleware, BasePlugin, EngineType, Error, getCapabilities, Utils} from '@playkit-js/playkit-js';
import {BaseMiddleware, BasePlugin, Utils, EventType, Ad, AdBreak, AdBreakType, Error, FakeEvent} from '@playkit-js/playkit-js';
import {BumperMiddleware} from './bumper-middleware';
import {BumperState} from './bumper-state';
import {BumperAdsController} from './bumper-ads-controller';
import './assets/style.css';

const BUMPER_CONTAINER_CLASS: string = 'playkit-bumper-container';
const BUMPER_COVER_CLASS: string = 'playkit-bumper-cover';
const BUMPER_CLICK_THROUGH_CLASS: string = 'playkit-bumper-click-through';

/**
 * The bumper plugin.
 * @class Bumper
 * @param {string} name - The plugin name.
 * @param {Player} player - The player instance.
 * @param {Object} config - The plugin config.
 * @implements {IMiddlewareProvider}
 * @implements {IAdsControllerProvider}
 * @extends BasePlugin
 */
class Bumper extends BasePlugin implements IMiddlewareProvider, IAdsControllerProvider {
  /**
   * The default configuration of the plugin.
   * @type {Object}
   * @static
   */
  static defaultConfig: Object = {
    id: '',
    url: '',
    clickThroughUrl: '',
    position: [0, -1],
    disableMediaPreload: false
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
   * @memberof Ima
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
    if (this._bumperState === BumperState.IDLE) {
      this._load();
    }
    this._bumperVideoElement.play();
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
    this._bumperVideoElement.pause();
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

  set _state(newState: string) {
    this.logger.debug(`Change state: ${this._bumperState || 'none'} => ${newState}`);
    this._bumperState = newState;
  }

  get state(): string {
    return this._bumperState;
  }

  get adBreak(): boolean {
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
    this._adBreakPosition = this.config.position.sort((a, b) => b - a)[0];
    this.config.clickThroughUrl && (this._bumperClickThroughDiv.href = this.config.clickThroughUrl);
    this._state = BumperState.IDLE;
    this._initBumperCompletedPromise();
  }

  _initBumperCompletedPromise(): void {
    this._bumperCompletedPromise = new Promise((resolve, reject) => {
      this.eventManager.listenOnce(this._bumperVideoElement, EventType.ENDED, resolve);
      this.eventManager.listenOnce(this._bumperVideoElement, EventType.ERROR, reject);
    }).catch(() => {
      // silence the promise rejection, error is handled by the ad error event
    });
  }

  _addBindings() {
    this.eventManager.listen(this._bumperVideoElement, EventType.LOAD_START, () => this._onLoadStart());
    this.eventManager.listen(this._bumperVideoElement, EventType.LOADED_DATA, () => this._onLoadedData());
    this.eventManager.listen(this._bumperVideoElement, EventType.PLAYING, () => this._onPlaying());
    this.eventManager.listen(this._bumperVideoElement, EventType.PAUSE, () => this._onPause());
    this.eventManager.listen(this._bumperVideoElement, EventType.ENDED, () => this._onEnded());
    this.eventManager.listen(this._bumperVideoElement, EventType.TIME_UPDATE, () => this._onTimeUpdate());
    this.eventManager.listen(this._bumperVideoElement, EventType.ERROR, () => this._onError());
    this.eventManager.listen(this._bumperVideoElement, EventType.WAITING, () => this._onWaiting());
    this.eventManager.listen(this._bumperVideoElement, EventType.VOLUME_CHANGE, () => this._onVolumeChange());
    this.eventManager.listen(this.player, EventType.SOURCE_SELECTED, () => this._onPlayerSourceSelected());
    this.eventManager.listen(this.player, EventType.PLAYBACK_START, () => this._onPlayerPlaybackStart());
    this.eventManager.listen(this.player, EventType.VOLUME_CHANGE, () => this._onPlayerVolumeChange());
    this.eventManager.listen(this.player, EventType.MUTE_CHANGE, event => this._onPlayerMuteChange(event));
  }

  _onLoadStart(): void {
    this._state = BumperState.LOADING;
  }

  _onLoadedData(): void {
    this._state = BumperState.LOADED;
    this.dispatchEvent(EventType.AD_LOADED, {ad: this._getAd()});
  }

  _onPlaying(): void {
    if (this._bumperState === BumperState.LOADED) {
      this.dispatchEvent(EventType.AD_BREAK_START, {adBreak: this._getAdBreak()});
      this.dispatchEvent(EventType.AD_STARTED, {ad: this._getAd()});
      this._adBreak = true;
    }
    if (this._bumperState === BumperState.PAUSED) {
      this.dispatchEvent(EventType.AD_RESUMED);
    }
    this._state = BumperState.PLAYING;
    this._showElement(this._bumperContainerDiv);
  }

  _onPause(): void {
    if (this._bumperState === BumperState.PLAYING) {
      this._state = BumperState.PAUSED;
      this.dispatchEvent(EventType.AD_PAUSED);
    }
  }

  _onEnded(): void {
    this._state = BumperState.LOADED;
    this._adBreak = false;
    this._hideElement(this._bumperContainerDiv);
    this.dispatchEvent(EventType.AD_COMPLETED);
    this.dispatchEvent(EventType.AD_BREAK_END);
    if (!this.config.position.includes(-1) || this._adBreakPosition === -1) {
      this._state = BumperState.DONE;
      this.dispatchEvent(EventType.ADS_COMPLETED);
    }
  }

  _onTimeUpdate(): void {
    this.dispatchEvent(EventType.AD_PROGRESS, {
      adProgress: {
        currentTime: this._bumperVideoElement.currentTime,
        duration: this._bumperVideoElement.duration
      }
    });
  }

  _onError(): void {
    this._state = BumperState.DONE;
    this.dispatchEvent(EventType.AD_ERROR, this._getAdError());
  }

  _onWaiting(): void {
    this.dispatchEvent(EventType.AD_BUFFERING);
  }

  _onVolumeChange(): void {
    if (this._adBreak) {
      this.dispatchEvent(EventType.AD_VOLUME_CHANGED);
    }
  }

  _onPlayerSourceSelected(): void {
    this.dispatchEvent(EventType.AD_MANIFEST_LOADED, {adBreaksPosition: this.config.position});
  }

  _onPlayerPlaybackStart(): void {
    this._bumperVideoElement.load();
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

  _onPlayerEnded(): void {
    if (this._bumperState !== BumperState.DONE) {
      this._adBreakPosition = -1;
      this._initBumperCompletedPromise();
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

  _load(): void {
    this._bumperVideoElement.src = this.config.url;
    this._bumperVideoElement.setAttribute('playsinline', '');
  }

  _getAd(): Ad {
    const adOptions: PKAdOptions = {
      system: '',
      url: this.config.url,
      contentType: '',
      title: '',
      position: 1,
      duration: this._bumperVideoElement.duration,
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
