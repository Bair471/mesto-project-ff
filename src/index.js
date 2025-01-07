import './index.css';
import { initialCards } from './components/cards.js'
import { createCard, deleteCards, handleLikeClick } from './components/card.js';
import { openPopup, closePopup, closeActivePopupOnBackgroundClick } from './components/modal.js';
import { validateFormProfile, clearValidation } from './validation.js';

const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");

const formEdit = document.forms["edit-profile"];
const editAvatarForm = document.forms["edit-avatar"];
const newPlaceForm = document.forms["new-place"];

const nameInput = document.querySelector('.popup__input.popup__input_type_name');
const jobInput = document.querySelector('.popup__input.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupAddCloseButton = popupAdd.querySelector(".popup__close");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddInputPlace = popupAdd.querySelector(".popup__input_type_card-name");
const popupAddInputUrl = popupAdd.querySelector(".popup__input_type_url");
const popupImage = document.querySelector("#popup_type_image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");
const imagePopupImg = popupImage.querySelector(".popup__image");
const imagePopupCloseButton = popupImage.querySelector(".popup__close");

const formEditInputs = document.querySelectorAll('.popup__input');
const formEditSubmitButton = document.querySelector('.popup__button');


const list = document.querySelector(".cards");


function handleOpenImage(imageLink, imageName) {
  imagePopupImg.src = imageLink;
  imagePopupImg.alt = imageName;  
  imagePopupCaption.textContent = imageName;

  openPopup(popupImage);
}
initialCards.forEach(function (data) {
  const card = createCard(data, deleteCards, handleOpenImage, handleLikeClick);
  list.prepend(card);
});

function resetPopup(popup) {
  const form = popup.querySelector('.popup__form');
  if (form) {
    form.reset();
  }
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
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
  clearValidation(formEdit,validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

imagePopupCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

popupAdd.addEventListener('click', closeActivePopupOnBackgroundClick);
popupAddForm.addEventListener('submit', handleFormAddSubmit);
popupEdit.addEventListener('click', closeActivePopupOnBackgroundClick);
formEdit.addEventListener("submit", handleFormEditSubmit);
popupImage.addEventListener('click', closeActivePopupOnBackgroundClick);


const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

validateFormProfile(validationConfig);