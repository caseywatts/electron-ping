const {app, Menu, Tray} = require('electron')
const notify = require('electron-main-notification')
const ping = require('ping')

let tray = null
const onClickChangeIcon = function () {
  tray.setImage('arrows2.png')
}
const onClickTriggerNotification = function () {
  notify('hi')
}

const doThePing = function () {
  ping.promise.probe('google.com').then(onRecievePing)
}
const onRecievePing = function (pingResponse) {
  notify(pingResponse.time)
}
const startToPing = function () {
  setInterval(doThePing, 1000)
}

app.on('ready', () => {
  tray = new Tray('arrows.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'change icon', click: onClickChangeIcon },
    { label: 'trigger notification', click: onClickTriggerNotification },
    { role: 'quit' }
  ])
  tray.setToolTip('Electron Ping')
  tray.setContextMenu(contextMenu)
  startToPing()
})
