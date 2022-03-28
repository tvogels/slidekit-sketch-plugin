import sketch from 'sketch'
import _ from 'lodash'


const allChildren = layer => [layer, ..._(layer.layers).flatMap(allChildren)]

const maxNumAttributes = 20
const layerIdRegex = new RegExp(
  '^' +
  String.raw`([^\[\]]+)` +
  String.raw`(\[[^\[\]]+\])?`.repeat(maxNumAttributes) +
  '$'
)
const attributeRegex = new RegExp(String.raw`\[(.*?)(=(.*?))?\]`)

function parseAttribute(attributeString) {
  const match = attributeString.match(attributeRegex)
  if (match == null) return [attributeString, true]
  let [_, name, __, value] = match

  if (value == null) value = true
  return [name, value]
}

export function parseName(layerId) {
  const match = layerId.match(layerIdRegex)
  if (match == null) return { name: layerId, attributes: [] }
  const [_, name, ...attributeStrings] = match
  return {
    name,
    attributes: Object.fromEntries(
      attributeStrings.filter(s => s != null).map(parseAttribute)
    ),
  }
}

function buildAttribute([key, value]) {
  if (value === true) {
    return `[${key}]`
  } else {
    return `[${key}=${value}]`
  }
}

export function buildName({ name, attributes }) {
  return (
    `${name}` +
    Object.entries(attributes)
      .map(buildAttribute)
      .join('')
  )
}

export default function (context) {
  const doc = sketch.getSelectedDocument()
  sketch.UI.message('Clearing stages in selection')
  for (let layer of doc.selectedLayers.layers) {
    for (let child of allChildren(layer)) {
      // there may be duplicates
      const { name, attributes } = parseName(child.name)
      let { stage, ...newAttributes } = attributes
      child.name = buildName({ name, attributes: newAttributes })
    }
  }
}
