// @flow

/**
 * The bumper plugin possible states.
 * @type {Object}
 */
const BumperState: {[state: string]: string} = {
  LOADING: 'loading',
  LOADED: 'loaded',
  PLAYING: 'playing',
  PAUSED: 'paused',
  IDLE: 'idle',
  DONE: 'done'
};

export {BumperState};
