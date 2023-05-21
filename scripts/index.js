const OpenPopupButton = document.querySelector('.profile__edit-button');
const ClosePopupButton = document.querySelector('.popup__close-button');
const editPopup = document.querySelector('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTitle = document.querySelector('.popup__input_type_name');
const inputSubtitle = document.querySelector('.popup__input_type_job');
const editForm = document.querySelector('.popup__container');

function openPopup() {
  editPopup.classList.add('popup_opened');
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function closePopup(popup) {
  editPopup.classList.remove('popup_opened');
}

OpenPopupButton.addEventListener('click', openPopup);
ClosePopupButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;

  closePopup(editPopup);
});
