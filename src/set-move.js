import sketch from 'sketch'
import _ from 'lodash'
import { buildName, parseName } from './clear-stages'

export default function (context) {
  const doc = sketch.getSelectedDocument()
  sketch.UI.message('Adding move to selection')
  for (let layer of doc.selectedLayers.layers) {
    const { name, attributes } = parseName(layer.name)
    const newAttributes = { move: true, ...attributes };
    layer.name = buildName({ name, attributes: newAttributes })
  }
}
