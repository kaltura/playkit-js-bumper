# PlayKit JS Bumper - plugin for the [PlayKit JS Player]

[![Build Status](https://travis-ci.com/kaltura/playkit-js-avplay.svg?branch=master)](https://travis-ci.org/kaltura/playkit-js-bumper)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-bumper/latest.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-bumper)
[![](https://img.shields.io/npm/v/@playkit-js/playkit-js-bumper/canary.svg)](https://www.npmjs.com/package/@playkit-js/playkit-js-bumper/v/canary)

PlayKit JS Bumper is written in [ECMAScript6], statically analysed using [Typescript] and transpiled in ECMAScript5 using [Babel].

[typescript]: https://www.typescriptlang.org/
[ecmascript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[babel]: https://babeljs.io

## Getting Started

### Prerequisites

The plugin requires [Kaltura Player] to be loaded first.

[kaltura player]: https://github.com/kaltura/kaltura-player-js

### Installing

First, clone and run [yarn] to install dependencies:

[yarn]: https://yarnpkg.com/lang/en/

```
git clone https://github.com/kaltura/playkit-js-bumper.git
cd playkit-js-bumper
yarn install
```

### Building

Then, build the player

```javascript
yarn run build
```

### Embed the library in your test page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<script type="text/javascript" src="/PATH/TO/FILE/kaltura-player.js"></script>
<!--Kaltura player-->
<script type="text/javascript" src="/PATH/TO/FILE/bumper.js"></script>
<!--PlayKit info plugin-->
<div id="player-placeholder" style="height:360px; width:640px">
  <script type="text/javascript">
    var playerContainer = document.querySelector("#player-placeholder");
    var config = {
     ...
     targetId: 'player-placeholder',
     plugins: {
       "bumper": {
			   "url": "<BUMPER URL>"
			}
     }
     ...
    };
    var player = KalturaPlayer.setup(config);
    player.loadMedia(...);
  </script>
</div>
```

## Documentation

The bumper plugin purpose is to give the application a way to display a short clip before/after the main entry playback
Allow the player to display a short clip before main entry. (Channel id, Sponsored by and more)


### Configuration


In order to enable the plugin you can give the folowing config parameters while `url` it the only "must" key to make the plugin work

#### id

default = '' - The bumper container div id 

#### url 

the url of the bumber video

#### clickThroughUrl

url to a website that will be opened when clicking on the bumper screen

#### position

default [0] - bumper before video playback, it receives an array that configured wheter bumper will be shown on playback start, playback end or both =>  [0], [-1], [0, -1]

#### disableMediaPreload

default = false, when using main video tag we will want it to be true

#### playOnMainVideoTag

default = false, may be used as true on TV's, ios plays inline = false or ios native full screen mode.

### Default Config Json Example

```
plugins: {
       bumper: {
		    id: '',
		    url: '',
		    clickThroughUrl: '',
		    position: [],
		    disableMediaPreload: false,
		    playOnMainVideoTag: false
		}
  }
```

### Example:

**[Bumper Plugin Example](https://codepen.io/giladna/pen/eYKmpxR)**


### Coding style tests

We use ESLint [recommended set](http://eslint.org/docs/rules/) with some additions for enforcing [Flow] types and other rules.

See [ESLint config](.eslintrc.json) for full configuration.

We also use [.editorconfig](.editorconfig) to maintain consistent coding styles and settings, please make sure you comply with the styling.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kaltura/playkit-js-bumper/tags).

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details

