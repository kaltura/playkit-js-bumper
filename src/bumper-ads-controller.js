// @flow
import {Bumper} from './bumper';
import {BumperState} from './bumper-state';

/**
 * Controller for bumper plugin.
 * @class BumperAdsController
 * @param {Bumper} context - The bumper plugin context.
 */
class BumperAdsController implements IAdsPluginController {
  /**
   * The plugin context.
   * @member
   * @private
   * @memberof BumperAdsController
   */
  _context: Bumper;

  constructor(context: Bumper) {
    this._context = context;
  }

  /**
   * @public
   * @returns {void}
   * @memberof BumperAdsController
   */
  prepare(): void {
    if (!this._context.playOnMainVideoTag() || (this._context.adBreakPosition === 0 && !this._context.player.getVideoElement().src)) {
      this._context.load();
    }
  }

  /**
   * Skip on an ad.
   * @public
   * @returns {void}
   * @memberof BumperAdsController
   */
  skipAd(): void {
    // do nothing.
  }

  /**
   * Play an ad on demand.
   * @public
   * @returns {void}
   * @memberof BumperAdsController
   */
  playAdNow(): void {
    // do nothing.
  }

  /**
   * On playback ended handler.
   * @public
   * @returns {Promise<void>} - complete promise
   * @memberof BumperAdsController
   */
  onPlaybackEnded(): Promise<void> {
    this._context.onPlayerEnded();
    return this._context.complete();
  }

  /**
   * Whether to prepare the bumper in advance
   * @public
   * @returns {void}
   * @memberof BumperAdsController
   */
  get preload(): boolean {
    return this._context.config.preload;
  }

  /**
   * Whether this ads controller is active
   * @public
   * @returns {void}
   * @memberof BumperAdsController
   */
  get active(): boolean {
    return this._context.isAdPlaying();
  }

  /**
   * Whether this ads controller is done
   * @public
   * @returns {boolean} - is done
   * @memberof BumperAdsController
   */
  get done(): boolean {
    return this._context.state === BumperState.DONE;
  }

  /**
   * The controller name
   * @public
   * @returns {string} - The name
   * @memberof BumperAdsController
   */
  get name(): string {
    return this._context.name;
  }
}

export {BumperAdsController};
