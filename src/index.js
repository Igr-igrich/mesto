import './pages/index.css';

import { Card } from './scripts/Card.js';
import { FormValidator, config } from './scripts/formValidator.js';
import { Section } from './scripts/Section.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { UserInfo } from './scripts/UserInfo.js';
import { Api } from './scripts/Api.js';
import { PopupDeleteCard } from './scripts/PopupDeleteCard.js';

import {
  token,
  editForm,
  editFormAdd,
  editAvatar,
  openPopupButton,
  openPopupAddButton,
  buttonEditAvatar
} from './scripts/constants.js';

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/',
  token: token,
  groupId: 'cohort-73'
});
api.getAllCards();

const formProfileValid = new FormValidator(config, editForm);

const formAddNewCardValid = new FormValidator(config, editFormAdd);

const popupAvatarValid = new FormValidator(config, editAvatar);


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle',
  profileAvatar: '.profile__image'
});

const popupProfile = new PopupWithForm('.popup_profile-edit', data => {
  popupProfile.renderLoading(true);
  api
  .setProfile(data['name'], data['info'])
  .then(result => {
    userInfo.setUserInfo(result.name, result.about);
    popupProfile.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupProfile.renderLoading(false);
  });
});

const popupCard = new PopupWithForm('.popup_card', data => {
  popupCard.renderLoading(true);
  api
    .postCard(data.name, data.link)
    .then(res => {
      sectionInstance.prependItem(createCard(res));
      popupCard.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupCard.renderLoading(false);
    });
});

const popupEditAvatar = new PopupWithForm('.popup_avatar', data => {
  popupEditAvatar.renderLoading(true);
  console.log(data.link);
  api
    .setAvatar(data.link)
    .then(result => {
      console.log(result.avatar);
      userInfo.setUserAvatar(result.avatar);
      popupEditAvatar.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
});


const popupImage = new PopupWithImage('.popup_image');

const sectionInstance = new Section(
  {
    renderer: items => sectionInstance.appendItem(createCard(items))
  },
  '.elements__items'
);

const popupConfirmDelete = new PopupDeleteCard('.popup_delete-card', (evt, card) => {
  evt.preventDefault();
  popupConfirmDelete.renderLoading(true);
  api
    .delCard(card.id)
    .then(() => {
      card.deleteCard();
      popupConfirmDelete.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupConfirmDelete.renderLoading(false);
    });
});


function createCard(item) {
  const myId = userInfo.getUserInfo().id;
  
  const card = new Card(
    {
      data: item,
      userId: myId,
      handleRemoveButtonClick: card => {
        popupConfirmDelete.open(card);
      },
      handleCardClick: () => {
        popupImage.open(item.name, item.link);
      },
      handleClickLike: () => {
        if (!card._isLiked) {
          api
            .setLike(card.id)
            .then(res => {
              console.log('hello');
              card.setLikes(res.likes.length);
              card.changeStatus();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          api
            .delLike(card.id)
            .then(res => {
              console.log('hello');
              card.setLikes(res.likes.length);
              card.changeStatus();
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }, '.elements__item-template');

  return card.generateCard();
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

// Попап редактирования аватара
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  popupAvatarValid.disableButton();
  popupAvatarValid.resetValidation();
});

popupProfile.setEventListener();
popupCard.setEventListener();
popupImage.setEventListener();
popupConfirmDelete.setEventListeners();
popupEditAvatar.setEventListener();
formProfileValid.enableValidation();
formProfileValid.disableButton();

formAddNewCardValid.enableValidation();
formAddNewCardValid.disableButton();

popupAvatarValid.enableValidation();
popupAvatarValid.disableButton();

let userId;

api
  .getUserInfo()
  .then(resApi => {
    userId = resApi._id;
    userInfo.setUserInfo(resApi.name, resApi.about, userId);
    userInfo.setUserAvatar(resApi.avatar);
  })
  .then(() => {
    api
      .getAllCards()
      .then(dataCards => {
        sectionInstance.renderItems(dataCards);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });


