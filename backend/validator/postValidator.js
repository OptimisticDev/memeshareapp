import Validator from "validator";
import isEmpty from "./isEmpty.js";

const validatePostInput = (data) => {
  let errors = {};
  console.log(data);
  if (!Validator.isLength(data.image, { min: 1 })) {
    errors.image = "Image is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export default validatePostInput;
