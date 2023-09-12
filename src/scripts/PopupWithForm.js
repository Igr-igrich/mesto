import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonPopup = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach(element => {
      data[element.name] = element.value;
    });
    return data;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    console.log(this._buttonPopup.innerText);
    if (isLoading) {
      this._buttonPopup.innerText = 'Сохранение...';
    } else {
      this._buttonPopup.innerText = `${this._buttonPopup.innerText}`;
    }
  }
}
