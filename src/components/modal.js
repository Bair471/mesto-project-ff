const popupOpenClass = 'popup_is-opened';

function closeActivePopup() {
  const activePopup = document.querySelector(popupOpenClass);
  if (activePopup) {
    closePopup(activePopup);
  }
}

export function openPopup(popup) {
  popup.classList.add(popupOpenClass);
}

export function closePopup(popup) {
  popup.classList.remove(popupOpenClass);
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