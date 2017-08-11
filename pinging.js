const silentNotify = require('./silent-notify.js')
const iconPaths = require('./icon-paths.js')
const ping = require('ping')

let tray = null
let lastSeenState = null

//
// config
//

const intervalDuration = 1000
const domainToPing = 'google.com'

//
// UI Interaction Code
//

const maybeNotify = function (lastResponseIsAlive) {
  if (lastResponseIsAlive !== lastSeenState) {
    if (lastResponseIsAlive === true) {
      silentNotify('Wifi back on')
    } else if (lastResponseIsAlive === false) {
      silentNotify('Wifi down')
    }
    lastSeenState = lastResponseIsAlive
  }
}

const maybeChangeIcon = function (lastResponseIsAlive) {
  if (lastResponseIsAlive) {
    tray.setImage(iconPaths.icon1)
  } else {
    tray.setImage(iconPaths.icon2)
  }
}

//
// ping code
//

const onRecievePing = function (pingResponse) {
  const lastResponseIsAlive = pingResponse.alive
  maybeNotify(lastResponseIsAlive)
  maybeChangeIcon(lastResponseIsAlive)
}

const doThePing = function () {
  ping.promise.probe(domainToPing).then(onRecievePing)
}

const startToPing = function (opts) {
  tray = opts.tray
  setInterval(doThePing, intervalDuration)
}

module.exports = startToPing
