// @flow
import {registerPlugin} from '@playkit-js/playkit-js';
import {Bumper} from './bumper';

declare var __VERSION__: string;
declare var __NAME__: string;

export {Bumper as Plugin};
export {__VERSION__ as VERSION, __NAME__ as NAME};

const pluginName: string = 'bumper';

registerPlugin(pluginName, Bumper);
