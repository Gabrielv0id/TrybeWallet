// Coloque aqui suas actions
export const EMAIL_SUBMIT = 'EMAIL_SUBMIT';

export const submitLogin = (email) => ({
  type: EMAIL_SUBMIT,
  payload: email,
});
