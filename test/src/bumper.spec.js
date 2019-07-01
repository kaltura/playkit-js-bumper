import {loadPlayer, EventManager, Utils} from '@playkit-js/playkit-js';
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
  describe('Sibling video tags', () => {
    let player, eventManager;
    beforeEach(() => {
      eventManager = new EventManager();
    });
    afterEach(() => {
      player.destroy();
      eventManager.destroy();
    });
    it('should play pre and post bumper and fire events', done => {
      player = loadPlayer(config);
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

    it('should play pre roll only', done => {
      player = loadPlayer(
        Utils.Object.mergeDeep(config, {
          plugins: {
            bumper: {
              position: [0]
            }
          }
        })
      );
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
      player.configure({sources});
      player.play();
    });

    it('should play post roll only', done => {
      player = loadPlayer(
        Utils.Object.mergeDeep(config, {
          plugins: {
            bumper: {
              position: [-1]
            }
          }
        })
      );
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        event.payload.adBreaksPosition.should.deep.equal([-1]);
        eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
          validateAdBreakParams(event, false);
          eventManager.listenOnce(player, player.Event.ALL_ADS_COMPLETED, () => {
            done();
          });
        });
      });
      player.configure({sources});
      eventManager.listenOnce(player, player.Event.PLAYING, () => {
        player.currentTime = player.duration;
      });
      player.play();
    });
  });
});
