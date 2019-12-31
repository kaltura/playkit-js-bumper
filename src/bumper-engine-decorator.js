// @flow
import {FakeEvent, EventType} from '@playkit-js/playkit-js';
import {Bumper, BumperBreakType} from './bumper';
import {BumperState} from './bumper-state';

/**
 * Engine decorator for bumper plugin.
 * @class BumperEngineDecorator
 * @param {IEngine} engine - The engine.
 * @param {Bumper} plugin - The bumper plugin.
 * @implements {IEngineDecorator}
 */
class BumperEngineDecorator implements IEngineDecorator {
  _plugin: Bumper;

  constructor(engine: IEngine, plugin: Bumper) {
    this._plugin = plugin;
  }

  get active(): boolean {
    return this._plugin.playOnMainVideoTag() && (this._plugin.isAdPlaying() || this._plugin.state === BumperState.LOADING);
  }

  dispatchEvent(event: FakeEvent): boolean {
    event.type === EventType.ENDED && this._plugin.onEnded();
    return event.defaultPrevented;
  }
  /**
   * Get paused state.
   * @returns {boolean} - The paused value of the engine.
   * @public
   * @override
   * @instance
   * @memberof BumperEngineDecorator
   */
  get paused(): boolean {
    return true;
  }
  /**
   * Get ended state.
   * @returns {boolean} - The ended value of the engine.
   * @public
   * @override
   * @instance
   * @memberof BumperEngineDecorator
   */
  get ended(): boolean {
    return this._plugin.adBreakPosition === BumperBreakType.POSTROLL;
  }
  /**
   * Get the current time in seconds.
   * @returns {number} - The current playback time.
   * @public
   * @override
   * @instance
   * @memberof BumperEngineDecorator
   */
  get currentTime(): number {
    return this._plugin.getContentTime();
  }
  /**
   * Set the current time in seconds.
   * @param {number} to - The number to set in seconds.
   * @public
   * @returns {void}
   */
  set currentTime(to: number): void {
    // Do nothing
  }
  /**
   * Get the duration in seconds.
   * @returns {number} - The playback duration.
   * @public
   * @override
   * @instance
   * @memberof BumperEngineDecorator
   */
  get duration(): number {
    return this._plugin.getContentDuration();
  }
}

export {BumperEngineDecorator};
