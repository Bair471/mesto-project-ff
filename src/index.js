import './index.css';
import { createCard, deleteCardsFromHTML } from './components/card.js'; 
import { openPopup, closePopup, closeActivePopupOnBackgroundClick, resetPopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  createNewCards,
  deleteCard,
  getInitialCards,
  getInitialUser,
  updateAvatar,
  updateUser
} from './components/api.js';
import { addLike, removeLike } from "./components/api.js";

const profile = document.querySelector(".profile");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileEditButton = profile.querySelector(".profile__edit-button");

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditForm = popupEdit.querySelector(".popup__form");
const popupEditFormNameInput = document.querySelector('.popup__input.popup__input_type_name');
const popupEditFormJobInput = document.querySelector('.popup__input.popup__input_type_description');
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupEditSubmitButton = popupEdit.querySelector(".popup__button");

const popupAdd = document.querySelector(".popup_type_new-card");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddInputPlace = popupAdd.querySelector(".popup__input_type_card-name");
const popupAddInputUrl = popupAdd.querySelector(".popup__input_type_url");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
const popupAddSubmitButton = popupAdd.querySelector(".popup__button");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupTypeAvatarForm = popupTypeAvatar.querySelector(".popup__form");
const popupTypeAvatarInputUrl = popupTypeAvatar.querySelector(".popup__input_type_url");
const popupTypeAvatarCloseButton = popupTypeAvatar.querySelector(".popup__close");

const popupTypeConfirm = document.querySelector(".popup_type_confirm");
const popupTypeConfirmForm = popupTypeConfirm.querySelector(".popup__form");
const popupTypeConfirmCloseButton = popupTypeConfirm.querySelector(".popup__close");
const popupTypeConfirmAcceptButton = popupTypeConfirm.querySelector(".confirm_accept__button");

const list = document.querySelector(".cards");

let userId = null;
let currentCardId = null;
let currentDeleteButton = null;

function handleOpenImage(imageLink, imageName) {
  if (imagePopup) {
    const imagePopupCaption = imagePopup.querySelector(".popup__caption");
    const imagePopupImg = imagePopup.querySelector(".popup__image");
   
    imagePopupImg.src = imageLink;
    imagePopupImg.alt = imageName;
    imagePopupCaption.textContent = imageName;
    openPopup(imagePopup);
  }
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  const oldText = popupEditSubmitButton.textContent;
  popupEditSubmitButton.textContent = 'Сохранение...';

  updateUser({
    name: popupEditFormNameInput.value,
    about: popupEditFormJobInput.value
  }).then(() => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    closePopup(popupEdit);
  }).catch((err) => {
    console.log('Ошибка при обновлении данных пользователя:', err);
  }).finally(() => {
    popupEditSubmitButton.textContent = oldText;
  });
}

function renderCard(card) {
  list.prepend(createCard(card, handleDeleteCard, handleOpenImage, handleLike, userId));
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const oldText = popupAddSubmitButton.textContent;
  popupAddSubmitButton.textContent = 'Сохранение...';

  const name = popupAddInputPlace.value;
  const link = popupAddInputUrl.value;
  popupAddSubmitButton.classList.add(".popup__button_disabled");

  createNewCards({ name, link }).then((card) => {
    renderCard(card);
    closePopup(popupAdd);
    resetPopup(popupAdd);
  }).catch((err) => {
    console.log('Ошибка при добавлении карточки:', err);
  }).finally(() => {
    popupAddSubmitButton.textContent = oldText;
  });
}

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  const link = popupTypeAvatarInputUrl.value;
  updateAvatar({ avatar: link }).then(() => {
    profileImage.style.backgroundImage = `url(${link})`;
    closePopup(popupTypeAvatar);
  }).catch((err) => {
    console.log('Ошибка при обновлении аватара:', err);
  });
}

// Логика клика на лайк (с сервером)
function handleLike(buttonLike, likeCounter, cardId) {
  const isLiked = buttonLike.classList.contains('card__like-button_is-active')
  const likeMethod = isLiked ? removeLike : addLike;
  likeMethod(cardId) 
          .then(updatedCard => { 
            buttonLike.classList.toggle('card__like-button_is-active'); 
            likeCounter.textContent = updatedCard.likes.length; 
          })
  .catch(err => console.log(`Ошибка при ${isLiked ? "удалении" : "добавлении"} лайка:`, err));
}

// Функция для удаления карточки
function handleDeleteCard(deleteButton, cardId, mine) {
  if (!mine) {
    console.log('Нельзя удалять чужие карточки');
    return;
  }

  currentCardId = cardId;
  currentDeleteButton = deleteButton;

  openPopup(popupTypeConfirm);
}

function handleConfirmDeleteCard(evt) {
  evt.preventDefault();

  const oldText = popupTypeConfirmAcceptButton.textContent;
  popupTypeConfirmAcceptButton.textContent = 'Удаление...';

  // Запрос на удаление карточки с сервера
  deleteCard(currentCardId).then(() => {
    closePopup(popupTypeConfirm);

    // При успешном удалении, удаляем карточку из DOM
    deleteCardsFromHTML(currentDeleteButton);
  }).catch((err) => {
    console.log('Ошибка при удалении карточки:', err);
  }).finally(() => {
    popupTypeConfirmAcceptButton.textContent = oldText;
  });
}

profileAddButton.addEventListener('click', () => {
  clearValidation(popupAddForm, validationConfig, false);
  openPopup(popupAdd);
});

profileEditButton.addEventListener('click', function () {
  clearValidation(popupEditForm, validationConfig, true);
  popupEditFormNameInput.value = profileName.textContent;
  popupEditFormJobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
  resetPopup(popupAdd);
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});

popupTypeAvatarCloseButton.addEventListener('click', () => {
  closePopup(popupTypeAvatar);
});

popupTypeConfirmCloseButton.addEventListener('click', () => {
  closePopup(popupTypeConfirm);
});

popupAdd.addEventListener('click', closeActivePopupOnBackgroundClick);
popupAddForm.addEventListener('submit', handleFormAddSubmit);
popupEdit.addEventListener('click', closeActivePopupOnBackgroundClick);
popupEditForm.addEventListener("submit", handleFormEditSubmit);
popupTypeAvatar.addEventListener('click', closeActivePopupOnBackgroundClick);
popupTypeAvatarForm.addEventListener('submit', handleFormAvatarSubmit);
profileImage.addEventListener('click', () => {
  clearValidation(popupTypeAvatarForm, validationConfig, true);
  openPopup(popupTypeAvatar);
});
popupTypeConfirmForm.addEventListener('submit', handleConfirmDeleteCard);
popupTypeConfirm.addEventListener('click', closeActivePopupOnBackgroundClick);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

Promise.all([getInitialUser(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // Данные пользователя
    userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;

    // Проверяем, существует ли элемент профиля для аватара
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    // Рендерим карточки, полученные с сервера
    initialCards.forEach((card) => {
      // fix 7 - added user id, passing card
      list.prepend(createCard(card, handleDeleteCard, handleOpenImage, handleLike, userId));
    });
  })
  .catch((err) => {
    console.log('Ошибка при загрузке данных:', err);
  });