const notify = require('electron-main-notification')
const silentNotify = function (message) {
  notify(message, {
    silent: true
  })
}

module.exports = silentNotify;
