'use strict'
/* eslint-env browser, webextensions */

const browser = require('webextension-polyfill')
const choo = require('choo')
const html = require('choo/html')
const logo = require('./logo')

require('./quick-upload.css')

const app = choo()

app.use(quickUploadStore)
app.route('*', quickUploadPage)
app.mount('#root')

function quickUploadStore (state, emitter) {
  state.message = ''
  state.peerCount = 8
  state.ipfsNodeType = 'embedded'

  emitter.on('fileInputChange', async (event) => {
    const file = event.target.files[0]
    try {
      const { ipfsCompanion } = await browser.runtime.getBackgroundPage()

      const buffer = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(Buffer.from(reader.result))
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      })

      await ipfsCompanion.ipfsAddAndShow(buffer)

      // close upload tab as it will be replaced with a new tab with uploaded content
      const tab = await browser.tabs.getCurrent()
      browser.tabs.remove(tab.id)
    } catch (err) {
      console.error('Unable to perform quick upload', err)
      // keep upload tab and display error message in it
      state.message = `Unable to upload to IPFS API: ${err}`
      emitter.emit('render')
    }
  })
}

function quickUploadPage (state, emit) {
  const onFileInputChange = (e) => emit('fileInputChange', e)

  return html`
    <div class="helvetica white pt3" style="background: linear-gradient(to bottom, #041727 0%,#043b55 100%); height:100%;">
      <div class="measure-wide center pa3 tc">
        ${logo({
          size: 100,
          path: '../../icons',
          heartbeat: false
        })}
        <h1 id="quickUploadMessage" class='mb1'>
          ${browser.i18n.getMessage('panel_quickUpload')}
        </h1>
        <p id="form">
          <input type="file" id="quickUploadInput" onchange=${onFileInputChange} />
          <br>
          ${state.message}
        </p>
      </div>
    </div>
  `
}
