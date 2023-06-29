// Блок с попапом для редактирования профиля

const editPopup = document.querySelector('.popup_profile-edit');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button_profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTitle = document.querySelector('.popup__input_profile_name');
const inputSubtitle = document.querySelector('.popup__input_profile_job');
const editForm = document.querySelector('.popup__form_profile');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach(popup => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

popupList.forEach(popup => {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      closePopup(popup);
    }
  });
});

// Попап с картинкой

const popupImage = document.querySelector('.popup_image');
const popupImageOpened = popupImage.querySelector('.popup__image-opened');
const popupImageText = popupImage.querySelector('.popup__image-text');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button_image');

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

// Добваления карточек на страницу через массив элементов

const template = document.querySelector('.elements__item-template');
const templateContent = template.content;
const elementsItem = templateContent.querySelector('.elements__item');
const elementsItems = document.querySelector('.elements__items');

initialCards.forEach(function (card) {
  const cardElement = createCard(card);
  elementsItems.prepend(cardElement);
});

function createCard(card) {
  const cardElement = elementsItem.cloneNode(true);
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardLink = cardElement.querySelector('.elements__img');

  cardTitle.textContent = card.name;
  cardLink.src = card.link;
  cardLink.alt = card.name;

  const deleteButton = cardElement.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', function (event) {
    elementsItems.removeChild(cardElement);
  });

  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click', function (event) {
    likeButton.classList.toggle('elements__like-button_active');
  });

  cardLink.addEventListener('click', () => {
    popupImageOpened.src = cardLink.src;
    popupImageOpened.alt = cardLink.alt;
    popupImageText.textContent = card.name;

    openPopup(popupImage);
  });

  return cardElement;
}

// Блок с попапом для добавления карточек

const editPopupAdd = document.querySelector('.popup_card');
const openPopupAddButton = document.querySelector('.profile__add-button');
const closePopupAddButton = document.querySelector('.popup__close-button_card');
const editFormAdd = document.querySelector('.popup__form_card');

openPopupAddButton.addEventListener('click', () => {
  openPopup(editPopupAdd);
});
closePopupAddButton.addEventListener('click', () => {
  closePopup(editPopupAdd);
});

function disableSubmitButton() {
  const submitButton = editFormAdd.querySelector('.popup__button');
  submitButton.setAttribute('disabled', 'true');
  submitButton.classList.add('popup__button_disabled');
}

editFormAdd.addEventListener('submit', function (event) {
  event.preventDefault();

  const formCard = event.target;
  const formCardData = new FormData(formCard);
  const values = Object.fromEntries(formCardData);
  const cardElement = createCard(values);

  elementsItems.prepend(cardElement);

  closePopup(editPopupAdd);

  disableSubmitButton();

  formCard.reset();
});
