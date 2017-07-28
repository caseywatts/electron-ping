const {app, Menu, Tray} = require('electron')

let tray = null
const changeIconAction = function () {
  { tray.setImage('arrows2.png');
}

app.on('ready', () => {
  tray = new Tray('arrows.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'change icon', click: changeIconAction }},
    {role: 'quit'}
  ])
  tray.setToolTip('Electron Ping')
  tray.setContextMenu(contextMenu)
})
