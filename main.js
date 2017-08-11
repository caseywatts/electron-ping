const {app, Menu, Tray} = require('electron')
const is = require('electron-is')
const startToPing = require('./pinging.js')
const iconPaths = require('./icon-paths.js')

let tray = null

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
  if (is.osx()) {
    app.dock.hide()
  }
  startToPing({tray})
})
