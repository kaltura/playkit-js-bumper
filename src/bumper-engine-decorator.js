// @flow
import {BaseEngineDecorator, FakeEvent, EventType} from '@playkit-js/playkit-js';
import {Bumper} from './bumper';

/**
 * Engine decorator for bumper plugin.
 * @class BumperEngineDecorator
 * @param {IEngine} engine - The engine.
 * @param {Bumper} plugin - The bumper plugin.
 */
class BumperEngineDecorator extends BaseEngineDecorator {
  _plugin: Bumper;

  constructor(engine: IEngine, plugin: Bumper) {
    super(engine);
    this._plugin = plugin;
  }

  dispatchEvent(event: FakeEvent): boolean {
    const ignoreEvent = this._plugin.playOnMainVideoTag() && this._plugin.adBreak;
    event.type === EventType.ENDED && this._plugin.onEnded();
    return ignoreEvent ? event.defaultPrevented : super.dispatchEvent(event);
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
    return (this._plugin.playOnMainVideoTag() && this._plugin.adBreak) || super.paused;
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
    return this._plugin.playOnMainVideoTag() && this._plugin.adBreak ? this._plugin.getContentTime() : super.currentTime;
  }
  /**
   * Set the current time in seconds.
   * @param {number} to - The number to set in seconds.
   * @public
   * @returns {void}
   */
  set currentTime(to: number): void {
    super.currentTime = to;
  }
  /**
   * Get the duration in seconds.
   * @returns {number} - The playback duration.
   * @public
   * @override
   * @instance
   * @memberof BumperEngineDecorator
   */
  get duration(): ?number {
    return this._plugin.playOnMainVideoTag() && this._plugin.adBreak ? this._plugin.getContentDuration() : super.duration;
  }
}

export {BumperEngineDecorator};
