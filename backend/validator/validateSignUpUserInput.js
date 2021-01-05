import Validator from "validator";
import isEmpty from "./isEmpty.js";

const validateSignUpUserInput = (data) => {
  let errors = {};
  let { name, email, password } = data;

  if (!Validator.isLength(name, { min: 1 })) {
    errors.name = "Name is required!";
  } else if (!Validator.isLength(name, { min: 2, max: 20 })) {
    errors.name = "Name must be between 2 and 20 characters!";
  }

  if (!Validator.isLength(password, { min: 1 })) {
    errors.password = "Password is required!";
  } else if (!Validator.isLength(password, { min: 5, max: 20 })) {
    errors.password = "Password must be between 5 and 20 characters!";
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

export default validateSignUpUserInput;
