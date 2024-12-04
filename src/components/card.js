function createCard(data, onDelete, handleOpenImage, handleLikeClick) {
  const cardTemplate = document.getElementById('card-template');
  const cardsElement = cardTemplate.content.cloneNode(true);
  const titleImage = cardsElement.querySelector('.card__image');
  const titleCard = cardsElement.querySelector('.card__title');
  const buttonLike = cardsElement.querySelector('.card__like-button');
  const deleteButton = cardsElement.querySelector('.card__delete-button');
  

  titleCard.textContent = data.name; 
  titleImage.src = data.link;        
  titleImage.alt = data.name;

  titleImage.addEventListener('click', () => handleOpenImage(titleImage.src, titleCard.name));

  buttonLike.addEventListener('click', handleLikeClick);
  deleteButton.addEventListener('click', function handleDeleteClick() {
    onDelete(deleteButton);
  });

  return cardsElement;
}

function handleLikeClick(evt) {
  if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
  }
}

function deleteCards(deleteButton) {
  deleteButton.closest('.card').remove();
}

export { createCard, deleteCards, handleLikeClick };

