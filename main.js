const {app, Menu, Tray} = require('electron')
const path = require('path')
const notify = require('electron-main-notification')
const ping = require('ping')

let tray = null
let lastSeenState = null

//
// config
//

const iconPaths = {
  icon1: path.join(__dirname, 'arrows.png'),
  icon2: path.join(__dirname, 'arrows2.png')
}

const intervalDuration = 1000
const domainToPing = 'google.com'

//
// UI Interaction Code
//

const silentNotify = function (message) {
  notify(message, {
    silent: true
  })
}

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

const startToPing = function () {
  setInterval(doThePing, intervalDuration)
}

//
// tray and menu
//

const setUpTrayAndContextMenu = function () {
  tray = new Tray(iconPaths.icon1)
  const contextMenu = Menu.buildFromTemplate([
    { role: 'quit' }
  ])
  tray.setToolTip('Electron Ping')
  tray.setContextMenu(contextMenu)
}

//
// app ready, "main"
//

app.on('ready', () => {
  setUpTrayAndContextMenu()
  app.dock.hide()
  startToPing()
})
