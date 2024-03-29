import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
    constructor (popupSelector, handleButtonClick) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
        this._handleButtonClick = handleButtonClick;
      }
    
      open(card) {
        this._card = card;
        super.open();
      }
    
      setEventListeners() {
        super.setEventListener();
        this._button.addEventListener('click', evt => {
          this._handleButtonClick(evt, this._card);
        });
      }

      renderLoading(isLoading) {
        if (isLoading) {
          this._button.innerText = 'Удаление...';
        } else {
          this._button.innerText = 'Да';
        }
      }
}