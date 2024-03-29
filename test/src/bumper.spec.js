import {core, setup} from '@playkit-js/kaltura-player-js';
// eslint-disable-next-line no-unused-vars
import bumper from '../../src';
import {BumperBreakType} from '../../src/bumper';
import * as TestUtils from './utils/test-utils';

const {EventManager} = core;
const targetId = 'player-placeholder_bumper.spec';
const BUMPER_URL = 'https://cfvod.kaltura.com/pd/p/2196781/sp/219678100/serveFlavor/entryId/0_w9ud0vch/v/2/ev/2/flavorId/0_5zn1596c/name/a.mp4',
  config = {
    targetId,
    provider: {},
    plugins: {
      bumper: {
        id: '1234',
        clickThroughUrl: 'some/url',
        url: BUMPER_URL
      }
    }
  },
  sources = {
    progressive: [
      {
        mimetype: 'video/mp4',
        url: 'https://cfvod.kaltura.com/pd/p/1740481/sp/174048100/serveFlavor/entryId/1_kbyh1guy/v/1/flavorId/1_hq6oztva/name/a.mp4'
      }
    ]
  };

const BUMPER_DURATION = 4;
const CONTENT_DURATION = 232;

function validateAdParams(event, isAdDataLoaded) {
  event.payload.ad.bumper.should.be.true;
  event.payload.ad.id.should.equal('1234');
  event.payload.ad.clickThroughUrl.should.equal('some/url');
  event.payload.ad.url.should.equal(BUMPER_URL);
  isAdDataLoaded ? Math.floor(event.payload.ad.duration).should.equal(BUMPER_DURATION) : null;
}

function validateAdBreakParams(event, isPreroll) {
  event.payload.adBreak.numAds.should.equal(1);
  isPreroll
    ? event.payload.adBreak.position.should.equal(BumperBreakType.PREROLL)
    : event.payload.adBreak.position.should.equal(BumperBreakType.POSTROLL);
  isPreroll ? event.payload.adBreak.type.should.equal('preroll') : event.payload.adBreak.type.should.equal('postroll');
}

function validateAdProgressParams(event) {
  event.payload.adProgress.currentTime.should.be.gt(0);
  Math.floor(event.payload.adProgress.duration).should.equal(BUMPER_DURATION);
}

describe('Bumper', () => {
  let player, eventManager;
  before(function () {
    TestUtils.createElement('DIV', targetId);
  });
  beforeEach(() => {
    player = setup(config);
    eventManager = new EventManager();
  });
  afterEach(() => {
    player.destroy();
    eventManager.destroy();
    TestUtils.removeVideoElementsFromTestPage();
  });
  describe('Sibling video tags', () => {
    it('Should play pre and post bumper and fire events', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        try {
          event.payload.adBreaksPosition.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
        } catch (e) {
          done(e);
        }
        eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
          try {
            validateAdParams(event, false);
          } catch (e) {
            done(e);
          }
          eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
            try {
              validateAdBreakParams(event, true);
            } catch (e) {
              done(e);
            }
            eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
              try {
                validateAdParams(event, true);
              } catch (e) {
                done(e);
              }
              eventManager.listenOnce(player, player.Event.AD_PROGRESS, event => {
                try {
                  validateAdProgressParams(event);
                } catch (e) {
                  done(e);
                }
                eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
                  eventManager.listenOnce(player, player.Event.AD_RESUMED, () => {
                    eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
                      eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
                        eventManager.listenOnce(player, player.Event.PLAYING, () => {
                          eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
                            try {
                              validateAdBreakParams(event, false);
                            } catch (e) {
                              done(e);
                            }
                            eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
                              try {
                                validateAdParams(event, true);
                              } catch (e) {
                                done(e);
                              }
                              eventManager.listenOnce(player, player.Event.AD_PROGRESS, event => {
                                try {
                                  validateAdProgressParams(event);
                                } catch (e) {
                                  done(e);
                                }
                                eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
                                  eventManager.listenOnce(player, player.Event.AD_RESUMED, () => {
                                    eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
                                      eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
                                        eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
                                          done();
                                        });
                                      });
                                    });
                                  });
                                  player.play();
                                });
                                player.pause();
                              });
                            });
                          });
                          player.currentTime = player.duration;
                        });
                      });
                    });
                  });
                  player.play();
                });
                player.pause();
              });
            });
          });
        });
      });
      player.configure({sources});
      player.play();
    });

    it('Should play pre roll only', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        try {
          event.payload.adBreaksPosition.should.deep.equal([BumperBreakType.PREROLL]);
        } catch (e) {
          done(e);
        }
        eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
          try {
            validateAdBreakParams(event, true);
          } catch (e) {
            done(e);
          }
          eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
            eventManager.listenOnce(player, player.Event.FIRST_PLAY, () => {
              done();
            });
          });
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should play post roll only', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        try {
          event.payload.adBreaksPosition.should.deep.equal([BumperBreakType.POSTROLL]);
        } catch (e) {
          done(e);
        }
        eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
          try {
            validateAdBreakParams(event, false);
          } catch (e) {
            done(e);
          }
          eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
            done();
          });
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL]
          }
        },
        sources
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        player.currentTime = player.duration;
      });
      player.play();
    });

    it('Should load the content while the bumper playing', done => {
      eventManager.listenOnce(player, player.Event.LOAD_START, () => {
        eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should load the content only once the bumper finished', done => {
      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL],
            disableMediaPreload: true
          }
        },
        sources
      });
      player.play();
    });

    it('Should load the content only once the bumper load failed', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, () => {
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url',
            position: [BumperBreakType.PREROLL],
            disableMediaPreload: true
          }
        },
        sources
      });
      player.load();
    });

    it('Should load the content only once the bumper play failed', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, () => {
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url',
            position: [BumperBreakType.PREROLL],
            disableMediaPreload: true
          }
        },
        sources
      });
      player.play();
    });

    it('Should do nothing if no url given', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, () => {
        done(new Error('AD_MANIFEST_LOADED should not triggered when no url is given'));
      });
      eventManager.listenOnce(player, player.Event.AD_ERROR, () => {
        done(new Error('Should not try load bumper when no url is given'));
      });
      setTimeout(done, 1000);
      player.configure({
        plugins: {
          bumper: {
            url: ''
          }
        },
        sources
      });
      player.play();
    });

    it('Should not trigger AD_PAUSED on finish', done => {
      eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
        done(new Error('AD_PAUSED should not triggered on finish'));
      });
      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
        done();
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL],
            disableMediaPreload: true
          }
        },
        sources
      });
      player.play();
    });

    it('Should pre load the bumper by config', done => {
      eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
        try {
          validateAdParams(event, false);
        } catch (e) {
          done(e);
        }
        done();
      });
      player.configure({
        playback: {
          preload: 'auto'
        },
        sources
      });
    });

    it('Should not pre load the bumper by default', done => {
      eventManager.listenOnce(player, player.Event.AD_LOADED, () => {
        done(new Error('Should not pre load the bumper when no configured explicitly'));
      });
      player.configure({sources});
      setTimeout(done, 1000);
    });

    it('Should not pre load the post bumper', done => {
      eventManager.listenOnce(player, player.Event.AD_LOADED, () => {
        done(new Error('Should not pre load the post bumper'));
      });
      player.configure({
        playback: {
          preload: 'auto'
        },
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL]
          }
        },
        sources
      });
      setTimeout(done, 1000);
    });

    it('Should load the post bumper 3 seconds before the end', done => {
      eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
        try {
          validateAdParams(event, false);
          player.currentTime.should.be.gt(player.duration - 3);
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL]
          }
        },
        sources
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        player.currentTime = player.duration - BUMPER_DURATION;
      });
      player.play();
    });

    it('Should fire AD_LOADED once - preload true and and post-roll position', done => {
      let counter = 0;
      eventManager.listen(player, player.Event.AD_LOADED, () => {
        counter++;
      });
      eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
        try {
          counter.should.equal(1);
          done();
        } catch (e) {
          done(e);
        }
      });
      player.currentTime = player.duration;
      player.configure({
        plugins: {
          bumper: {
            preload: 'auto',
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should fire AD_LOADED once - preload false and pre-roll position', done => {
      let counter = 0;
      eventManager.listen(player, player.Event.AD_LOADED, () => {
        counter++;
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        eventManager.listenOnce(player, player.Event.ENDED, () => {
          eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
            try {
              counter.should.equal(1);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
        player.currentTime = player.duration;
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should fire AD_LOADED twice - both - pre-roll & post-roll position', done => {
      let counter = 0;
      eventManager.listen(player, player.Event.AD_LOADED, () => {
        counter++;
      });
      eventManager.listenOnce(player, player.Event.AD_BREAK_START, () => {
        eventManager.listenOnce(player, player.Event.PLAYING, () => {
          eventManager.listenOnce(player, player.Event.ENDED, () => {
            eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
              try {
                counter.should.equal(2);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
          player.currentTime = player.duration;
        });
      });
      player.configure({sources});
      setTimeout(() => player.play(), 1000);
    });

    it('Should avoid config invalid position', () => {
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperBreakType.PREROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperBreakType.POSTROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.POSTROLL);
      player.configure({plugins: {bumper: {position: [BumperBreakType.PREROLL, -2]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
      player.configure({plugins: {bumper: {position: [-2]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperBreakType.POSTROLL, BumperBreakType.PREROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperBreakType.PREROLL, 1, BumperBreakType.POSTROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
      player.configure({plugins: {bumper: {position: []}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
      player.configure({plugins: {bumper: {position: null}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperBreakType.PREROLL);
    });

    it('Should handle invalid bumper url', done => {
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        eventManager.listenOnce(player, player.Event.PLAYBACK_ENDED, () => {
          done();
        });
        player.currentTime = player.duration;
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should handle invalid pre bumper url', done => {
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        eventManager.listenOnce(player, player.Event.PLAYBACK_ENDED, () => {
          done();
        });
        player.currentTime = player.duration;
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL],
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should handle invalid post bumper url', done => {
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        eventManager.listenOnce(player, player.Event.PLAYBACK_ENDED, () => {
          done();
        });
        player.currentTime = player.duration;
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL],
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should play post bumper even the pre bumper is failed', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, () => {
        eventManager.listenOnce(player, player.Event.PLAYING, () => {
          eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
            try {
              validateAdParams(event, true);
              done();
            } catch (e) {
              done(e);
            }
          });
          player.configure({
            plugins: {
              bumper: {
                url: BUMPER_URL
              }
            }
          });
          player.currentTime = player.duration;
        });
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should call to player play after pre bumper finish', done => {
      eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
        eventManager.listenOnce(player, player.Event.PLAY, () => {
          done();
        });
      });
      player.configure({sources});
      player.play();
      player.play();
    });

    it('Should fire AD_AUTOPLAY_FAILED when the play promise failed', done => {
      let sandbox = sinon.createSandbox();
      eventManager.listenOnce(player, player.Event.AD_AUTOPLAY_FAILED, () => {
        try {
          player.plugins.bumper._adBreak.should.be.false;
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      sandbox.stub(player.plugins.bumper._videoElement, 'play').callsFake(function () {
        return Promise.reject();
      });
      player.play();
    });

    it('Should show the bumper video while playing', done => {
      eventManager.listenOnce(player, player.Event.AD_STARTED, () => {
        try {
          setTimeout(() => {
            player.plugins.bumper._bumperVideoElement.style.visibility.should.equal('');
            done();
          });
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should fire AD_ERROR with error params', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, error => {
        try {
          setTimeout(() => {
            error.payload.code.should.exist;
            error.payload.data.innerError.should.exist;
            done();
          });
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should update the click through url', () => {
      player.configure({sources});
      player.plugins.bumper._bumperClickThroughDiv.href.endsWith('some/url').should.be.true;
      player.configure({plugins: {bumper: {clickThroughUrl: 'some/updated/url'}}});
      player.plugins.bumper._bumperClickThroughDiv.href.endsWith('some/updated/url').should.be.true;
    });
  });

  describe('Non sibling video tags', () => {
    let sandbox = sinon.createSandbox();
    beforeEach(() => {
      sandbox.stub(player.plugins.bumper, 'playOnMainVideoTag').callsFake(() => {
        return true;
      });
    });
    it('Should play pre and post bumper and fire events', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        try {
          event.payload.adBreaksPosition.should.deep.equal([BumperBreakType.PREROLL, BumperBreakType.POSTROLL]);
        } catch (e) {
          done(e);
        }
        eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
          try {
            validateAdParams(event, false);
          } catch (e) {
            done(e);
          }
          eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
            try {
              player.getVideoElement().src.should.equal(BUMPER_URL);
              validateAdBreakParams(event, true);
            } catch (e) {
              done(e);
            }
            eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
              try {
                validateAdParams(event, true);
              } catch (e) {
                done(e);
              }
              eventManager.listenOnce(player, player.Event.AD_PROGRESS, event => {
                try {
                  validateAdProgressParams(event);
                } catch (e) {
                  done(e);
                }
                eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
                  eventManager.listenOnce(player, player.Event.AD_RESUMED, () => {
                    eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
                      eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
                        eventManager.listenOnce(player, player.Event.PLAYING, () => {
                          eventManager.listenOnce(player, player.Event.AD_LOADED, () => {
                            eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
                              try {
                                validateAdBreakParams(event, false);
                              } catch (e) {
                                done(e);
                              }
                              eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
                                try {
                                  validateAdParams(event, true);
                                } catch (e) {
                                  done(e);
                                }
                                eventManager.listenOnce(player, player.Event.AD_PROGRESS, event => {
                                  try {
                                    validateAdProgressParams(event);
                                  } catch (e) {
                                    done(e);
                                  }
                                  eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
                                    eventManager.listenOnce(player, player.Event.AD_RESUMED, () => {
                                      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
                                        eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
                                          eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
                                            eventManager.listenOnce(player, player.Event.PLAYBACK_ENDED, () => {
                                              done();
                                            });
                                          });
                                        });
                                      });
                                    });
                                    player.play();
                                  });
                                  player.pause();
                                });
                              });
                            });
                          });
                          player.currentTime = player.duration;
                        });
                      });
                    });
                  });
                  player.play();
                });
                player.pause();
              });
            });
          });
        });
      });
      player.configure({sources});
      player.play();
    });

    it('Should mask the player api while pre bumper', done => {
      eventManager.listenOnce(player, player.Event.AD_PROGRESS, () => {
        try {
          player.getVideoElement().src.should.equal(BUMPER_URL);
          player.currentTime.should.equal(BumperBreakType.PREROLL);
          isNaN(player.duration).should.be.true;
          player.paused.should.be.true;
          player.ended.should.be.false;
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should mask the player api while post bumper', done => {
      eventManager.listenOnce(player, player.Event.AD_PROGRESS, () => {
        try {
          player.getVideoElement().src.should.equal(BUMPER_URL);
          Math.floor(player.currentTime).should.equal(CONTENT_DURATION);
          Math.floor(player.duration).should.equal(CONTENT_DURATION);
          player.paused.should.be.true;
          player.ended.should.be.true;
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL]
          }
        },
        sources
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        player.currentTime = player.duration;
      });
      player.play();
    });

    it('Should mask the player events while the bumper', done => {
      eventManager.listenOnce(player, player.Event.LOADED_DATA, () => {
        done(new Error('LOADED_DATA should not triggered while bumper playing'));
      });
      eventManager.listenOnce(player, player.Event.PLAY, () => {
        done(new Error('PLAY should not triggered while bumper playing'));
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        done(new Error('PLAYING should not triggered while bumper playing'));
      });
      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
        try {
          player.getVideoElement().src.should.equal(BUMPER_URL);
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should mask the bumper loading events', done => {
      eventManager.listenOnce(player, player.Event.LOAD_START, () => {
        done(new Error('LOAD_START should not triggered while bumper loading'));
      });
      setTimeout(done, 100);
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.load();
    });

    it('Should mask the bumper loading error', done => {
      eventManager.listenOnce(player, player.Event.ERROR, () => {
        done(new Error('ERROR should not triggered while bumper loading'));
      });
      setTimeout(done, 100);
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL],
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.load();
    });

    it('Should load the content only once the bumper finished', done => {
      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
        try {
          player.getVideoElement().src.should.equal(BUMPER_URL);
        } catch (e) {
          done(e);
        }
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should load the content only once the bumper load failed', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, () => {
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          eventManager.listenOnce(player, player.Event.PLAYING, () => {
            done();
          });
          player.play();
        });
      });
      player.configure({
        playback: {
          preload: 'auto'
        },
        plugins: {
          bumper: {
            url: 'some/invalid/url',
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.load();
    });

    it('Should load the content only once the bumper play failed', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, () => {
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url',
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should not trigger AD_PAUSED on finish', done => {
      eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
        done(new Error('AD_PAUSED should not triggered on finish'));
      });
      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
        done();
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL],
            disableMediaPreload: true
          }
        },
        sources
      });
      player.play();
    });

    it('Should pre load the bumper by config', done => {
      eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
        try {
          validateAdParams(event, false);
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        playback: {
          preload: 'auto'
        },
        sources
      });
    });

    it('Should not load the post bumper while playback', done => {
      eventManager.listenOnce(player, player.Event.AD_LOADED, () => {
        try {
          player.ended.should.be.true;
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        playback: {
          preload: 'auto'
        },
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL]
          }
        },
        sources
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        player.currentTime = player.duration - 2;
      });
      player.play();
    });

    it('Should not pre load the bumper by default', done => {
      eventManager.listenOnce(player, player.Event.AD_LOADED, () => {
        done(new Error('Should not pre load the bumper when no configured explicitly'));
      });
      player.configure({sources});
      setTimeout(done, 1000);
    });

    it('Should fire AD_LOADED twice - preload false', done => {
      let counter = 0;
      eventManager.listen(player, player.Event.AD_LOADED, () => {
        counter++;
      });
      eventManager.listenOnce(player, player.Event.AD_BREAK_START, () => {
        eventManager.listenOnce(player, player.Event.PLAYING, () => {
          eventManager.listenOnce(player, player.Event.ENDED, () => {
            eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
              try {
                counter.should.equal(2);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
          player.currentTime = player.duration;
        });
      });
      player.configure({sources});
      setTimeout(() => player.play(), 1000);
    });

    it('Should fire AD_LOADED twice - preload true', done => {
      let counter = 0;
      eventManager.listen(player, player.Event.AD_LOADED, () => {
        counter++;
      });
      eventManager.listenOnce(player, player.Event.AD_BREAK_START, () => {
        eventManager.listenOnce(player, player.Event.PLAYING, () => {
          eventManager.listenOnce(player, player.Event.ENDED, () => {
            eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
              try {
                counter.should.equal(2);
                done();
              } catch (e) {
                done(e);
              }
            });
          });
          player.currentTime = player.duration;
        });
      });
      player.configure({
        playback: {
          preload: 'auto'
        },
        sources
      });
      setTimeout(() => player.play(), 1000);
    });

    it('Should handle invalid bumper url', done => {
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        eventManager.listenOnce(player, player.Event.PLAYBACK_ENDED, () => {
          done();
        });
        player.currentTime = player.duration;
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should handle invalid pre bumper url', done => {
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        eventManager.listenOnce(player, player.Event.PLAYBACK_ENDED, () => {
          done();
        });
        player.currentTime = player.duration;
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL],
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should handle invalid post bumper url', done => {
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        eventManager.listenOnce(player, player.Event.PLAYBACK_ENDED, () => {
          done();
        });
        player.currentTime = player.duration;
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.POSTROLL],
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should play post bumper even the pre bumper is failed', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, () => {
        eventManager.listenOnce(player, player.Event.PLAYING, () => {
          eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
            try {
              validateAdParams(event, true);
              done();
            } catch (e) {
              done(e);
            }
          });
          player.configure({
            plugins: {
              bumper: {
                url: BUMPER_URL
              }
            }
          });
          player.currentTime = player.duration;
        });
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should fire AD_AUTOPLAY_FAILED when the play promise failed', done => {
      eventManager.listenOnce(player, player.Event.AD_AUTOPLAY_FAILED, () => {
        try {
          player.plugins.bumper._adBreak.should.be.false;
          done();
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      sandbox.stub(player.plugins.bumper._videoElement, 'play').callsFake(function () {
        return Promise.reject();
      });
      player.play();
    });

    it('Should hide the bumper video while playing', done => {
      eventManager.listenOnce(player, player.Event.AD_STARTED, () => {
        try {
          setTimeout(() => {
            player.plugins.bumper._bumperVideoElement.style.visibility.should.equal('hidden');
            done();
          });
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperBreakType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should fire AD_ERROR with error params', done => {
      eventManager.listenOnce(player, player.Event.AD_ERROR, error => {
        try {
          setTimeout(() => {
            error.payload.code.should.exist;
            error.payload.data.innerError.should.exist;
            done();
          });
        } catch (e) {
          done(e);
        }
      });
      player.configure({
        plugins: {
          bumper: {
            url: 'some/invalid/url'
          }
        },
        sources
      });
      player.play();
    });

    it('Should update the click through url', () => {
      player.configure({sources});
      player.plugins.bumper._bumperClickThroughDiv.href.endsWith('some/url').should.be.true;
      player.configure({plugins: {bumper: {clickThroughUrl: 'some/updated/url'}}});
      player.plugins.bumper._bumperClickThroughDiv.href.endsWith('some/updated/url').should.be.true;
    });
  });
});
