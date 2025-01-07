const validateFormProfile = (validationConfig) => {
    const formList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );
  
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault(); // предотвращаем стандартное поведение
      });
  
      // Устанавливаем обработчики событий для каждой формы
      setEventListeners(
        formElement,
        validationConfig.inputSelector,
        validationConfig.submitButtonSelector,
        validationConfig.inactiveButtonClass,
        validationConfig.inputErrorClass,
        validationConfig.errorClass
      );
    });
  };
  
  // Устанавливаем обработчики событий для всех инпутов
  const setEventListeners = (
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  ) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); // Все инпуты в форме
    const submitButton = formElement.querySelector(submitButtonSelector); // Кнопка отправки формы
  
    // Проверяем валидность каждого поля при вводе
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        // Передаем formElement в checkInputValidity
        checkInputValidity(formElement, input, inputErrorClass, errorClass);
        // Проверка состояния кнопки отправки
        validation(inputList, submitButton, inactiveButtonClass);
      });
    });
  };
  
  // Функция проверки валидности инпута
  const checkInputValidity = (formElement, input, inputErrorClass, errorClass) => {
    // Ищем элемент ошибки, используя класс, который заканчивается на '-error' (например, 'name-error')
    const errorElement = formElement.querySelector(`.${input.id}-error`);
  
    if (!input.validity.valid) {
      input.classList.add(inputErrorClass); // Добавляем класс ошибки инпуту
      errorElement.textContent = input.validationMessage; // Выводим сообщение об ошибке
      errorElement.classList.add(errorClass); // Показываем элемент с ошибкой
    } else {
      input.classList.remove(inputErrorClass); // Убираем класс ошибки
      errorElement.textContent = ''; // Очищаем сообщение об ошибке
      errorElement.classList.remove(errorClass); // Прячем элемент с ошибкой
    }
  };
  
  // Функция для проверки всей формы и состояния кнопки
  function validation(inputList, submitButton, inactiveButtonClass) {
    // Проверяем, если хоть одно поле невалидно
    if (inputList.some((input) => !input.validity.valid)) {
      submitButton.classList.add(inactiveButtonClass); // Отключаем кнопку
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass); // Включаем кнопку
      submitButton.disabled = false;
    }
  };
  
  // Функция для очистки валидации
  const clearValidation = (form, validationConfig) => {
    const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  
    // Очищаем все ошибки
    inputs.forEach((input) => {
      const errorElement = form.querySelector(`.${input.id}-error`);
      hideInputError(input, errorElement, validationConfig);
    });
  
    // Включаем кнопку отправки
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
    submitButton.disabled = false;
  };
  
  // Функция скрытия ошибки
  const hideInputError = (input, errorElement, validationConfig) => {
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = ''; // Очищаем сообщение об ошибке
    errorElement.classList.remove(validationConfig.errorClass); // Прячем элемент с ошибкой
  };

  export { validateFormProfile, clearValidation };