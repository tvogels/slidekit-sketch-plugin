import sketch from 'sketch'
import _ from 'lodash'

const [w, h] = [1280, 720] // page width and height
const [dw, dh] = [600, 200] // offsets

export default function() {
  var doc = sketch.getSelectedDocument()

  let x = 0
  let y = 0
  let first = null
  for (let page of doc.pages) {
    const artboards = _.sortBy(page.layers, l => l.name)
    page.layers = [...artboards].reverse()
    for (let artboard of artboards) {
      if (first == null) {
        first = artboard.name[0]
        y = -(h + dh)
      }
      if (first != artboard.name[0]) {
        x += w + dw
        y = 0
        first = artboard.name[0]
      } else {
        y += h + dh
      }
      artboard.frame.x = x
      artboard.frame.y = y
    }
  }
}
