export function openPopup(popup) {
  const closeButton = popup.querySelector(".popup__close");
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeBackground);
  closeButton.addEventListener('click', function () {
    closePopup(popup);
  });
}

export function closePopup(popup) {
  popup.removeEventListener('keydown', closeEscape);
  popup.removeEventListener('click', closeBackground);
  popup.classList.remove('popup_is-opened');
}

export function resetPopup(popup) {
  if (popup.querySelector('.popup__form')) {
    popup.querySelector('.popup__form').reset();
  }
}

export function closeEscape(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

export function closeBackground(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}