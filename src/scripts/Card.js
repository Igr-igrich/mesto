export class Card {
  constructor({data, userId, handleCardClick, handleRemoveButtonClick, handleClickLike}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._owner = data.owner._id === userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
    this._handleClickLike = handleClickLike;
    this._likes = data.likes.length;
    this._isLiked = false;
    data.likes.forEach(obj => {
      if (obj._id === userId) {
        this._isLiked = true;
      }
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);
    if (!this._owner) {
      cardElement
        .querySelector('.elements__delete-button')
        .classList.remove('elements__delete-button_active');
    }
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardElements = this._element.querySelector('.elements__items');
    this._cardImage = this._element.querySelector('.elements__img');
    this._usersLikesElement = this._element.querySelector('.elements__like-counter');
    this._usersLikesElement.textContent = this._likes;
    this._cardLikeIcon = this._element.querySelector('.elements__like-button');
    if (this._isLiked) {
      this._cardLikeIcon.classList.add('elements__like-button_active');
    }
    this._cardImageTitle = this._element.querySelector('.elements__title');
    this._cardImageTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardDeleteButton = this._element.querySelector('.elements__delete-button');
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._cardLikeIcon.addEventListener('click', () => {
      this._handleLikeIcon();
    });
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleRemoveButtonClick(this);
    });
  }

  _handleLikeIcon() {
    this._cardLikeIcon.classList.toggle('elements__like-button_active');
    this._handleClickLike();
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  changeStatus() {
    this._isLiked = !this._isLiked;
  }

  setLikes(sumLikes) {
    console.log(sumLikes);
    this._likes = sumLikes;
    this._usersLikesElement.textContent = this._likes;
  }
}
