# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 2.0.12 (2024-06-02)


### Bug Fixes

* **FEC-13932:** Application events analytics reporting to kava | "Bumper_click" event missing bumper url - buttonValue is empty. ([#112](https://github.com/kaltura/playkit-js-bumper/issues/112)) ([d90895d](https://github.com/kaltura/playkit-js-bumper/commit/d90895d))



### 2.0.11 (2024-03-14)


### Bug Fixes

* **FEC-13743:** [Bumper Plugin]: Add Events (used by kava analytics) ([#111](https://github.com/kaltura/playkit-js-bumper/issues/111)) ([13a5907](https://github.com/kaltura/playkit-js-bumper/commit/13a5907)), closes [kaltura/playkit-js-kava#156](https://github.com/kaltura/playkit-js-bumper/issues/156)



### 2.0.10 (2023-06-28)



### 2.0.9 (2023-05-17)


### Bug Fixes

* **FEC-13123:** replace travis with github actions ([#106](https://github.com/kaltura/playkit-js-bumper/issues/106)) ([fd4258f](https://github.com/kaltura/playkit-js-bumper/commit/fd4258f))



### 2.0.8 (2023-05-03)



### [2.0.7](https://github.com/kaltura/playkit-js-bumper/compare/v2.0.6...v2.0.7) (2021-08-26)


### Bug Fixes

* **FEC-10692:** Youbora is missing some ad properties of post bumper ([#82](https://github.com/kaltura/playkit-js-bumper/issues/82)) ([d2e36cc](https://github.com/kaltura/playkit-js-bumper/commit/d2e36cc))


### Build System

* **FEC-10700:** Improvement for CI/CD ([#80](https://github.com/kaltura/playkit-js-bumper/issues/80)) ([b5808d2](https://github.com/kaltura/playkit-js-bumper/commit/b5808d2))
* **FEC-11389:** reduce builds from travis ([1764044](https://github.com/kaltura/playkit-js-bumper/commit/1764044))



### [2.0.6](https://github.com/kaltura/playkit-js-bumper/compare/v2.0.5...v2.0.6) (2021-05-04)


### Bug Fixes

* **FEC-11199:** NaN shown instead of duration for bumper videos ([#73](https://github.com/kaltura/playkit-js-bumper/issues/73)) ([400c290](https://github.com/kaltura/playkit-js-bumper/commit/400c290))



### [2.0.5](https://github.com/kaltura/playkit-js-bumper/compare/v2.0.4...v2.0.5) (2021-04-06)


### Bug Fixes

* **FEC-11005:** Bumper doesn't work with playAdsWithMSE config ([#69](https://github.com/kaltura/playkit-js-bumper/issues/69)) ([cb8284b](https://github.com/kaltura/playkit-js-bumper/commit/cb8284b))
* **FEC-11062:** ad layout doesn't work when IMA DAI configured ([#66](https://github.com/kaltura/playkit-js-bumper/issues/66)) ([29e808f](https://github.com/kaltura/playkit-js-bumper/commit/29e808f))
* **FEC-11120:** the player doesn't loads on iPhones, if playsinline=true ([#71](https://github.com/kaltura/playkit-js-bumper/issues/71)) ([381910e](https://github.com/kaltura/playkit-js-bumper/commit/381910e))



### [2.0.4](https://github.com/kaltura/playkit-js-bumper/compare/v2.0.3...v2.0.4) (2020-12-07)


### Bug Fixes

* **FEC-10676:** no post bumper displayed ([#62](https://github.com/kaltura/playkit-js-bumper/issues/62)) ([fb0461e](https://github.com/kaltura/playkit-js-bumper/commit/fb0461e))



### [2.0.3](https://github.com/kaltura/playkit-js-bumper/compare/v2.0.2...v2.0.3) (2020-11-22)



### [2.0.2](https://github.com/kaltura/playkit-js-bumper/compare/v2.0.0...v2.0.2) (2020-11-22)


### Bug Fixes

* **FEC-10673:** back-end bumper : no clickthrough works ([#61](https://github.com/kaltura/playkit-js-bumper/issues/61)) ([d57b7f6](https://github.com/kaltura/playkit-js-bumper/commit/d57b7f6))


### Build System

* remove plugins that already exist on preset-env ([#60](https://github.com/kaltura/playkit-js-bumper/issues/60)) ([2ffd38b](https://github.com/kaltura/playkit-js-bumper/commit/2ffd38b))



### [2.0.1](https://github.com/kaltura/playkit-js-bumper/compare/v2.0.0...v2.0.1) (2020-11-03)


### Build System

* remove plugins that already exist on preset-env ([#60](https://github.com/kaltura/playkit-js-bumper/issues/60)) ([2ffd38b](https://github.com/kaltura/playkit-js-bumper/commit/2ffd38b))



## [2.0.0](https://github.com/kaltura/playkit-js-bumper/compare/v1.4.0...v2.0.0) (2020-09-08)


### Build System

* **FEC-10064:** add automatic release notes ([#57](https://github.com/kaltura/playkit-js-bumper/issues/57)) ([f3ff9eb](https://github.com/kaltura/playkit-js-bumper/commit/f3ff9eb))


### Features

* **FEC-10347:** expose kaltura player as a global variable instead of UMD ([#56](https://github.com/kaltura/playkit-js-bumper/issues/56)) ([0b1da4a](https://github.com/kaltura/playkit-js-bumper/commit/0b1da4a))


### BREAKING CHANGES

* **FEC-10347:** This package is not UMD anymore



## [1.4.0](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.8...v1.4.0) (2020-08-05)


### Build System

* **FEC-9495:** update after deploy stage to ping Jenkins ([#40](https://github.com/kaltura/playkit-js-bumper/issues/40)) ([40120c3](https://github.com/kaltura/playkit-js-bumper/commit/40120c3))
* github bad certificate ([#45](https://github.com/kaltura/playkit-js-bumper/issues/45)) ([bdcaa92](https://github.com/kaltura/playkit-js-bumper/commit/bdcaa92))


### Features

* **FEC-10057:** move the plugin manager to kaltura player ([#54](https://github.com/kaltura/playkit-js-bumper/issues/54)) ([765438c](https://github.com/kaltura/playkit-js-bumper/commit/765438c))
* **FEC-10290:** upgrade NPM packages ([#49](https://github.com/kaltura/playkit-js-bumper/issues/49)) ([d73fe0f](https://github.com/kaltura/playkit-js-bumper/commit/d73fe0f))



<a name="1.3.8"></a>
## [1.3.8](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.7...v1.3.8) (2020-01-06)


### Bug Fixes

* **FEC-9514:** mismatch between the player size and the bumper ([#43](https://github.com/kaltura/playkit-js-bumper/issues/43)) ([b81cf4c](https://github.com/kaltura/playkit-js-bumper/commit/b81cf4c))
* **FEC-9594:** the playback failed after the bumper finished when "disableMediaPreload: true" ([#44](https://github.com/kaltura/playkit-js-bumper/issues/44)) ([87e6218](https://github.com/kaltura/playkit-js-bumper/commit/87e6218))



<a name="1.3.7"></a>
## [1.3.7](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.6...v1.3.7) (2019-12-31)


### Bug Fixes

* **FEC-9533:** the player in error screen when bumper preload is failed and playOnMainVideoTag is true ([#42](https://github.com/kaltura/playkit-js-bumper/issues/42)) ([08ad30e](https://github.com/kaltura/playkit-js-bumper/commit/08ad30e))



<a name="1.3.6"></a>
## [1.3.6](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.5...v1.3.6) (2019-12-29)


### Bug Fixes

* **FEC-9513:** endless spinner when auto play is failed ([#37](https://github.com/kaltura/playkit-js-bumper/issues/37)) ([1214538](https://github.com/kaltura/playkit-js-bumper/commit/1214538))



<a name="1.3.5"></a>
## [1.3.5](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.4...v1.3.5) (2019-12-15)



<a name="1.3.4"></a>
## [1.3.4](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.3...v1.3.4) (2019-12-08)


### Bug Fixes

* **FEC-9513:** endless spinner when auto play is failed ([#33](https://github.com/kaltura/playkit-js-bumper/issues/33)) ([c84b89e](https://github.com/kaltura/playkit-js-bumper/commit/c84b89e))
* **FEC-9528:** the bumper is hidden when playOnMainVideoTag is true ([#35](https://github.com/kaltura/playkit-js-bumper/issues/35)) ([324c2e7](https://github.com/kaltura/playkit-js-bumper/commit/324c2e7))
* bumper covers the playback ([#36](https://github.com/kaltura/playkit-js-bumper/issues/36)) ([2298476](https://github.com/kaltura/playkit-js-bumper/commit/2298476))



<a name="1.3.3"></a>
## [1.3.3](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.2...v1.3.3) (2019-11-03)


### Bug Fixes

* **FEC-9425:** when open dev-tool and bumper on fullscreen,bumper on top of content ([#22](https://github.com/kaltura/playkit-js-bumper/issues/22)) ([3826741](https://github.com/kaltura/playkit-js-bumper/commit/3826741))
* **FEC-9426:** when pause bumper on full screen and exit full screen bumper start play ([#23](https://github.com/kaltura/playkit-js-bumper/issues/23)) ([3e33dca](https://github.com/kaltura/playkit-js-bumper/commit/3e33dca))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.1...v1.3.2) (2019-08-01)


### Bug Fixes

* **FEC-9276:** post-roll is not displayed when configure bumper with empty url ([#20](https://github.com/kaltura/playkit-js-bumper/issues/20)) ([24c5610](https://github.com/kaltura/playkit-js-bumper/commit/24c5610))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/kaltura/playkit-js-bumper/compare/v1.3.0...v1.3.1) (2019-07-28)


### Bug Fixes

* **FEC-9250:** when a wrong bumper url is configured, no replay icon is displayed in the end of the video ([#16](https://github.com/kaltura/playkit-js-bumper/issues/16)) ([a356bf3](https://github.com/kaltura/playkit-js-bumper/commit/a356bf3))
* **FEC-9255:** the playback started during pre-bumper ([#17](https://github.com/kaltura/playkit-js-bumper/issues/17)) ([6f051f0](https://github.com/kaltura/playkit-js-bumper/commit/6f051f0))
* **FEC-9265:** post bumper pre-loaded too early ([#18](https://github.com/kaltura/playkit-js-bumper/issues/18)) ([575ab86](https://github.com/kaltura/playkit-js-bumper/commit/575ab86))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/kaltura/playkit-js-bumper/compare/v1.2.0...v1.3.0) (2019-07-22)


### Features

* **FEC-9227:** support reInit of MSE ([#14](https://github.com/kaltura/playkit-js-bumper/issues/14)) ([8ef7f08](https://github.com/kaltura/playkit-js-bumper/commit/8ef7f08))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/kaltura/playkit-js-bumper/compare/v1.1.0...v1.2.0) (2019-07-19)


### Bug Fixes

* **FEC-9217:** Youbora fired adPause and adStop events when the bumper finished ([#12](https://github.com/kaltura/playkit-js-bumper/issues/12)) ([ca57203](https://github.com/kaltura/playkit-js-bumper/commit/ca57203))
* playback rate returns to default after bumper ([#15](https://github.com/kaltura/playkit-js-bumper/issues/15)) ([4c0f9ee](https://github.com/kaltura/playkit-js-bumper/commit/4c0f9ee))


### Features

* **FEC-9159:** preload support ([#13](https://github.com/kaltura/playkit-js-bumper/issues/13)) ([e32a75d](https://github.com/kaltura/playkit-js-bumper/commit/e32a75d))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/kaltura/playkit-js-bumper/compare/v1.0.3...v1.1.0) (2019-07-07)


### Bug Fixes

* **FEC-9228:** the bumper failed to be play correctly when bootstrap library using for the player ([#11](https://github.com/kaltura/playkit-js-bumper/issues/11)) ([7a3550b](https://github.com/kaltura/playkit-js-bumper/commit/7a3550b))


### Features

* **FEC-9145:** support non sibling video tags ([#10](https://github.com/kaltura/playkit-js-bumper/issues/10)) ([2dadc02](https://github.com/kaltura/playkit-js-bumper/commit/2dadc02))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/kaltura/playkit-js-bumper/compare/v1.0.2...v1.0.3) (2019-06-24)


### Bug Fixes

* **FEC-9211:** full screen not applied on the bumper ([#8](https://github.com/kaltura/playkit-js-bumper/issues/8)) ([f5f0ee3](https://github.com/kaltura/playkit-js-bumper/commit/f5f0ee3))
* **FEC-9214:** the player stuck after pre-roll when bumper.disableMediaPreload is true ([#9](https://github.com/kaltura/playkit-js-bumper/issues/9)) ([7486475](https://github.com/kaltura/playkit-js-bumper/commit/7486475))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/kaltura/playkit-js-bumper/compare/v1.0.1...v1.0.2) (2019-06-23)


### Bug Fixes

* AD_MANIFEST_LOADED fired when no url configured ([#7](https://github.com/kaltura/playkit-js-bumper/issues/7)) ([84f43bd](https://github.com/kaltura/playkit-js-bumper/commit/84f43bd))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/kaltura/playkit-js-bumper/compare/v1.0.0...v1.0.1) (2019-06-23)


### Bug Fixes

* **FEC-9191:** when clickthrough isn't configured, the bumper doesn't paused by clicking ([#4](https://github.com/kaltura/playkit-js-bumper/issues/4)) ([8805919](https://github.com/kaltura/playkit-js-bumper/commit/8805919))
* **FEC-9192:** post bumper doesn't play ([#3](https://github.com/kaltura/playkit-js-bumper/issues/3)) ([9c69967](https://github.com/kaltura/playkit-js-bumper/commit/9c69967))
* **FEC-9193:** the bumper isn't extended to all player area ([#6](https://github.com/kaltura/playkit-js-bumper/issues/6)) ([6855970](https://github.com/kaltura/playkit-js-bumper/commit/6855970))
* **FEC-9195:** the media doesn't auto continue after the bumper finished, when disableMediaPreLoad is true ([#5](https://github.com/kaltura/playkit-js-bumper/issues/5)) ([e91fe11](https://github.com/kaltura/playkit-js-bumper/commit/e91fe11))



<a name="1.0.0"></a>
# 1.0.0 (2019-06-13)


### Features

* **FEC-8631:** bumper plugin ([#1](https://github.com/kaltura/playkit-js-bumper/issues/1)) ([a80b298](https://github.com/kaltura/playkit-js-bumper/commit/a80b298))
