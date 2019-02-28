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
   * @private
   * @returns {void}
   * @memberof BumperAdsController
   */
  playAdNow(): void {
    // do nothing.
  }

  /**
   * Whether this ads controller is active
   * @public
   * @returns {void}
   * @memberof BumperAdsController
   */
  get active(): boolean {
    return this._context.adBreak;
  }

  /**
   * Whether this ads controller is done
   * @public
   * @returns {boolean} - is done
   * @memberof ImaAdsController
   */
  get done(): boolean {
    return this._context.state === BumperState.DONE;
  }
}

export {BumperAdsController};
