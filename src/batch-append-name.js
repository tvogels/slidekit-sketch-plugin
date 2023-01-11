import sketch from 'sketch'
import _ from 'lodash'

export default function (context) {
  const doc = sketch.getSelectedDocument()
  sketch.UI.getInputFromUser(
    "What is the suffix to add to all selected layers?",
    {
      initialValue: '',
    },
    (err, value) => {
      if (err) {
        sketch.UI.message('Failed')
        return
      }
      sketch.UI.message(`Adding ${value} to the selection`)
      for (let layer of doc.selectedLayers.layers) {
        layer.name = `${layer.name}${value}`
      }
    }
  )
}
