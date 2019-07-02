import {loadPlayer, EventManager} from '@playkit-js/playkit-js';
// eslint-disable-next-line no-unused-vars
import bumper from '../../src';

const BUMPER_URL =
    'http://qa-apache-php7.dev.kaltura.com/p/1091/sp/109100/serveFlavor/entryId/0_6r7gufsj/v/2/ev/4/flavorId/0_1c7nsvq6/forceproxy/true/name/a.mp4',
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
        url: 'http://www.html5videoplayer.net/videos/toystory.mp4'
      }
    ]
  };

function validateAdParams(event) {
  event.payload.ad.bumper.should.be.true;
  event.payload.ad.id.should.equal('1234');
  event.payload.ad.clickThroughUrl.should.equal('some/url');
  event.payload.ad.url.should.equal(BUMPER_URL);
}
function validateAdBreakParams(event, isPreroll) {
  event.payload.adBreak.numAds.should.equal(1);
  isPreroll ? event.payload.adBreak.position.should.equal(0) : event.payload.adBreak.position.should.equal(-1);
  isPreroll ? event.payload.adBreak.type.should.equal('preroll') : event.payload.adBreak.type.should.equal('postroll');
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
        event.payload.adBreaksPosition.should.deep.equal([0, -1]);
        eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
          validateAdParams(event);
          eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
            validateAdBreakParams(event, true);
            eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
              validateAdParams(event);
              eventManager.listenOnce(player, player.Event.AD_PROGRESS, event => {
                event.payload.adProgress.currentTime.should.exists;
                event.payload.adProgress.duration.should.exists;
                eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
                  eventManager.listenOnce(player, player.Event.AD_RESUMED, () => {
                    eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
                      eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
                        eventManager.listenOnce(player, player.Event.PLAYING, () => {
                          eventManager.listenOnce(player, player.Event.ENDED, () => {
                            eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
                              validateAdBreakParams(event, false);
                              eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
                                validateAdParams(event);
                                eventManager.listenOnce(player, player.Event.AD_PROGRESS, () => {
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
        event.payload.adBreaksPosition.should.deep.equal([0]);
        eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
          validateAdBreakParams(event, true);
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
            position: [0]
          }
        },
        sources
      });
      player.play();
    });

    it('Should play post roll only', done => {
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        event.payload.adBreaksPosition.should.deep.equal([-1]);
        eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
          validateAdBreakParams(event, false);
          eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
            done();
          });
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [-1]
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
            position: [0]
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
            position: [0],
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
        event.payload.adBreaksPosition.should.deep.equal([0, -1]);
        eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
          player.getVideoElement().src.should.equal(BUMPER_URL);
          validateAdParams(event);
          eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
            validateAdBreakParams(event, true);
            eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
              validateAdParams(event);
              eventManager.listenOnce(player, player.Event.AD_PROGRESS, event => {
                event.payload.adProgress.currentTime.should.exists;
                event.payload.adProgress.duration.should.exists;
                eventManager.listenOnce(player, player.Event.AD_PAUSED, () => {
                  eventManager.listenOnce(player, player.Event.AD_RESUMED, () => {
                    eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
                      eventManager.listenOnce(player, player.Event.AD_BREAK_END, () => {
                        eventManager.listenOnce(player, player.Event.PLAYING, () => {
                          eventManager.listenOnce(player, player.Event.ENDED, () => {
                            eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
                              validateAdBreakParams(event, false);
                              eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
                                validateAdParams(event);
                                eventManager.listenOnce(player, player.Event.AD_PROGRESS, () => {
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

    it('Should mask the player api while pre bumper', done => {
      eventManager.listenOnce(player, player.Event.AD_PROGRESS, () => {
        player.getVideoElement().src.should.equal(BUMPER_URL);
        player.currentTime.should.equal(0);
        isNaN(player.duration).should.be.true;
        player.paused.should.be.true;
        player.ended.should.be.false;
        done();
      });
      player.configure({
        plugins: {
          bumper: {
            position: [0]
          }
        },
        sources
      });
      player.play();
    });

    it('Should mask the player api while post bumper', done => {
      eventManager.listenOnce(player, player.Event.AD_PROGRESS, () => {
        player.getVideoElement().src.should.equal(BUMPER_URL);
        player.currentTime.should.equal(149.95);
        player.duration.should.equal(149.95);
        player.paused.should.be.true;
        player.ended.should.be.true;
        done();
      });
      player.configure({
        plugins: {
          bumper: {
            position: [-1]
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
        player.getVideoElement().src.should.equal(BUMPER_URL);
        done();
      });
      player.configure({
        plugins: {
          bumper: {
            position: [0]
          }
        },
        sources
      });
      player.play();
    });

    it('Should not load the content while the bumper', done => {
      eventManager.listenOnce(player, player.Event.AD_COMPLETED, () => {
        player.getVideoElement().src.should.equal(BUMPER_URL);
        eventManager.listenOnce(player, player.Event.LOAD_START, () => {
          done();
        });
      });
      player.configure({
        plugins: {
          bumper: {
            position: [0]
          }
        },
        sources
      });
      player.play();
    });
  });
});
