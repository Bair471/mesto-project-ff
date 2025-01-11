import './index.css';
import { createCard, deleteCardsFromHTML } from './components/card.js'; // Убираем handleLikeClick из импорта
import { openPopup, closePopup, closeActivePopupOnBackgroundClick, resetPopup } from './components/modal.js';
import { validateFormProfile, clearValidation } from './validation.js';
import { createNewCards, deleteCard, getInitialCards, getInitialUser, updateUser } from './components/api.js';

const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");
const editButton = profile.querySelector(".profile__edit-button");

const formEdit = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

const nameInput = document.querySelector('.popup__input.popup__input_type_name');
const jobInput = document.querySelector('.popup__input.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

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

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  updateUser({
    name: nameInput.value,
    about: jobInput.value
  }).then(() => {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
  }).catch((err) => {
    console.log('Ошибка при обновлении данных пользователя:', err);
  });
}

function renderCard(card) {
  list.prepend(createCard(card, handleDeleteCard, handleOpenImage));
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const name = popupAddInputPlace.value;
  const link = popupAddInputUrl.value;
  createNewCards({ name, link }).then((card) => {
    renderCard({ _id: card._id, name, link, mine: true });
    closePopup(popupAdd);
    resetPopup(popupAdd);
  }).catch((err) => {
    console.log('Ошибка при добавлении карточки:', err);
  });
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
  resetPopup(popupAdd);
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

if (imagePopupCloseButton) {
  imagePopupCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
  });
}

popupAdd.addEventListener('click', (evt) => closeActivePopupOnBackgroundClick);
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

validateFormProfile(validationConfig);

// Функция для удаления карточки
function handleDeleteCard(deleteButton, cardId, mine) {
  if (!mine) {
    console.log('Нельзя удалять чужие карточки');
    return;
  }

  // Запрос на удаление карточки с сервера
  deleteCard(cardId).then(() => {
    // При успешном удалении, удаляем карточку из DOM
    deleteCardsFromHTML(deleteButton);
  }).catch((err) => {
    console.log('Ошибка при удалении карточки:', err);
  });
}

// Получаем данные пользователя и карточек с сервера
Promise.all([getInitialUser(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // Данные пользователя
    const userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;

    // Проверяем, существует ли элемент профиля для аватара
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    // Рендерим карточки, полученные с сервера
    initialCards.forEach((card) => {
      const newCard = createCard({
        _id: card._id,
        name: card.name,
        link: card.link,
        mine: card.owner._id === userId,
        didILike: card.likes.some((like) => like._id === userId),
        likes: card.likes,
      }, handleDeleteCard, handleOpenImage);
      list.prepend(newCard);
    });
  })
  .catch((err) => {
    console.log('Ошибка при загрузке данных:', err);
  });
