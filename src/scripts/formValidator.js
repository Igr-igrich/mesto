export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._formList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._errorMessage = this._formElement.querySelector(this._config.inputErrorClass);
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._disabledSubmitButton = this._formElement.querySelector(this._config.inactiveButtonClass);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', event => event.preventDefault());
    this._setEventListeners();
  }

  // функции включения и выключения кнопки
  disableButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  _showInputError(inputElement, errorClass) {
    inputElement.classList.add(this._config.inputErrorClass);
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(inputElement, errorClass) {
    inputElement.classList.remove(this._config.inputErrorClass);
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
  }

  _checkInputValidity(inputElement, errorClass, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorClass, inputErrorClass);
    } else {
      this._hideInputError(inputElement, errorClass, inputErrorClass);
    }
  }

  _setEventListeners() {
    this._formList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._formList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'true');
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
}
