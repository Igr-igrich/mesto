import './pages/index.css';

import { Card } from './scripts/Card.js';
import { FormValidator, config } from './scripts/formValidator.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

import {
  initialCards,
  editForm,
  editFormAdd,
  openPopupButton,
  openPopupAddButton
} from './scripts/constants.js';

const formProfileValid = new FormValidator(config, editForm);

const formAddNewCardValid = new FormValidator(config, editFormAdd);

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle'
});

const popupProfile = new PopupWithForm('.popup_profile-edit', data => {
  userInfo.setUserInfo({
    name: data['name'],
    info: data['info']
  });
  popupProfile.close();
});

const popupCard = new PopupWithForm('.popup_card', data => {
  const item = {
    name: data['name'],
    link: data['link']
  };
  sectionInstance.addItem(createCard(item));
  popupCard.close();
});

const popupImage = new PopupWithImage('.popup_image');

const sectionInstance = new Section(
  {
    items: initialCards,
    renderer: items => sectionInstance.addItem(createCard(items))
  },
  '.elements__items'
);

function createCard(item) {
  const card = new Card(item, '.elements__item-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Попап с картинкой
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// Попап добавления карточки
openPopupAddButton.addEventListener('click', () => {
  popupCard.open();
  formAddNewCardValid.disableButton();
  formAddNewCardValid.resetValidation();
});

// Попап редактирования профиля
openPopupButton.addEventListener('click', () => {
  popupProfile.open();
  const userDetails = userInfo.getUserInfo();
  formProfileValid.disableButton();
  formProfileValid.resetValidation();
  popupProfile.setInputValues(userDetails);
});

popupProfile.setEventListener();
popupCard.setEventListener();
popupImage.setEventListener();
sectionInstance.renderItems();
formProfileValid.enableValidation();
formProfileValid.disableButton();
formAddNewCardValid.enableValidation();
formAddNewCardValid.disableButton();
