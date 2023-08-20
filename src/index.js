import './pages/index.css';

import { Card } from './scripts/Card.js';
import { FormValidator, config } from './scripts/formValidator.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';

import {
  initialCards,
  inputTitle,
  inputSubtitle,
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
    name: data['profileName'],
    info: data['profileDetails']
  });
  popupProfile.close();
});

const popupCard = new PopupWithForm('.popup_card', data => {
  const item = {
    name: data['name'],
    link: data['link']
  };
  renderCard(item);
  popupCard.close();
});

const popupImage = new PopupWithImage('.popup_image');

const sectionInstance = new Section(
  {
    items: initialCards,
    renderer: items => renderCard(items)
  },
  '.elements__items'
);

function renderCard(item) {
  const card = new Card(item, '.elements__item-template', handleCardClick);
  const cardElement = card.generateCard();
  sectionInstance.addItem(cardElement);
}

// Попап с картинкой
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// Попап добавления карточки
openPopupAddButton.addEventListener('click', () => {
  popupCard.open();
  formAddNewCardValid.disableButton();
});

// Попап редактирования профиля
openPopupButton.addEventListener('click', () => {
  popupProfile.open();
  const userDetails = userInfo.getUserInfo();
  formProfileValid.disableButton();
  inputTitle.value = userDetails.name;
  inputSubtitle.value = userDetails.info;
});

popupProfile.setEventListener();
popupCard.setEventListener();
popupImage.setEventListener();
sectionInstance.renderItems();
formProfileValid.enableValidation();
formProfileValid.disableButton();
formAddNewCardValid.enableValidation();
formAddNewCardValid.disableButton();
