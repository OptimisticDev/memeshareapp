import Validator from "validator";
import isEmpty from "./isEmpty.js";

const validateSignInUserInput = (data) => {
  let errors = {};
  let { email, password } = data;

  if (!Validator.isLength(password, { min: 1 })) {
    errors.password = "Password is required!";
  }

  if (!Validator.isLength(email, { min: 1 })) {
    errors.email = "Email is required!";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Invalid Email!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignInUserInput;
