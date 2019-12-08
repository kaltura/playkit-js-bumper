import {loadPlayer, EventManager} from '@playkit-js/playkit-js';
// eslint-disable-next-line no-unused-vars
import bumper from '../../src';
import {BumperType} from '../../src/bumper';

const BUMPER_URL = 'https://cfvod.kaltura.com/pd/p/2196781/sp/219678100/serveFlavor/entryId/0_w9ud0vch/v/2/ev/2/flavorId/0_5zn1596c/name/a.mp4',
  config = {
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
  isPreroll ? event.payload.adBreak.position.should.equal(BumperType.PREROLL) : event.payload.adBreak.position.should.equal(BumperType.POSTROLL);
  isPreroll ? event.payload.adBreak.type.should.equal('preroll') : event.payload.adBreak.type.should.equal('postroll');
}

function validateAdProgressParams(event) {
  event.payload.adProgress.currentTime.should.be.gt(0);
  Math.floor(event.payload.adProgress.duration).should.equal(BUMPER_DURATION);
}

describe('Bumper', () => {
  let player, eventManager;
  beforeEach(() => {
    player = loadPlayer(config);
    eventManager = new EventManager();
  });
  afterEach(() => {
    player.destroy();
    eventManager.destroy();
  });
  describe('Sibling video tags', () => {
    it('Should play pre and post bumper and fire events', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        try {
          event.payload.adBreaksPosition.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
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
                          eventManager.listenOnce(player, player.Event.ENDED, () => {
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
          event.payload.adBreaksPosition.should.deep.equal([BumperType.PREROLL]);
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
            position: [BumperType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should play post roll only', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        try {
          event.payload.adBreaksPosition.should.deep.equal([BumperType.POSTROLL]);
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
            position: [BumperType.POSTROLL]
          }
        },
        sources
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        player.currentTime = player.duration;
      });
      player.play();
    });

    it('Should load the content while the bumper', done => {
      eventManager.listenOnce(player, player.Event.LOAD_START, () => {
        eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should not load the content while the bumper', done => {
      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [BumperType.PREROLL],
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
            position: [BumperType.PREROLL],
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
            position: [BumperType.POSTROLL]
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
            position: [BumperType.POSTROLL]
          }
        },
        sources
      });
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        player.currentTime = player.duration - BUMPER_DURATION;
      });
      player.play();
    });

    it('Should fire AD_LOADED once - preload false', done => {
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
      player.configure({sources});
      setTimeout(() => player.play(), 1000);
    });

    it('Should fire AD_LOADED once - preload true', done => {
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
        playback: {
          preload: 'auto'
        },
        sources
      });
      setTimeout(() => player.play(), 1000);
    });

    it('Should avoid config invalid position', () => {
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperType.PREROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperType.POSTROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.POSTROLL);
      player.configure({plugins: {bumper: {position: [BumperType.PREROLL, -2]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
      player.configure({plugins: {bumper: {position: [-2]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperType.POSTROLL, BumperType.PREROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
      player.configure({plugins: {bumper: {position: [BumperType.PREROLL, 1, BumperType.POSTROLL]}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
      player.configure({plugins: {bumper: {position: []}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
      player.configure({plugins: {bumper: {position: null}}});
      player.plugins.bumper.config.position.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
      player.plugins.bumper._adBreakPosition.should.equal(BumperType.PREROLL);
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
            position: [BumperType.PREROLL],
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
            position: [BumperType.POSTROLL],
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

    it('Should fire AD_PLAY_FAILED when the play promise failed', done => {
      let sandbox = sinon.sandbox.create();
      eventManager.listenOnce(player, player.Event.AD_PLAY_FAILED, () => {
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
            position: [BumperType.PREROLL]
          }
        },
        sources
      });
      sandbox.stub(player.plugins.bumper._videoElement, 'play').callsFake(function() {
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
            position: [BumperType.PREROLL]
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
  });

  describe('Non sibling video tags', () => {
    let sandbox = sinon.sandbox.create();
    beforeEach(() => {
      sandbox.stub(player.plugins.bumper, 'playOnMainVideoTag').callsFake(() => {
        return true;
      });
    });
    it('Should play pre and post bumper and fire events', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        try {
          event.payload.adBreaksPosition.should.deep.equal([BumperType.PREROLL, BumperType.POSTROLL]);
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
                          eventManager.listenOnce(player, player.Event.ENDED, () => {
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
          player.currentTime.should.equal(BumperType.PREROLL);
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
            position: [BumperType.PREROLL]
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
            position: [BumperType.POSTROLL]
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
            position: [BumperType.PREROLL]
          }
        },
        sources
      });
      player.play();
    });

    it('Should not load the content while the bumper', done => {
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
            position: [BumperType.PREROLL]
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
            position: [BumperType.PREROLL],
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
            position: [BumperType.POSTROLL]
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
      player.configure({sources});
      setTimeout(() => player.play(), 1000);
    });

    it('Should fire AD_LOADED twice - preload true', done => {
      let counter = 0;
      eventManager.listen(player, player.Event.AD_LOADED, () => {
        counter++;
      });
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
            position: [BumperType.PREROLL],
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
            position: [BumperType.POSTROLL],
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

    it('Should fire AD_PLAY_FAILED when the play promise failed', done => {
      eventManager.listenOnce(player, player.Event.AD_PLAY_FAILED, () => {
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
            position: [BumperType.PREROLL]
          }
        },
        sources
      });
      sandbox.stub(player.plugins.bumper._videoElement, 'play').callsFake(function() {
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
            position: [BumperType.PREROLL]
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
  });
});
