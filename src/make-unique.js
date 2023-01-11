import sketch from 'sketch'
import _ from 'lodash'
import { buildName, parseName } from './clear-stages'


const allChildren = layer => [layer, ..._(layer.layers).flatMap(allChildren)]

export default function (context) {
  const doc = sketch.getSelectedDocument()
  sketch.UI.message('Making layer names unique (recursively)')

  const layers = [..._(doc.selectedLayers.layers).flatMap(allChildren)]

  const usedNames = new Set();
  const duplicates = new Set();
  for (let layer of layers) {
    const { name } = parseName(layer.name);
    if (usedNames.has(name)) {
      duplicates.add(name);
    } else {
      usedNames.add(name);
    }
  }

  for (let layer of layers) {
    const { name, attributes } = parseName(layer.name)
    if (duplicates.has(name)) {
      let count = 1;
      let newName = `${name}-${count}`;
      while (usedNames.has(newName)) {
        count += 1;
        newName = `${name}-${count}`;
      }
      usedNames.add(newName);
      layer.name = buildName({ name: newName, attributes })
    }
  }
}
