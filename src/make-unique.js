import sketch from 'sketch'
import _ from 'lodash'
import { buildName, parseName } from './clear-stages'

export default function (context) {
  const doc = sketch.getSelectedDocument()
  sketch.UI.message('Making layer names unique')

  const usedNames = new Set();
  const duplicates = new Set();
  for (let layer of doc.selectedLayers.layers) {
    const { name } = parseName(layer.name);
    if (usedNames.has(name)) {
      duplicates.add(name);
    } else {
      usedNames.add(name);
    }
  }

  for (let layer of doc.selectedLayers.layers) {
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
