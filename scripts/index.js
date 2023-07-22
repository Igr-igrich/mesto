import { Card } from './cards.js';

import {
  editPopup,
  openPopupButton,
  closePopupButton,
  profileTitle,
  profileSubtitle,
  inputTitle,
  inputSubtitle,
  editForm,
  editPopupAdd,
  openPopupAddButton,
  closePopupAddButton,
  editFormAdd,
  nameInputEditFormAdd,
  linkInputEditFormAdd,
  buttonSubmitEditFormAdd,
  template,
  templateContent,
  cardElement,
  cardImageTitle,
  cardImage,
  cardDeleteButton,
  cardLikeIcon,
  popupFullImage,
  popupFullImageItem,
  popupFullImageTitle,
  cardElements,
  popupFullImageCloseButton
} from './constants.js';

openPopupButton.addEventListener('click', () => {
  openPopup(editPopup);
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
});

closePopupButton.addEventListener('click', () => {
  closePopup(editPopup);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;

  closePopup(editPopup);
});

// Закрытие попапов нажатием на esc и оверлей
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closedByOverlay(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === popup) {
    closePopup(popup);
  }
}

// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('mousedown', closedByOverlay);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('mousedown', closedByOverlay);
}

// Попап с картинкой
popupFullImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

// Открытие попапа добавления карточки
openPopupAddButton.addEventListener('click', () => {
  openPopup(editPopupAdd);
});

// Закрытие попапа добавления карточки
closePopupAddButton.addEventListener('click', () => {
  closePopup(editPopupAdd);
});

export function handleClickCard(name, link) {
  popupFullImageItem.src = link;
  popupFullImageItem.alt = name;
  popupFullImageTitle.textContent = name;
  openPopup(popupFullImage);
}

editFormAdd.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.target;

  const item = {
    name: nameInputEditFormAdd.value,
    link: linkInputEditFormAdd.value
  };

  function createCard(item) {
    const card = new Card(item, '.elements__item-template', handleClickCard);
    const cardElement = card.generateCard();
    return cardElement;
  }

  const cardElement = createCard(item);
  cardElements.prepend(cardElement);

  closePopup(editPopupAdd);

  event.target.reset(form);

  return cardElement;
});
