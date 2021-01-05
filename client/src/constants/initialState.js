export const SIGNUP_USER_INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  userExists: "",
};

export const SIGNUP_USER_ERROR_INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

export const SIGNUP_USER_SUCCESS_INITIAL_STATE = {
  message: "",
};

export const SIGNIN_USER_INITIAL_STATE = {
  email: "",
  password: "",
};

export const SIGNIN_USER_ERROR_INITIAL_STATE = {
  email: "",
  password: "",
  invalidUser: "",
};

export const POST_INITIAL_STATE = {
  title: "",
  image: "",
  body: "",
};
export const POST_ERROR_INITIAL_STATE = {
  title: "",
  image: "",
  body: "",
  invalidUser: "",
};

export const SIGNIN_USER_SUCCESS_INITIAL_STATE = {
  message: "",
};
export const NEW_USER_PASSWORD_INITIAL_STATE = {
  password: "",
  expire: "",
};
