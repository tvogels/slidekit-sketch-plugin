export function onOpenDocument(context) {
  context.actionContext.document.showMessage('Document Opened')
}

export function onSelectionChanged(context) {
  context.actionContext.document.showMessage('selection changed')
}

export function onTextChanged(context) {
  context.actionContext.document.showMessage('text changed')
}
