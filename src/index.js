// @flow
import {registerPlugin} from 'kaltura-player-js';
import {Bumper} from './bumper';

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {Bumper as Plugin};
export {VERSION, NAME};

const pluginName: string = 'bumper';

registerPlugin(pluginName, Bumper);
