const popupOpenClass = 'popup_is-opened';

function closeActivePopup() {
  const activePopup = document.querySelector('.popup_is-opened');
  if (activePopup) {
    closePopup(activePopup);
  }
}

export function openPopup(popup) {
  popup.classList.add(popupOpenClass);
  document.addEventListener('keydown', closeActivePopupOnEscape);
}

export function closePopup(popup) {
  popup.classList.remove(popupOpenClass);
  document.removeEventListener('keydown', closeActivePopupOnEscape);
}

export function closeActivePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    closeActivePopup();
  }
}

export function closeActivePopupOnBackgroundClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}