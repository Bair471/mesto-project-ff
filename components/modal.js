export function openModal(popup) {
  const closeButton = popup.querySelector(".popup__close");
  popup.classList.add('popup_is-opened');
  closeButton.addEventListener('click', function () {
    closeModal(popup);
  });
}

export function closeModal(popup) {
  document.removeEventListener('keydown', closeEscape);
  document.removeEventListener('click', closeBackground);
  popup.classList.remove('popup_is-opened');
  resetPopup(popup);
}

export function resetPopup(popup) {
  if (popup.querySelector('.popup__form')) {
    popup.querySelector('.popup__form').reset();
  }
}

export function closeEscapeAdd(form) {
  document.addEventListener('keydown', closeEscape);
}

export function closeEscape(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closeModal(activePopup);
  }
}

export function closeBackground(form) {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__background')) {
      closeModal(form);
    }
  });
}