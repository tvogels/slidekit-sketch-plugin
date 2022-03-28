import sketch from 'sketch'
import _ from 'lodash'

const allChildren = layer => [layer, ..._(layer.layers).flatMap(allChildren)]
const isTextLayer = layer => layer.text != null

function convertToOutlines(textLayer) {
  // to find the private API function you will want to look at the Sketch headers
  // https://github.com/abynim/Sketch-Headers/tree/2a642ea9703d46220cef74fc1d14d619cb2d35d9
  const name = textLayer.name
  const nativeTextLayer = textLayer.sketchObject
  if (nativeTextLayer.canConvertToOutlines()) {
    const out = nativeTextLayer.layersByConvertingToOutlines()
    out[0].setName(name)
  }
}

export default function(context) {
  const doc = sketch.getSelectedDocument()
  sketch.UI.message('Converting all text to outlines')
  for (let page of doc.pages) {
    for (let layer of allChildren(page).filter(isTextLayer)) {
      const out = convertToOutlines(layer)
    }
  }
}
