// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");


const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup popup_type_image");
const cardTemplate = document.querySelector(".card-template");


function crateCard(data) {
  const cardsElement = cardTemplate.cloneNode(true);
  const titleImage = cardsElement.querySelector('.card__image');
  const titleCard = cardsElement.querySelector('.card__title');
  const buttonLike = cardsElement.querySelector('.card__like-button');
  const deleteButton = cardsElement.querySelector('.card__delete-button');

  buttonLike.addEventListener('click', function handleLikeClick() {
    buttonLike.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', function handleclick() {
    deleteButton.closest('.element').remove();
  });

  titleImage.addEventListener('click', function handleclick() {
    imagePopupCaption.textContent = data.name;
    imagePopupImg.src = data.link;
    imagePopupImg.alt = data.name;
    openPopup(popupImage);
    closeEscapeAdd(popupImage);
    closeBackground(popupImage);
  });

  titleCard.textContent = data.name;
  titleImage.src = data.link;
  titleImage.alt = data.name;

  return cardsElement;
}

function openPopup(form) {
  const closeButton = form.querySelector(".popup__close");
  form.classList.add('popup_is-opened');
  closeButton.addEventListener('click', function () {
    closePopup(form);
  });
}

function closePopup(form) {
  document.removeEventListener('keydown', closeEscape);
  document.removeEventListener('click', closeBackground);
  form.classList.remove('popup_is-opened');
  resetPopup(form);
}

function resetPopup(form) {
  if (form.querySelector('.popup__form')) {
    form.querySelector('.popup__form').reset();
  }
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

const closeEscapeAdd = (form) => {
  document.addEventListener('keydown', closeEscape)
};

const closeEscape = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

const closeBackground = (form) => {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__background')) {
      closePopup(form);
    }
  });
};

formEdit.addEventListener("submit", formEditSubmitHandler);
submitAdd.addEventListener('click', formAddSubmitHandler);

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function renderCard(data) {
  list.prepend(createCard(data))
}

initialCards.forEach((data) => {
  renderCard(data);
})

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({ name: inputPlace.value, link: inputUrl.value });
  closePopup(popupAdd);
  submitAdd.disabled = "true";
  submitAdd.classList.add('popup__save-button_status_disabled');
}
