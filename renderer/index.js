const ElementUI = require('element-ui')
const { ipcRenderer, shell, remote } = require('electron')
const ip = require('ip')
const path = require('path')
require('./form-config')
Vue.use(ElementUI)

const CSV_FOLDER_PATH = path.resolve(remote.app.getPath('userData'), 'local/*')
let vueApp
ipcRenderer.on('config-data', (evt, data) => {
  vueApp.port = data.port
  vueApp.webPort = data.webPort
})

vueApp = new Vue({
  el: '#app',
  data: {
    started: false,
    port: 8001,
    webPort: 8002,
    ip: ip.address()
  },
  methods: {
    openConfigWin () {
      ipcRenderer.send('show-win-config')
    },
    openCsvFolder () {
      shell.showItemInFolder(CSV_FOLDER_PATH)
    },
    openProxyWeb () {
      shell.openExternal(`http://localhost:${this.webPort}`)
    },
    startProxy () {
      ipcRenderer.send('start-proxy')
      this.started = true
    }
  }
})