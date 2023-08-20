export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerParentElement = document.querySelector(containerSelector);
  }

  addItem(elementNode) {
    this._containerParentElement.prepend(elementNode);
  }
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
