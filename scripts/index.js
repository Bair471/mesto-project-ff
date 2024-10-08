// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const profile = document.querySelector(".profile");
const addButton = profile.querySelector(".profile__add-button");


const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup popup_type_image");

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

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  closeEscapeAdd(popupAdd);
  closeBackground(popupAdd);
});
