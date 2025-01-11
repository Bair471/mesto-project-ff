import { addLike, removeLike } from "./api.js";

// Функция для удаления карточки из DOM
function deleteCardsFromHTML(deleteButton) {
  deleteButton.closest('.card').remove();
}

// Функция для создания карточки
function createCard(card, onDelete, handleOpenImage) {
  const cardTemplate = document.getElementById('card-template');
  const cardsElement = cardTemplate.content.cloneNode(true);
  const titleImage = cardsElement.querySelector('.card__image');
  const titleCard = cardsElement.querySelector('.card__title');
  const buttonLike = cardsElement.querySelector('.card__like-button');
  const deleteButton = cardsElement.querySelector('.card__delete-button');
  const likeCounter = cardsElement.querySelector('.card__like-counter');

  const cardId = card._id;
  const mine = card.mine;
  titleCard.textContent = card.name;
  titleImage.src = card.link;
  titleImage.alt = card.name;

  // Добавляем проверку на наличие likes
  const likes = card.likes || []; // Если likes нет, ставим пустой массив
  likeCounter.textContent = likes.length;

  // Проверка, поставил ли пользователь лайк
  const isLiked = likes.some(like => like._id === card.userId);
  if (isLiked) {
    buttonLike.classList.add('card__like-button_is-active');
  }

  // Открытие изображения
  titleImage.addEventListener('click', () => handleOpenImage(card.link, card.name));

  // Логика клика на лайк (с сервером)
  buttonLike.addEventListener('click', () => {
    // Если лайк уже поставлен, удалим его
    if (buttonLike.classList.contains('card__like-button_is-active')) {
      removeLike(cardId)
        .then(updatedCard => {
          buttonLike.classList.remove('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch(err => {
          throw new Error('Ошибка при удалении лайка: ' + err.message);
        });
    } else {
      // Если лайк не поставлен, добавим его
      addLike(cardId)
        .then(updatedCard => {
          buttonLike.classList.add('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch(err => {
          throw new Error('Ошибка при удалении лайка: ' + err.message);
        });
    }
  });

  // Удаление карточки (если она твоя)
  if (card.mine) {
    deleteButton.addEventListener('click', function handleDeleteClick() {
      onDelete(deleteButton, cardId, mine);
    });
  } else {
    deleteButton.remove(); // Убираем кнопку удаления, если это не твоя карточка
  }

  return cardsElement;
}

export { createCard, deleteCardsFromHTML };