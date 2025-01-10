import './index.css';
import { createCard, deleteCards, handleLikeClick } from './components/card.js';
import { openPopup, closePopup, closeActivePopupOnBackgroundClick } from './components/modal.js';
import { validateFormProfile, clearValidation } from './validation.js';
import { createNewCards, getInitialCards, getInitialUser } from './components/api.js';

const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");

const formEdit = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

const nameInput = document.querySelector('.popup__input.popup__input_type_name');
const jobInput = document.querySelector('.popup__input.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__avatar');

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddInputPlace = popupAdd.querySelector(".popup__input_type_card-name");
const popupAddInputUrl = popupAdd.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCloseButton = imagePopup ? imagePopup.querySelector(".popup__close") : null;

const list = document.querySelector(".cards");

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

function resetPopup(popup) {
  const form = popup.querySelector('.popup__form');
  if (form) {
    form.reset();
  }
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

function renderCard(data) {
  list.prepend(createCard(data, deleteCards, handleOpenImage, handleLikeClick));
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = popupAddInputPlace.value; 
  const link = popupAddInputUrl.value; 
  renderCard({ name, link });
  closePopup(popupAdd);
  resetPopup(popupAdd);
}

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

editButton.addEventListener('click', function () {
  clearValidation(formEdit, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

if (imagePopupCloseButton) {
  imagePopupCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
  });
}

popupAdd.addEventListener('click', closeActivePopupOnBackgroundClick);
popupAddForm.addEventListener('submit', handleFormAddSubmit);
popupEdit.addEventListener('click', closeActivePopupOnBackgroundClick);
formEdit.addEventListener("submit", handleFormEditSubmit);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Получаем данные пользователя и карточек с сервера
Promise.all([getInitialUser(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // Данные пользователя
    const userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;

    // Проверяем, существует ли элемент профиля для аватара
    if (profileImage) {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    } else {
      console.log('Элемент профиля для аватара не найден');
    }

    // Рендерим карточки, полученные с сервера
    initialCards.forEach((card) => {
      const newCard = createCard(card, userId, deleteCards, handleLikeClick, handleOpenImage);
      list.prepend(newCard);
    });
  })
  .catch((err) => {
    console.log('Ошибка при загрузке данных:', err);
  });

