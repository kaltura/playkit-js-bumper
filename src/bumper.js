// @flow
// import {BaseMiddleware, BasePlugin, EngineType, Error, getCapabilities, Utils} from '@playkit-js/playkit-js';
import {BasePlugin} from '@playkit-js/playkit-js';
/**
 * The bumper plugin.
 * @class Bumper
 * @param {string} name - The plugin name.
 * @param {Player} player - The player instance.
 * @param {ImaConfigObject} config - The plugin config.
 * @implements {IMiddlewareProvider}
 * @implements {IAdsControllerProvider}
 * @extends BasePlugin
 */
class Bumper extends BasePlugin implements IMiddlewareProvider, IAdsControllerProvider {}

export {Bumper};
