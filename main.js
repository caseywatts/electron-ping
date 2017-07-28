const {app, Menu, Tray} = require('electron')
const notify = require('electron-main-notification')

let tray = null
const onClickChangeIcon = function () {
  tray.setImage('arrows2.png')
}
const onClickTriggerNotification = function () {
  notify('hi')
}

const startToPing = function () {
  setInterval(() => { notify('hi') }, 1000)
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
