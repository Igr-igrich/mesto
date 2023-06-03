// Блок с попапом для редактирования профиля

const editPopup = document.querySelector('.popup_profile-edit');
const OpenPopupButton = document.querySelector('.profile__edit-button');
const ClosePopupButton = document.querySelector('.popup__close-button_profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTitle = document.querySelector('.popup__input_profile_name');
const inputSubtitle = document.querySelector('.popup__input_profile_job');
const editForm = document.querySelector('.popup__form_profile');

function openPopup() {
  editPopup.classList.add('popup_opened');
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function closePopup() {
  editPopup.classList.remove('popup_opened');
}

OpenPopupButton.addEventListener('click', openPopup);
ClosePopupButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;

  closePopup();
});

// Попап с картинкой

const popupImage = document.querySelector('.popup_image');
const popupImageOpened = popupImage.querySelector('.popup__image-opened');
const popupImageText = popupImage.querySelector('.popup__image-text');
const popupImageDeleteButton = popupImage.querySelector('.popup__image_close-button');

function openPopupImage() {
  popupImage.classList.add('popup_opened');
}

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

popupImageDeleteButton.addEventListener('click', closePopupImage);

// Добваления карточек на страницу через массив элементов

const template = document.querySelector('.elements__item-template');
const templateContent = template.content;
const elementsItem = templateContent.querySelector('.elements__item');
const elementsItems = document.querySelector('.elements__items');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

  const deleteButton = cardElement.querySelector('.elements__delete-button');
  deleteButton.addEventListener('click', function (event) {
    elementsItems.removeChild(cardElement);
  });

  const likeButton = cardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click', function (event) {
    likeButton.classList.toggle('elements__like-button_active');
  });

  cardLink.addEventListener('click', function () {
    popupImageOpened.src = cardLink.src;
    popupImageText.textContent = card.name;

    openPopupImage();
  });

  return cardElement;
}

// Блок с попапом для добавления карточек

const editPopupAdd = document.querySelector('.popup_card');
const openPopupAddButton = document.querySelector('.profile__add-button');
const closePopupAddButton = document.querySelector('.popup__close-button_card');
const editFormAdd = document.querySelector('.popup__form_card');
// const inputTitle = editPopup.querySelector('.popup__input_profile_name');
// const inputSubtitle = editPopup.querySelector('.popup__input_profile_job');
// console.log(inputTitle);

function openPopupAdd() {
  editPopupAdd.classList.add('popup_opened');
}

function closePopupAdd() {
  editPopupAdd.classList.remove('popup_opened');
}

openPopupAddButton.addEventListener('click', openPopupAdd);
closePopupAddButton.addEventListener('click', closePopupAdd);
editFormAdd.addEventListener('submit', function (event) {
  event.preventDefault();

  const formCard = event.target;
  const formCardData = new FormData(formCard);
  const values = Object.fromEntries(formCardData);
  const cardElement = createCard(values);

  elementsItems.prepend(cardElement);
  formCard.reset();
  closePopupAdd();
});
