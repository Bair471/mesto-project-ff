import './index.css';
import { initialCards } from './components/cards.js'
import { createCard, deleteCards, handleLikeClick} from './components/card.js';
import { openPopup, closePopup, closeBackground, closeEscapeAdd } from './components/modal.js';

function handleOpenImage(imageLink, imageName) {
  imagePopupImg.src = imageLink;
  imagePopupImg.alt = imageName;  
  imagePopupCaption.textContent = imageName;

  openPopup(popupImage);
}


const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");

const formEdit = document.getElementById('edit-profile');
const submitAdd = document.getElementById('edit-profile-submit-button');

const nameInput = document.querySelector('.popup__input.popup__input_type_name');
const jobInput = document.querySelector('.popup__input.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddInputPlace = popupAdd.querySelector(".popup__input_type_card-name");
const popupAddInputUrl = popupAdd.querySelector(".popup__input_type_url");
const popupImage = document.querySelector("#popup_type_image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");
const imagePopupImg = popupImage.querySelector(".popup__image");

const list = document.querySelector(".cards");

console.log(handleOpenImage);

initialCards.forEach(function (data) {
  const card = createCard(data, deleteCards, handleOpenImage, handleLikeClick);
  list.append(card);
});

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
console.log(handleOpenImage);
function renderCard(data) {
  list.prepend(createCard(data, deleteCards));
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = popupAddInputPlace.value; 
  const link = popupAddInputUrl.value; 
  renderCard({ name, link });
  closePopup(popupAdd);
  submitAdd.disabled = true;
  submitAdd.classList.add('popup__save-button_status_disabled');
}

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  closeEscapeAdd(popupAdd);
  closeBackground(popupAdd);
});

editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  closeEscapeAdd(popupEdit);
  closeBackground(popupEdit);
});

formEdit.addEventListener("submit", handleFormEditSubmit);
popupAddForm.addEventListener('submit', handleFormAddSubmit);

initialCards.forEach((data) => {
  renderCard(data);
});