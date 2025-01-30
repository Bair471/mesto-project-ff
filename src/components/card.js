// Функция для удаления карточки из DOM
function deleteCardsFromHTML(deleteButton) {
  deleteButton.closest('.card').remove();
}

// Функция для создания карточки
function createCard(card, handleDeleteCard, handleOpenImage, handleLike, userId) {
  const cardTemplate = document.getElementById('card-template');
  const cardsElement = cardTemplate.content.cloneNode(true);
  const titleImage = cardsElement.querySelector('.card__image');
  const titleCard = cardsElement.querySelector('.card__title');
  const buttonLike = cardsElement.querySelector('.card__like-button');
  const deleteButton = cardsElement.querySelector('.card__delete-button');
  const likeCounter = cardsElement.querySelector('.card__like-counter');

  const cardId = card._id;
  titleCard.textContent = card.name;
  titleImage.src = card.link;
  titleImage.alt = card.name;

  // Добавляем проверку на наличие likes
  const likes = card.likes || []; // Если likes нет, ставим пустой массив
  likeCounter.textContent = likes.length;

  // Проверка, поставил ли пользователь лайк
  const isLiked = likes.some(like => like._id === userId);
  if (isLiked) {
    buttonLike.classList.add('card__like-button_is-active');
  }

  // Открытие изображения
  titleImage.addEventListener('click', () => handleOpenImage(card.link, card.name));
  
  // Логика клика на лайк (с сервером)
  buttonLike.addEventListener('click', () => handleLike(buttonLike, likeCounter, cardId));

  // Удаление карточки (если она твоя)
  const mine = card.owner._id === userId;
  if (mine) {
    deleteButton.addEventListener('click', function handleDeleteClick() {
      handleDeleteCard(deleteButton, cardId, mine);
    });
  } else {
    deleteButton.remove(); // Убираем кнопку удаления, если это не твоя карточка
  }

  return cardsElement;
}

export { createCard, deleteCardsFromHTML };