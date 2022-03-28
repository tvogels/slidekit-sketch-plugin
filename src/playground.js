import sketch from 'sketch'
import { toArray } from 'sketch-utils'
import BrowserWindow from 'sketch-module-web-view'
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote'

export default function(context) {
  const options = {
    identifier: 'unique.id',
    frame: true,
    backgroundColor: '#2E2F30FF',
    width: 300,
    height: 600,
    title: 'tvogels/slides',
    resizable: false,
  }

  const doc = sketch.getSelectedDocument()
  const browserWindow = new BrowserWindow(options)
  browserWindow.loadURL(require('./my-screen.html'))

  browserWindow.webContents.on('makeRed', function(ids) {
    for (let layerId of ids) {
      const layer = doc.getLayerWithID(layerId)
      layer.name = 'hoi'
      console.log(layer)
      layer.style.fills = [
        {
          color: '#ff0000',
          fillType: sketch.Style.FillType.Color,
        },
      ]
    }
  })
}

export function onSelectionChanged(context) {
  const selection = toArray(context.actionContext.newSelection).map(
    sketch.fromNative
  )
  const names = selection.map(l => l.name)
  const ids = selection.map(l => l.id)
  if (isWebviewPresent('unique.id')) {
    sendToWebview(
      'unique.id',
      `setSelection(${JSON.stringify(ids)},${JSON.stringify(names)})`
    )
  }
}
