import './index.css';
import { initialCards, createCards, deleteCards } from './components/cards';
import { openModal, closeModal, resetPopup, closeEscapeAdd, closeBackground } from './components/modal';


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


function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = popupAddInputPlace.value; 
  const link = popupAddInputUrl.value; 
  renderCard({ name, link });
  closeModal(popupAdd);
  submitAdd.disabled = true;
  submitAdd.classList.add('popup__save-button_status_disabled');
}

function renderCard(data) {
  const list = document.querySelector(".cards");
  list.prepend(createCard(data, deleteCard));
}


addButton.addEventListener('click', () => {
  openModal(popupAdd);
  closeEscapeAdd(popupAdd);
  closeBackground(popupAdd);
});

editButton.addEventListener('click', function () {
  openModal(popupEdit);
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