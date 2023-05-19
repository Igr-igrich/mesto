const OpenPopupButton = document.querySelector('.profile__button');
const ClosePopupButton = document.querySelector('#close-popup-button');
const editPopup = document.querySelector('#edit-popup');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTitle = document.querySelector('#input-title');
const inputSubtitle = document.querySelector('#input-subtitle');
const editForm = document.querySelector('#edit-form');

OpenPopupButton.addEventListener('click', function () {
  openPopup(editPopup);
});

ClosePopupButton.addEventListener('click', function () {
  closePopup(editPopup);
});

inputTitle.value = profileTitle.textContent;
inputSubtitle.value = profileSubtitle.textContent;

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;

  closePopup(editPopup);
});

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}
