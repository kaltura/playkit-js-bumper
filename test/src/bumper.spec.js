import {loadPlayer, EventManager} from '@playkit-js/playkit-js';
// eslint-disable-next-line no-unused-vars
import bumper from '../../src';

const BUMPER_URL =
  'http://qa-apache-php7.dev.kaltura.com/p/1091/sp/109100/serveFlavor/entryId/0_6r7gufsj/v/2/ev/4/flavorId/0_1c7nsvq6/forceproxy/true/name/a.mp4';
describe('Bumper', () => {
  describe('Sibling video tags', () => {
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
    let player;
    const eventManager = new EventManager();
    after(() => {
      player.destroy();
    });
    it('should play pre and post bumper and fire events', done => {
      const config = {
        plugins: {
          bumper: {
            id: '1234',
            clickThroughUrl: 'some/url',
            url: BUMPER_URL
          }
        }
      };
      player = loadPlayer(config);
      eventManager.listenOnce(player, player.Event.AD_MANIFEST_LOADED, event => {
        event.payload.adBreaksPosition.should.deep.equal([0, -1]);
        eventManager.listenOnce(player, player.Event.AD_LOADED, event => {
          validateAdParams(event);
          eventManager.listenOnce(player, player.Event.AD_BREAK_START, event => {
            validateAdBreakParams(event, true);
            eventManager.listenOnce(player, player.Event.AD_STARTED, event => {
              validateAdParams(event);
              eventManager.listenOnce(player, player.Event.AD_PROGRESS, () => {
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
      player.configure({
        sources: {
          progressive: [
            {
              mimetype: 'video/mp4',
              url: 'http://www.html5videoplayer.net/videos/toystory.mp4'
            }
          ]
        }
      });
      player.play();
    });
  });
});
