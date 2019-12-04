// @flow
import {BaseMiddleware, EventType} from '@playkit-js/playkit-js';
import {Bumper, BumperType} from './bumper';
import {BumperState} from './bumper-state';

/**
 * Middleware implementation for bumper plugin.
 * @classdesc
 */
class BumperMiddleware extends BaseMiddleware {
  id: string = 'BumperMiddleware';
  _context: Bumper;
  _isFirstPlay: boolean;
  _nextLoad: ?Function;

  /**
   * @constructor
   * @param {Bumper} context - The bumper plugin context.
   */
  constructor(context: Bumper) {
    super();
    this._context = context;
    this._isFirstPlay = true;
    this._context.player.addEventListener(EventType.CHANGE_SOURCE_STARTED, () => {
      this._isFirstPlay = true;
      this._nextLoad = null;
    });
  }

  /**
   * Load middleware handler.
   * @param {Function} next - The load play handler in the middleware chain.
   * @returns {void}
   */
  load(next: Function): void {
    this._nextLoad = next;
    if (this._context.adBreakPosition === BumperType.PREROLL && !(this._context.playOnMainVideoTag() && this._context.player.getVideoElement().src)) {
      this._context.load();
    }
    if (!(this._context.config.url && this._context.config.position.includes(0))) {
      this._callNextLoad();
    }
  }

  /**
   * Play middleware handler.
   * @param {Function} next - The next play handler in the middleware chain.
   * @returns {void}
   */
  play(next: Function): void {
    if (this._isFirstPlay && !this._context.playOnMainVideoTag()) {
      if (this._context.config.disableMediaPreload) {
        if (!this._context.player.getVideoElement().src) {
          this._context.player.getVideoElement().load();
        }
      } else {
        this._callNextLoad();
      }
    }
    switch (this._context.state) {
      case BumperState.PLAYING:
        break;
      case BumperState.IDLE:
      case BumperState.LOADING:
      case BumperState.LOADED: {
        if (this._context.config.url && this._context.adBreakPosition === BumperType.PREROLL) {
          // preroll bumper
          this._context.initBumperCompletedPromise();
          this._context.play();
          // $FlowFixMe
          this._context.complete().finally(() => {
            this.callNext(next);
          });
        } else {
          this.callNext(next);
        }
        break;
      }
      case BumperState.PAUSED: {
        this._context.play();
        break;
      }
      default: {
        this.callNext(next);
        break;
      }
    }
    this._isFirstPlay = false;
  }

  /**
   * Pause middleware handler.
   * @param {Function} next - The next pause handler in the middleware chain.
   * @returns {void}
   */
  pause(next: Function): void {
    switch (this._context.state) {
      case BumperState.PAUSED:
        break;
      case BumperState.PLAYING: {
        this._context.pause();
        break;
      }
      default: {
        this.callNext(next);
        break;
      }
    }
  }

  _callNextLoad(): void {
    if (this._nextLoad && !(this._context.playOnMainVideoTag() || this._context.config.disableMediaPreload)) {
      this.callNext(this._nextLoad);
    }
    this._nextLoad = null;
  }
}

export {BumperMiddleware};
