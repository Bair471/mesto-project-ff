export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал-Новый",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

export function deleteCards(deleteButton) {
  deleteButton.closest('.card').remove();
}

export function createCards(data, onDelete) {
  const cardTemplate = document.getElementById('card-template');
  const cardsElement = cardTemplate.content.cloneNode(true);
  const titleImage = cardsElement.querySelector('.card__image');
  const titleCard = cardsElement.querySelector('.card__title');
  const buttonLike = cardsElement.querySelector('.card__like-button');
  const deleteButton = cardsElement.querySelector('.card__delete-button');

  buttonLike.addEventListener('click', function handleLikeClick() {
    buttonLike.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', function handleDeleteClick() {
    onDelete(deleteButton);
  });

  titleImage.addEventListener('click', function handledPhotoCards() {
    const imagePopupCaption = document.querySelector("#popup_type_image .popup__caption");
    const imagePopupImg = document.querySelector("#popup_type_image .popup__image");
    imagePopupCaption.textContent = data.name;
    imagePopupImg.src = data.link;
    imagePopupImg.alt = data.name;
    openModal(document.querySelector("#popup_type_image"));
    closeEscapeAdd(document.querySelector("#popup_type_image"));
    closeBackground(document.querySelector("#popup_type_image"));
  });

  titleCard.textContent = data.name;
  titleImage.src = data.link;
  titleImage.alt = data.name;

  return cardsElement;
}