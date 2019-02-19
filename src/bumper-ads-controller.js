// @flow
import {Bumper} from './bumper';

/**
 * Controller for bumper plugin.
 * @class BumperAdsController
 * @param {Bumper} context - The bumper plugin context.
 */
class BumperAdsController implements IAdsController {
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
}

export {BumperAdsController};
