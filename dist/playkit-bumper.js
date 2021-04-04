(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("kaltura-player-js"));
	else if(typeof define === 'function' && define.amd)
		define(["kaltura-player-js"], factory);
	else if(typeof exports === 'object')
		exports["bumper"] = factory(require("kaltura-player-js"));
	else
		root["KalturaPlayer"] = root["KalturaPlayer"] || {}, root["KalturaPlayer"]["plugins"] = root["KalturaPlayer"]["plugins"] || {}, root["KalturaPlayer"]["plugins"]["bumper"] = factory(root["KalturaPlayer"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_kaltura_player_js__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js!./assets/style.css":
/*!*****************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./assets/style.css ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".playkit-bumper-cover {\n  z-index: 1;\n}\n\n.playkit-bumper-cover,\n.playkit-bumper-click-through {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n\n.playkit-bumper-container {\n  position: absolute;\n  width: 100%;\n  min-height: 100%;\n}\n\n.playkit-bumper-container video {\n  position: absolute;\n  background-color: rgb(0, 0, 0);\n  width: 100%;\n  height: 100%;\n}\n", "",{"version":3,"sources":["style.css"],"names":[],"mappings":"AAAA;EACE,UAAU;AACZ;;AAEA;;EAEE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,8BAA8B;EAC9B,WAAW;EACX,YAAY;AACd","file":"style.css","sourcesContent":[".playkit-bumper-cover {\n  z-index: 1;\n}\n\n.playkit-bumper-cover,\n.playkit-bumper-click-through {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n\n.playkit-bumper-container {\n  position: absolute;\n  width: 100%;\n  min-height: 100%;\n}\n\n.playkit-bumper-container video {\n  position: absolute;\n  background-color: rgb(0, 0, 0);\n  width: 100%;\n  height: 100%;\n}\n"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./assets/style.css":
/*!**************************!*\
  !*** ./assets/style.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./style.css */ "../node_modules/css-loader/dist/cjs.js!./assets/style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./bumper-ads-controller.js":
/*!**********************************!*\
  !*** ./bumper-ads-controller.js ***!
  \**********************************/
/*! exports provided: BumperAdsController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BumperAdsController", function() { return BumperAdsController; });
/* harmony import */ var _bumper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bumper */ "./bumper.js");
/* harmony import */ var _bumper_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bumper-state */ "./bumper-state.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * Controller for bumper plugin.
 * @class BumperAdsController
 * @param {Bumper} context - The bumper plugin context.
 */

var BumperAdsController = /*#__PURE__*/function () {
  /**
   * The plugin context.
   * @member
   * @private
   * @memberof BumperAdsController
   */
  function BumperAdsController(context) {
    _classCallCheck(this, BumperAdsController);

    this._context = context;
  }
  /**
   * Skip on an ad.
   * @public
   * @returns {void}
   * @memberof BumperAdsController
   */


  _createClass(BumperAdsController, [{
    key: "skipAd",
    value: function skipAd() {// do nothing.
    }
    /**
     * Play an ad on demand.
     * @public
     * @returns {void}
     * @memberof BumperAdsController
     */

  }, {
    key: "playAdNow",
    value: function playAdNow() {// do nothing.
    }
    /**
     * On playback ended handler.
     * @public
     * @returns {Promise<void>} - complete promise
     * @memberof BumperAdsController
     */

  }, {
    key: "onPlaybackEnded",
    value: function onPlaybackEnded() {
      this._context.onPlayerEnded();

      return this._context.complete();
    }
    /**
     * Whether this ads controller is active
     * @public
     * @returns {void}
     * @memberof BumperAdsController
     */

  }, {
    key: "active",
    get: function get() {
      return this._context.isAdPlaying();
    }
    /**
     * Whether this ads controller is done
     * @public
     * @returns {boolean} - is done
     * @memberof BumperAdsController
     */

  }, {
    key: "done",
    get: function get() {
      return this._context.state === _bumper_state__WEBPACK_IMPORTED_MODULE_1__["BumperState"].DONE;
    }
    /**
     * The controller name
     * @public
     * @returns {string} - The name
     * @memberof BumperAdsController
     */

  }, {
    key: "name",
    get: function get() {
      return this._context.name;
    }
  }]);

  return BumperAdsController;
}();



/***/ }),

/***/ "./bumper-engine-decorator.js":
/*!************************************!*\
  !*** ./bumper-engine-decorator.js ***!
  \************************************/
/*! exports provided: BumperEngineDecorator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BumperEngineDecorator", function() { return BumperEngineDecorator; });
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kaltura-player-js */ "kaltura-player-js");
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bumper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bumper */ "./bumper.js");
/* harmony import */ var _bumper_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bumper-state */ "./bumper-state.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var FakeEvent = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].FakeEvent,
    EventType = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].EventType;
/**
 * Engine decorator for bumper plugin.
 * @class BumperEngineDecorator
 * @param {IEngine} engine - The engine.
 * @param {Bumper} plugin - The bumper plugin.
 * @implements {IEngineDecorator}
 */

var BumperEngineDecorator = /*#__PURE__*/function () {
  function BumperEngineDecorator(engine, plugin) {
    _classCallCheck(this, BumperEngineDecorator);

    this._plugin = plugin;
  }

  _createClass(BumperEngineDecorator, [{
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
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

  }, {
    key: "active",
    get: function get() {
      return this._plugin.playOnMainVideoTag() && (this._plugin.isAdPlaying() || this._plugin.state === _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADING);
    }
  }, {
    key: "paused",
    get: function get() {
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

  }, {
    key: "ended",
    get: function get() {
      return this._plugin.adBreakPosition === _bumper__WEBPACK_IMPORTED_MODULE_1__["BumperBreakType"].POSTROLL;
    }
    /**
     * Get the current time in seconds.
     * @returns {number} - The current playback time.
     * @public
     * @override
     * @instance
     * @memberof BumperEngineDecorator
     */

  }, {
    key: "currentTime",
    get: function get() {
      return this._plugin.getContentTime();
    }
    /**
     * Set the current time in seconds.
     * @param {number} to - The number to set in seconds.
     * @public
     * @returns {void}
     */
    ,
    set: function set(to) {// Do nothing
    }
    /**
     * Get the duration in seconds.
     * @returns {number} - The playback duration.
     * @public
     * @override
     * @instance
     * @memberof BumperEngineDecorator
     */

  }, {
    key: "duration",
    get: function get() {
      return this._plugin.getContentDuration();
    }
  }]);

  return BumperEngineDecorator;
}();



/***/ }),

/***/ "./bumper-middleware.js":
/*!******************************!*\
  !*** ./bumper-middleware.js ***!
  \******************************/
/*! exports provided: BumperMiddleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BumperMiddleware", function() { return BumperMiddleware; });
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kaltura-player-js */ "kaltura-player-js");
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bumper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bumper */ "./bumper.js");
/* harmony import */ var _bumper_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bumper-state */ "./bumper-state.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var BaseMiddleware = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].BaseMiddleware,
    EventType = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].EventType;
/**
 * Middleware implementation for bumper plugin.
 * @classdesc
 */

var BumperMiddleware = /*#__PURE__*/function (_BaseMiddleware) {
  _inherits(BumperMiddleware, _BaseMiddleware);

  var _super = _createSuper(BumperMiddleware);

  /**
   * @constructor
   * @param {Bumper} context - The bumper plugin context.
   */
  function BumperMiddleware(context) {
    var _this;

    _classCallCheck(this, BumperMiddleware);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "id", 'BumperMiddleware');

    _this._context = context;
    _this._isFirstPlay = true;

    _this._context.player.addEventListener(EventType.CHANGE_SOURCE_STARTED, function () {
      _this._isFirstPlay = true;
      _this._nextLoad = null;
    });

    return _this;
  }
  /**
   * Load middleware handler.
   * @param {Function} next - The load play handler in the middleware chain.
   * @returns {void}
   */


  _createClass(BumperMiddleware, [{
    key: "load",
    value: function load(next) {
      var _this2 = this;

      this._nextLoad = next;

      this._context.eventManager.listenOnce(this._context.player, EventType.AD_ERROR, function () {
        return _this2._callNextLoad();
      });

      if (this._context.adBreakPosition === _bumper__WEBPACK_IMPORTED_MODULE_1__["BumperBreakType"].PREROLL && !(this._context.playOnMainVideoTag() && this._context.player.getVideoElement().src)) {
        this._context.load();
      }

      if (!(this._context.config.url && this._context.config.position.includes(_bumper__WEBPACK_IMPORTED_MODULE_1__["BumperBreakType"].PREROLL))) {
        this._callNextLoad();
      }
    }
    /**
     * Play middleware handler.
     * @param {Function} next - The next play handler in the middleware chain.
     * @returns {void}
     */

  }, {
    key: "play",
    value: function play(next) {
      var _this3 = this;

      if (this._isFirstPlay) {
        if (this._context.config.disableMediaPreload || this._context.playOnMainVideoTag()) {
          this._context.eventManager.listenOnce(this._context.player, EventType.AD_BREAK_END, function () {
            return _this3._callNextLoad();
          });

          if (!(this._context.playOnMainVideoTag() || this._context.player.getVideoElement().src)) {
            this._context.player.getVideoElement().load();
          }
        } else {
          this._callNextLoad();
        }
      }

      switch (this._context.state) {
        case _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PLAYING:
          break;

        case _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].IDLE:
        case _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADING:
        case _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADED:
          {
            if (this._context.config.url && this._context.adBreakPosition === _bumper__WEBPACK_IMPORTED_MODULE_1__["BumperBreakType"].PREROLL) {
              // preroll bumper
              this._context.initBumperCompletedPromise();

              this._context.play(); // $FlowFixMe


              this._context.complete()["finally"](function () {
                _this3.callNext(next);
              });
            } else {
              this.callNext(next);
            }

            break;
          }

        case _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PAUSED:
          {
            this._context.play();

            break;
          }

        default:
          {
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

  }, {
    key: "pause",
    value: function pause(next) {
      switch (this._context.state) {
        case _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PAUSED:
          break;

        case _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PLAYING:
          {
            this._context.pause();

            break;
          }

        default:
          {
            this.callNext(next);
            break;
          }
      }
    }
  }, {
    key: "_callNextLoad",
    value: function _callNextLoad() {
      if (this._nextLoad) {
        this.callNext(this._nextLoad);
      }

      this._nextLoad = null;
    }
  }]);

  return BumperMiddleware;
}(BaseMiddleware);



/***/ }),

/***/ "./bumper-state.js":
/*!*************************!*\
  !*** ./bumper-state.js ***!
  \*************************/
/*! exports provided: BumperState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BumperState", function() { return BumperState; });
/**
 * The bumper plugin possible states.
 * @type {Object}
 */
var BumperState = {
  LOADING: 'loading',
  LOADED: 'loaded',
  PLAYING: 'playing',
  PAUSED: 'paused',
  IDLE: 'idle',
  DONE: 'done'
};


/***/ }),

/***/ "./bumper.js":
/*!*******************!*\
  !*** ./bumper.js ***!
  \*******************/
/*! exports provided: Bumper, BumperBreakType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bumper", function() { return Bumper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BumperBreakType", function() { return BumperBreakType; });
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kaltura-player-js */ "kaltura-player-js");
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bumper_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bumper-middleware */ "./bumper-middleware.js");
/* harmony import */ var _bumper_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bumper-state */ "./bumper-state.js");
/* harmony import */ var _bumper_ads_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bumper-ads-controller */ "./bumper-ads-controller.js");
/* harmony import */ var _bumper_engine_decorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bumper-engine-decorator */ "./bumper-engine-decorator.js");
/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/style.css */ "./assets/style.css");
/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_style_css__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var BaseMiddleware = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].BaseMiddleware,
    Utils = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].Utils,
    Error = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].Error,
    FakeEvent = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].FakeEvent,
    EventType = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].EventType,
    Ad = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].Ad,
    AdBreak = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].AdBreak,
    AdBreakType = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].AdBreakType,
    AudioTrack = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].AudioTrack,
    TextTrack = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].TextTrack,
    Env = kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["core"].Env;
/**
 * @enum {Object.<string, number>}}
 */

var BumperBreakType = {
  PREROLL: 0,
  POSTROLL: -1
};
var BUMPER_CONTAINER_CLASS = 'playkit-bumper-container';
var BUMPER_COVER_CLASS = 'playkit-bumper-cover';
var BUMPER_CLICK_THROUGH_CLASS = 'playkit-bumper-click-through';
var DEFAULT_POSITION = [BumperBreakType.PREROLL, BumperBreakType.POSTROLL];
var TIME_FOR_PRELOAD = 3;
/**
 * The bumper plugin.
 * @class Bumper
 * @param {string} name - The plugin name.
 * @param {Player} player - The player instance.
 * @param {Object} config - The plugin config.
 * @implements {IMiddlewareProvider}
 * @implements {IAdsControllerProvider}
 * @implements {IEngineDecoratorProvider}
 * @extends BasePlugin
 */

var Bumper = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Bumper, _BasePlugin);

  var _super = _createSuper(Bumper);

  _createClass(Bumper, null, [{
    key: "isValid",

    /**
     * The default configuration of the plugin.
     * @type {Object}
     * @static
     */

    /**
     * @static
     * @public
     * @returns {boolean} - Whether the plugin is valid.
     */
    value: function isValid() {
      return true;
    }
  }]);

  /**
   * @constructor
   * @param {string} name - The plugin name.
   * @param {Player} player - The player instance.
   * @param {Object} config - The plugin config.
   */
  function Bumper(name, player, config) {
    var _this;

    _classCallCheck(this, Bumper);

    _this = _super.call(this, name, player, config);

    _this._initBumperContainer();

    _this._initMembers();

    _this._addBindings();

    return _this;
  }
  /**
   * Updates the config of the plugin.
   * @param {Object} update - The updated configuration.
   * @public
   * @returns {void}
   */


  _createClass(Bumper, [{
    key: "updateConfig",
    value: function updateConfig(update) {
      _get(_getPrototypeOf(Bumper.prototype), "updateConfig", this).call(this, update);

      this._validatePosition();
    }
    /**
     * Gets the engine decorator.
     * @param {IEngine} engine - The engine to decorate.
     * @public
     * @returns {IEngineDecorator} - The ads api.
     * @instance
     * @memberof Bumper
     */

  }, {
    key: "getEngineDecorator",
    value: function getEngineDecorator(engine) {
      this._engine = engine;
      return new _bumper_engine_decorator__WEBPACK_IMPORTED_MODULE_4__["BumperEngineDecorator"](engine, this);
    }
    /**
     * Gets the middleware.
     * @public
     * @returns {BumperMiddleware} - The middleware api.
     * @instance
     * @memberof Bumper
     */

  }, {
    key: "getMiddlewareImpl",
    value: function getMiddlewareImpl() {
      return new _bumper_middleware__WEBPACK_IMPORTED_MODULE_1__["BumperMiddleware"](this);
    }
    /**
     * Gets the ads controller.
     * @public
     * @returns {IAdsPluginController} - The ads api.
     * @instance
     * @memberof Bumper
     */

  }, {
    key: "getAdsController",
    value: function getAdsController() {
      return new _bumper_ads_controller__WEBPACK_IMPORTED_MODULE_3__["BumperAdsController"](this);
    }
    /**
     * Play/Resume the bumper
     * @public
     * @returns {void}
     * @instance
     * @memberof Bumper
     */

  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      this.load();
      this._adBreak = true;

      this._hideElement(this._bumperCoverDiv);

      var playPromise = this._videoElement.play();

      if (playPromise) {
        playPromise["catch"](function (promiseError) {
          _this2._adBreak = false;

          _this2.player.dispatchEvent(new FakeEvent(EventType.AD_AUTOPLAY_FAILED, {
            error: promiseError
          }));
        });
      }
    }
    /**
     * Pause the bumper
     * @public
     * @returns {void}
     * @instance
     * @memberof Bumper
     */

  }, {
    key: "pause",
    value: function pause() {
      this._videoElement.pause();
    }
    /**
     * Bumper completed promise
     * @public
     * @returns {Promise<void>} - bumper completed
     * @instance
     * @memberof Bumper
     */

  }, {
    key: "complete",
    value: function complete() {
      return this._bumperCompletedPromise;
    }
    /**
     * Resets the plugin.
     * @override
     * @public
     * @returns {void}
     * @instance
     * @memberof Bumper
     */

  }, {
    key: "reset",
    value: function reset() {
      this.eventManager.removeAll();

      this._clean();

      this._addBindings();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.eventManager.destroy();

      this._clean();
    }
  }, {
    key: "playOnMainVideoTag",
    value: function playOnMainVideoTag() {
      return this.config.playOnMainVideoTag || Env.os.name === 'iOS' && this.player.isFullscreen() && !this.player.config.playback.inBrowserFullscreen;
    }
  }, {
    key: "getContentTime",
    value: function getContentTime() {
      return this._contentCurrentTime;
    }
  }, {
    key: "getContentDuration",
    value: function getContentDuration() {
      return this._contentDuration;
    }
  }, {
    key: "loadMedia",
    value: function loadMedia() {
      if (this.config.url) {
        this.dispatchEvent(EventType.AD_MANIFEST_LOADED, {
          adBreaksPosition: this.config.position
        });
      } else {
        this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].DONE;
        this._bumperCompletedPromise = Promise.resolve();
      }
    }
  }, {
    key: "onEnded",
    value: function onEnded() {
      if (this._adBreak) {
        this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADED;
        this._adBreak = false;

        this._hideElement(this._bumperContainerDiv);

        this.dispatchEvent(EventType.AD_COMPLETED);
        this.dispatchEvent(EventType.AD_BREAK_END);

        if (this._adBreakPosition === BumperBreakType.PREROLL) {
          this._maybeSwitchToContent();
        }

        this._maybeDispatchAdsCompleted();

        this._adBreakPosition = BumperBreakType.POSTROLL;
      }
    }
  }, {
    key: "onPlayerEnded",
    value: function onPlayerEnded() {
      if (this._bumperState !== _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].DONE) {
        this.playOnMainVideoTag() && (this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].IDLE);
        this.initBumperCompletedPromise();
        this.play();
      }
    }
  }, {
    key: "isAdPlaying",
    value: function isAdPlaying() {
      return this._adBreak;
    }
  }, {
    key: "_initBumperContainer",
    value: function _initBumperContainer() {
      this.logger.debug('Init bumper container');
      var playerView = this.player.getView(); // Create bumper video element

      this._bumperVideoElement = Utils.Dom.createElement('video'); // Create bumper container

      this._bumperContainerDiv = Utils.Dom.createElement('div');
      this._bumperContainerDiv.id = BUMPER_CONTAINER_CLASS + playerView.id;
      this._bumperContainerDiv.className = BUMPER_CONTAINER_CLASS;
      Utils.Dom.appendChild(this._bumperContainerDiv, this._bumperVideoElement); // Append the bumper container to the dom

      Utils.Dom.appendChild(playerView, this._bumperContainerDiv);

      this._hideElement(this._bumperContainerDiv);

      this._initBumperCover();

      this._initBumperClickElement();
    }
  }, {
    key: "_initBumperCover",
    value: function _initBumperCover() {
      var _this3 = this;

      this._bumperCoverDiv = Utils.Dom.createElement('div');
      this._bumperCoverDiv.className = BUMPER_COVER_CLASS;

      this._bumperCoverDiv.onclick = function () {
        return _this3.play();
      };

      Utils.Dom.appendChild(this._bumperContainerDiv, this._bumperCoverDiv);
    }
  }, {
    key: "_initBumperClickElement",
    value: function _initBumperClickElement() {
      var _this4 = this;

      this._bumperClickThroughDiv = Utils.Dom.createElement('a');
      this._bumperClickThroughDiv.className = BUMPER_CLICK_THROUGH_CLASS;
      this._bumperClickThroughDiv.target = '_blank';

      this._bumperClickThroughDiv.onclick = function () {
        _this4.config.clickThroughUrl && _this4.dispatchEvent(EventType.AD_CLICKED);

        _this4.pause();

        _this4._showElement(_this4._bumperCoverDiv);
      };

      Utils.Dom.appendChild(this._bumperContainerDiv, this._bumperClickThroughDiv);
    }
  }, {
    key: "_initMembers",
    value: function _initMembers() {
      this._adBreak = false;

      this._validatePosition();

      this.config.clickThroughUrl && (this._bumperClickThroughDiv.href = this.config.clickThroughUrl);
      this._contentSrc = '';
      this._contentCurrentTime = 0;
      this._contentDuration = NaN;
      this._selectedAudioTrack = null;
      this._selectedTextTrack = null;
      this._selectedPlaybackRate = 1;
      this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].IDLE;
    }
  }, {
    key: "_validatePosition",
    value: function _validatePosition() {
      // position should be [0], [-1] or [0, -1]
      if (!this.config.position || this.config.position.length !== 1 || this.config.position[0] !== BumperBreakType.PREROLL && this.config.position[0] !== BumperBreakType.POSTROLL) {
        this.config.position = DEFAULT_POSITION;
      }

      this._adBreakPosition = this.config.position[0];
    }
  }, {
    key: "initBumperCompletedPromise",
    value: function initBumperCompletedPromise() {
      var _this5 = this;

      this.logger.debug('Init bumper complete promise');
      this._bumperCompletedPromise = new Promise(function (resolve, reject) {
        if (_this5.playOnMainVideoTag()) {
          if (_this5._engine) {
            _this5.eventManager.listenOnce(_this5._engine, EventType.ENDED, resolve);

            _this5.eventManager.listenOnce(_this5._engine, EventType.ERROR, reject);
          } else {
            _this5.eventManager.listenOnce(_this5.player, EventType.SOURCE_SELECTED, function () {
              _this5.eventManager.listenOnce(_this5._engine, EventType.ENDED, resolve);

              _this5.eventManager.listenOnce(_this5._engine, EventType.ERROR, reject);
            });
          }
        }

        _this5.eventManager.listenOnce(_this5._bumperVideoElement, EventType.ENDED, resolve);

        _this5.eventManager.listenOnce(_this5._bumperVideoElement, EventType.ERROR, reject);
      })["catch"](function () {// silence the promise rejection, error is handled by the ad error event
      });
    }
  }, {
    key: "_addBindings",
    value: function _addBindings() {
      var _this6 = this;

      this.eventManager.listen(this._bumperVideoElement, EventType.ENDED, function () {
        return _this6.onEnded();
      });
      this.eventManager.listen(this.player, EventType.SOURCE_SELECTED, function () {
        return _this6._onPlayerSourceSelected();
      });
      this.eventManager.listen(this.player, EventType.PLAYBACK_START, function () {
        return _this6._onPlayerPlaybackStart();
      });
      this.eventManager.listen(this.player, EventType.PLAYBACK_ENDED, function () {
        return _this6._onPlayerPlaybackEnded();
      });
      this.eventManager.listen(this.player, EventType.TIME_UPDATE, function () {
        return _this6._onPlayerTimeUpdate();
      });
      this.eventManager.listen(this.player, EventType.VOLUME_CHANGE, function () {
        return _this6._onPlayerVolumeChange();
      });
      this.eventManager.listen(this.player, EventType.MUTE_CHANGE, function (event) {
        return _this6._onPlayerMuteChange(event);
      });
      this.eventManager.listen(this.player, EventType.EXIT_FULLSCREEN, function () {
        return _this6._onPlayerExitFullscreen();
      });
    }
  }, {
    key: "_onLoadedData",
    value: function _onLoadedData() {
      this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADED;
    }
  }, {
    key: "_onPlaying",
    value: function _onPlaying() {
      if (this._adBreak) {
        if (this._bumperState === _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADED) {
          this.dispatchEvent(EventType.AD_BREAK_START, {
            adBreak: this._getAdBreak()
          });
          this.dispatchEvent(EventType.AD_STARTED, {
            ad: this._getAd()
          });
        }

        if (this._bumperState === _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PAUSED) {
          this.dispatchEvent(EventType.AD_RESUMED);
        }

        this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PLAYING;

        this._showElement(this._bumperContainerDiv);

        this.playOnMainVideoTag() ? this._hideElement(this._bumperVideoElement) : this._showElement(this._bumperVideoElement);
      }
    }
  }, {
    key: "_onPause",
    value: function _onPause() {
      if (this._bumperState === _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PLAYING && !this._videoElement.ended) {
        this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].PAUSED;
        this.dispatchEvent(EventType.AD_PAUSED);
      }
    }
  }, {
    key: "_onTimeUpdate",
    value: function _onTimeUpdate() {
      this._adBreak && this.dispatchEvent(EventType.AD_PROGRESS, {
        adProgress: {
          currentTime: this._videoElement.currentTime,
          duration: this._videoElement.duration
        }
      });
    }
  }, {
    key: "_onError",
    value: function _onError() {
      if (this._adBreak || this._bumperState === _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADING) {
        this._adBreak = false;
        this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].IDLE;
        this.dispatchEvent(EventType.AD_ERROR, this._getAdError());

        this._maybeDispatchAdsCompleted();

        this._adBreakPosition = BumperBreakType.POSTROLL;
      }
    }
  }, {
    key: "_onWaiting",
    value: function _onWaiting() {
      this._adBreak && this.dispatchEvent(EventType.AD_BUFFERING);
    }
  }, {
    key: "_onVolumeChange",
    value: function _onVolumeChange() {
      this._adBreak && this.dispatchEvent(EventType.AD_VOLUME_CHANGED);
    }
  }, {
    key: "_onPlayerSourceSelected",
    value: function _onPlayerSourceSelected() {
      var _this7 = this;

      this.eventManager.listen(this._videoElement, EventType.PLAYING, function () {
        return _this7._onPlaying();
      });
      this.eventManager.listen(this._videoElement, EventType.PAUSE, function () {
        return _this7._onPause();
      });
      this.eventManager.listen(this._videoElement, EventType.TIME_UPDATE, function () {
        return _this7._onTimeUpdate();
      });
      this.eventManager.listen(this._videoElement, EventType.ERROR, function () {
        return _this7._onError();
      });
      this.eventManager.listen(this._videoElement, EventType.WAITING, function () {
        return _this7._onWaiting();
      });
      this.eventManager.listen(this._videoElement, EventType.VOLUME_CHANGE, function () {
        return _this7._onVolumeChange();
      });
    }
  }, {
    key: "_onPlayerPlaybackStart",
    value: function _onPlayerPlaybackStart() {
      this._bumperVideoElement.load();
    }
  }, {
    key: "_onPlayerPlaybackEnded",
    value: function _onPlayerPlaybackEnded() {
      this._maybeSwitchToContent();
    }
  }, {
    key: "_onPlayerTimeUpdate",
    value: function _onPlayerTimeUpdate() {
      if (this.player.currentTime >= this.player.duration - TIME_FOR_PRELOAD && !this.playOnMainVideoTag()) {
        this.load();
      }
    }
  }, {
    key: "_maybeSwitchToContent",
    value: function _maybeSwitchToContent() {
      var _this8 = this;

      if (this._contentSrc && this.player.getVideoElement().src === this.config.url && !this.player.config.playback.playAdsWithMSE) {
        this.logger.debug('Switch source to content url');
        this.eventManager.listenOnce(this._engine, EventType.PLAYING, function () {
          _this8.player.selectTrack(_this8._selectedAudioTrack);

          _this8.player.selectTrack(_this8._selectedTextTrack);

          _this8.player.playbackRate = _this8._selectedPlaybackRate;
        });
        this.player.getVideoElement().src = this._contentSrc;
        this._contentSrc = '';
      }
    }
  }, {
    key: "_maybeDispatchAdsCompleted",
    value: function _maybeDispatchAdsCompleted() {
      if (!this.config.position.includes(BumperBreakType.POSTROLL) || this._adBreakPosition === BumperBreakType.POSTROLL) {
        this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].DONE;
        this.dispatchEvent(EventType.ADS_COMPLETED);
      }
    }
  }, {
    key: "_onPlayerVolumeChange",
    value: function _onPlayerVolumeChange() {
      this._syncPlayerVolume();
    }
  }, {
    key: "_onPlayerMuteChange",
    value: function _onPlayerMuteChange(event) {
      this._syncPlayerVolume();

      if (this._adBreak) {
        event.payload.mute && this.dispatchEvent(EventType.AD_MUTED);
      }
    }
  }, {
    key: "_onPlayerExitFullscreen",
    value: function _onPlayerExitFullscreen() {
      if (this._adBreak && Env.os.name === 'iOS' && this.player.config.playback.playsinline) {
        this.play();
      }
    }
  }, {
    key: "_syncPlayerVolume",
    value: function _syncPlayerVolume() {
      this._bumperVideoElement.volume = this.player.volume;
      this._bumperVideoElement.muted = this.player.muted;
    }
  }, {
    key: "_showElement",
    value: function _showElement(el) {
      el && el.style.removeProperty('visibility');
    }
  }, {
    key: "_hideElement",
    value: function _hideElement(el) {
      el && (el.style.visibility = 'hidden');
    }
  }, {
    key: "_resetClickThroughElement",
    value: function _resetClickThroughElement() {
      Utils.Dom.removeAttribute(this._bumperClickThroughDiv, 'href');
    }
  }, {
    key: "load",
    value: function load() {
      var _this9 = this;

      if (this._bumperState === _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].IDLE) {
        this.dispatchEvent(EventType.AD_LOADED, {
          ad: this._getAd()
        });
        this._state = _bumper_state__WEBPACK_IMPORTED_MODULE_2__["BumperState"].LOADING;
        this.eventManager.listenOnce(this._videoElement, EventType.LOADED_DATA, function () {
          return _this9._onLoadedData();
        });

        if (this.playOnMainVideoTag()) {
          this.logger.debug('Switch source to bumper url');
          this._contentSrc = this._engine.src;
          this._contentCurrentTime = this._engine.currentTime;
          this._contentDuration = this._engine.duration;
          this._selectedAudioTrack = this.player.getActiveTracks().audio;
          this._selectedTextTrack = this.player.getActiveTracks().text;
          this._selectedPlaybackRate = this.player.playbackRate;
          this.player.getVideoElement().src = this.config.url;
        } else {
          this._bumperVideoElement.src = this.config.url;

          this._bumperVideoElement.setAttribute('playsinline', '');
        }
      }
    }
  }, {
    key: "_getAd",
    value: function _getAd() {
      var adOptions = {
        system: '',
        url: this.config.url,
        contentType: '',
        title: '',
        position: 1,
        duration: this._videoElement.duration,
        clickThroughUrl: this.config.clickThroughUrl,
        posterUrl: '',
        skipOffset: -1,
        linear: true,
        width: this._bumperVideoElement.videoWidth,
        height: this._bumperVideoElement.videoHeight,
        bitrate: 0,
        bumper: true
      };
      return new Ad(this.config.id, adOptions);
    }
  }, {
    key: "_getAdBreak",
    value: function _getAdBreak() {
      var type = this._adBreakPosition === BumperBreakType.PREROLL ? AdBreakType.PRE : AdBreakType.POST;
      return new AdBreak({
        type: type,
        position: this._adBreakPosition,
        numAds: 1
      });
    }
  }, {
    key: "_getAdError",
    value: function _getAdError() {
      var severity = Error.Severity.CRITICAL;
      var category = Error.Category.ADS;
      var code = this._videoElement.error && this._videoElement.error.code;
      return new Error(severity, category, code, {
        ad: this._getAd(),
        innerError: this._videoElement.error
      });
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this._hideElement(this._bumperContainerDiv);

      this._resetClickThroughElement();

      Utils.Dom.removeAttribute(this._bumperVideoElement, 'src');

      this._initMembers();
    }
  }, {
    key: "_state",
    set: function set(newState) {
      this.logger.debug("Change state: ".concat(this._bumperState || 'none', " => ").concat(newState));
      this._bumperState = newState;
    }
  }, {
    key: "state",
    get: function get() {
      return this._bumperState;
    }
  }, {
    key: "adBreakPosition",
    get: function get() {
      return this._adBreakPosition;
    }
  }, {
    key: "_videoElement",
    get: function get() {
      return this.playOnMainVideoTag() ? this._engine : this._bumperVideoElement;
    }
  }]);

  return Bumper;
}(kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["BasePlugin"]);

_defineProperty(Bumper, "defaultConfig", {
  id: '',
  url: '',
  clickThroughUrl: '',
  position: DEFAULT_POSITION,
  disableMediaPreload: false,
  playOnMainVideoTag: false
});



/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: Plugin, VERSION, NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kaltura-player-js */ "kaltura-player-js");
/* harmony import */ var kaltura_player_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bumper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bumper */ "./bumper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plugin", function() { return _bumper__WEBPACK_IMPORTED_MODULE_1__["Bumper"]; });



var VERSION = "1.4.0";
var NAME = "@playkit-js/playkit-js-bumper";


var pluginName = 'bumper';
Object(kaltura_player_js__WEBPACK_IMPORTED_MODULE_0__["registerPlugin"])(pluginName, _bumper__WEBPACK_IMPORTED_MODULE_1__["Bumper"]);

/***/ }),

/***/ "kaltura-player-js":
/*!************************************************************************************************************************************!*\
  !*** external {"commonjs":"kaltura-player-js","commonjs2":"kaltura-player-js","amd":"kaltura-player-js","root":["KalturaPlayer"]} ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_kaltura_player_js__;

/***/ })

/******/ });
});
//# sourceMappingURL=playkit-bumper.js.map