export class Card {
  constructor(data, templateSelector, handleClickCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleClickCard = handleClickCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardElements = this._element.querySelector('.elements__items');
    this._cardImage = this._element.querySelector('.elements__img');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImageTitle = this._element.querySelector('.elements__title');
    this._cardImageTitle.textContent = this._name;
    this._cardDeleteButton = this._element.querySelector('.elements__delete-button');
    this._cardLikeIcon = this._element.querySelector('.elements__like-button');

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleClickCard(this._name, this._link);
    });
    this._cardLikeIcon.addEventListener('click', () => {
      this._handleLikeIcon(this._element);
    });
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._element);
    });
  }

  _handleLikeIcon() {
    this._cardLikeIcon.classList.toggle('elements__like-button_active');
  }
  _handleDeleteCard() {
    this._element.remove();
  }
}
