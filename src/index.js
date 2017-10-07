/* eslint no-invalid-this: off */
/* eslint consistent-this: off */
/* eslint consistent-return: off */

'use strict';

/**
 * Class: net.Server
 * Event: 'close'
 *
 * Emitted when the server closes. Note that if connections exist, this event is not emitted
 * until all connections are ended.
 *
 * @link https://nodejs.org/dist/latest-v6.x/docs/api/net.html#net_event_close
 *
 * @param {Function} callback
 *
 * @returns {undefined|*}
 */
function closeEvent( callback ) {
  /**
   * @property {Object} sockets
   */
  var Server = this;

  if ( Server.debug ) {
    console.log( '[info]', new Date(), 'net.Server closed' );
  }

  if ( typeof Server.sockets === 'object' ) {
    Object.keys( Server.sockets ).forEach(
      /**
       * @param {string} key
       *
       * @returns {undefined}
       */
      function ( key ) {
        if ( !Server.sockets[ key ].destroyed && Server.debug ) {
          console.warn( '[warn]', new Date(), 'net.Server sockets still open', key );
        }
      }
    );
  }

  if ( callback instanceof Function ) {
    return callback();
  }
}

module.exports = closeEvent;
