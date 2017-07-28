const {app, Menu, Tray} = require('electron')
const path = require('path')
const notify = require('electron-main-notification')
const ping = require('ping')

let tray = null
let lastSeenState = null
const onClickChangeIcon = function () {
  tray.setImage(iconPaths.icon2)
}
const onClickTriggerNotification = function () {
  notify('hi')
}

const iconPaths = {
  icon1: path.join(__dirname, 'arrows.png'),
  icon2: path.join(__dirname, 'arrows2.png')
}
const silentNotify = function (message) {
  notify(message, {
    silent: true
  })
}

const doThePing = function () {
  ping.promise.probe('google.com').then(onRecievePing)
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

const onRecievePing = function (pingResponse) {
  const lastResponseIsAlive = pingResponse.alive
  maybeNotify(lastResponseIsAlive)
  maybeChangeIcon(lastResponseIsAlive)
}

const startToPing = function () {
  setInterval(doThePing, 1000)
}

app.on('ready', () => {
  tray = new Tray(iconPaths.icon1)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'change icon', click: onClickChangeIcon },
    { label: 'trigger notification', click: onClickTriggerNotification },
    { role: 'quit' }
  ])
  tray.setToolTip('Electron Ping')
  tray.setContextMenu(contextMenu)
  startToPing()
})
