// @flow
// import {BaseMiddleware, BasePlugin, EngineType, Error, getCapabilities, Utils} from '@playkit-js/playkit-js';
import {BaseMiddleware, BasePlugin, Utils, EventType, Ad, AdBreak, AdBreakType, Error} from '@playkit-js/playkit-js';
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
    url: '',
    clickThroughUrl: '',
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
  _bumperClickThroughDiv: ?HTMLAnchorElement;
  _bumperCompletedPromise: Promise<void>;
  _adBreak: boolean;
  _state: string;

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
   * @returns {IAdsController} - The ads api.
   * @instance
   * @memberof Ima
   */
  getAdsController(): IAdsController {
    return new BumperAdsController(this);
  }

  play(): void {
    if (this._state === BumperState.IDLE) {
      this._syncPlayerVolume();
      this._load();
    }
    this._bumperVideoElement.play();
  }

  complete(): Promise<void> {
    return this._bumperCompletedPromise;
  }

  pause(): void {
    this._bumperVideoElement.pause();
  }

  reset(): void {
    this._initMembers();
    this._hideBumperContainer();
    Utils.Dom.removeAttribute(this._bumperVideoElement, 'src');
    Utils.Dom.removeAttribute(this._bumperClickThroughDiv, 'href');
  }

  get state(): string {
    return this._state;
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
    Utils.Dom.appendChild(this._bumperContainerDiv, this._getBumperCover());
    // Append the bumper container to the dom
    Utils.Dom.appendChild(playerView, this._bumperContainerDiv);
  }

  _initMembers(): void {
    this._adBreak = false;
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
    this.eventManager.listen(this.player, EventType.VOLUME_CHANGE, () => this._onPlayerVolumeChange());
    this.eventManager.listen(this.player, EventType.MUTE_CHANGE, event => this._onPlayerMuteChange(event));
  }

  _onLoadStart(): void {
    this._state = BumperState.LOADING;
  }

  _onLoadedData(): void {
    this._state = BumperState.LOADED;
    // TODO add post if needed -1
    this.dispatchEvent(EventType.AD_MANIFEST_LOADED, {adBreaksPosition: [0]});
    this.dispatchEvent(EventType.AD_LOADED, {ad: this._getAd()});
  }

  _onPlaying(): void {
    if (this._state === BumperState.LOADED) {
      this.dispatchEvent(EventType.AD_BREAK_START, {adBreak: this._getAdBreak()});
      this.dispatchEvent(EventType.AD_STARTED, {ad: this._getAd()});
      this._adBreak = true;
    }
    if (this._state === BumperState.PAUSED) {
      this.dispatchEvent(EventType.AD_RESUMED);
    }
    this._state = BumperState.PLAYING;
    this._showBumperContainer();
    this._enableBumperClickThrough();
  }

  _onPause(): void {
    if (this._state !== BumperState.IDLE) {
      this._state = BumperState.PAUSED;
      this.dispatchEvent(EventType.AD_PAUSED);
      this._disableBumperClickThrough();
    }
  }

  _onEnded(): void {
    this._state = BumperState.DONE;
    this._adBreak = false;
    this._hideBumperContainer();
    this.dispatchEvent(EventType.AD_COMPLETED);
    this.dispatchEvent(EventType.AD_BREAK_END);

    // TODO consider postroll
    this.dispatchEvent(EventType.ALL_ADS_COMPLETED);
  }

  _onTimeUpdate(): void {
    if (this._state !== BumperState.IDLE) {
      this.dispatchEvent(EventType.AD_PROGRESS, {
        adProgress: {
          currentTime: this._bumperVideoElement.currentTime,
          duration: this._bumperVideoElement.duration
        }
      });
    }
  }

  _onError(): void {
    this.dispatchEvent(EventType.AD_ERROR, this._getAdError());
    this._state = BumperState.IDLE;
  }

  _onWaiting(): void {
    this.dispatchEvent(EventType.AD_BUFFERING);
  }

  _onVolumeChange(): void {
    if (this._adBreak) {
      this.dispatchEvent(EventType.AD_VOLUME_CHANGED);
    }
  }

  _onPlayerVolumeChange(): void {
    this._syncPlayerVolume();
  }

  _onPlayerMuteChange(event): void {
    if (this._adBreak) {
      event.payload.mute && this.dispatchEvent(EventType.AD_MUTED);
    }
  }

  _syncPlayerVolume(): void {
    this._bumperVideoElement.volume = this.player.volume;
    this._bumperVideoElement.muted = this.player.muted;
  }

  _getBumperCover(): HTMLDivElement {
    const bumperCoverDiv = Utils.Dom.createElement('div');
    bumperCoverDiv.className = BUMPER_COVER_CLASS;
    bumperCoverDiv.onclick = () => this._onBumperCoverClicked();
    if (this.config.clickThroughUrl) {
      // Create bumper click through element
      this._bumperClickThroughDiv = Utils.Dom.createElement('a');
      this._bumperClickThroughDiv.className = BUMPER_CLICK_THROUGH_CLASS;
      this._bumperClickThroughDiv.target = '_blank';
      this._bumperClickThroughDiv.onclick = () => this._onClickThroughClicked();
      Utils.Dom.appendChild(bumperCoverDiv, this._bumperClickThroughDiv);
    }
    return bumperCoverDiv;
  }

  _showBumperContainer(): void {
    this._bumperContainerDiv.style.visibility = 'visible';
  }

  _hideBumperContainer(): void {
    this._bumperContainerDiv.style.visibility = 'hidden';
  }

  _enableBumperClickThrough(): void {
    this._bumperClickThroughDiv && (this._bumperClickThroughDiv.style.visibility = 'visible');
  }

  _disableBumperClickThrough(): void {
    this._bumperClickThroughDiv && (this._bumperClickThroughDiv.style.visibility = 'hidden');
  }

  _onBumperCoverClicked(): void {
    switch (this._state) {
      case BumperState.PAUSED:
        this.play();
        break;
      case BumperState.PLAYING:
        this.pause();
        break;
      default:
        break;
    }
  }

  _onClickThroughClicked(): void {
    this.dispatchEvent(EventType.AD_CLICKED);
  }

  _load(): void {
    this._bumperVideoElement.src = this.config.url;
    this._bumperClickThroughDiv && (this._bumperClickThroughDiv.href = this.config.clickThroughUrl);
  }

  _getAd(): Ad {
    return new Ad('', {url: this.config.url, clickThroughUrl: this.config.clickThroughUrl});
  }

  _getAdBreak(): Ad {
    //TODO support postroll
    return new AdBreak({type: AdBreakType.PRE, position: 0, numAds: 1});
  }

  _getAdError(): Error {
    const severity = Error.Severity.CRITICAL;
    const category = Error.Category.ADS;
    const code = Error.Code.AD_UNDEFINED_ERROR;
    return new Error(severity, category, code, {
      ad: this._getAd(),
      innerError: this._bumperVideoElement.error
    });
  }
}

export {Bumper};
