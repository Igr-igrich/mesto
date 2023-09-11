export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerParentElement = document.querySelector(containerSelector);
  }

  appendItem(elementNode) {
    this._containerParentElement.append(elementNode);
  }

  prependItem(elementNode) {
    this._containerParentElement.prepend(elementNode);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
