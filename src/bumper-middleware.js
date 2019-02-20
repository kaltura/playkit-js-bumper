// @flow
import {BaseMiddleware, EventType} from '@playkit-js/playkit-js';
import {Bumper} from './bumper';
import {BumperState} from './bumper-state';

/**
 * Middleware implementation for bumper plugin.
 * @classdesc
 */
class BumperMiddleware extends BaseMiddleware {
  id: string = 'BumperMiddleware';
  _context: Bumper;
  _isPlayerLoaded: boolean;

  /**
   * @constructor
   * @param {Bumper} context - The bumper plugin context.
   */
  constructor(context: Bumper) {
    super();
    this._context = context;
    this._isPlayerLoaded = false;
    this._context.player.addEventListener(EventType.CHANGE_SOURCE_STARTED, () => (this._isPlayerLoaded = false));
  }

  /**
   * Play middleware handler.
   * @param {Function} next - The next play handler in the middleware chain.
   * @returns {void}
   */
  play(next: Function): void {
    if (!this._isPlayerLoaded && !this._context.config.disableMediaPreload) {
      this._loadPlayer();
    }
    switch (this._context.state) {
      case BumperState.PLAYING:
        break;
      case BumperState.IDLE: {
        if (this._context.config.position.includes(0)) {
          // preroll bumper
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

  _loadPlayer(): void {
    const loadPlayer = () => {
      this._context.logger.debug('Load player by bumper middleware');
      this._context.player.load();
      this._isPlayerLoaded = true;
    };
    if (this._context.player.engineType) {
      // player has source to play
      loadPlayer();
    } else {
      this._context.player.addEventListener(EventType.SOURCE_SELECTED, () => loadPlayer());
    }
  }
}

export {BumperMiddleware};
