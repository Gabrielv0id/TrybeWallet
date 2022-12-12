// Coloque aqui suas actions
export const EMAIL_SUBMIT = 'EMAIL_SUBMIT';
export const CURRENCIES_SUBMIT = 'CURRENCIES_SUBMIT';

export const submitLogin = (email) => ({
  type: EMAIL_SUBMIT,
  payload: email,
});

export const submitCurrrencies = (currencies) => ({
  type: CURRENCIES_SUBMIT,
  payload: currencies,
});
