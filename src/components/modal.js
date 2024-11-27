export function openPopup(form) {
  const closeButton = form.querySelector(".popup__close");
  form.classList.add('popup_is-opened');
  closeButton.addEventListener('click', function () {
    closePopup(form);
  });
}

export function closePopup(form) {
  document.removeEventListener('keydown', closeEscape);
  document.removeEventListener('click', closeBackground);
  form.classList.remove('popup_is-opened');
  resetPopup(form);
}

export function resetPopup(form) {
  if (form.querySelector('.popup__form')) {
    form.querySelector('.popup__form').reset();
  }
}

export function closeEscapeAdd(form) {
  document.addEventListener('keydown', closeEscape);
}

export function closeEscape(evt) {
  const activePopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

export function closeBackground(form) {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__background')) {
      closePopup(form);
    }
  });
}