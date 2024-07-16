const validator = require("validator");
const message = require("../../constants/messages.json")

/**
 * Utility function to validate an email
 * @param {email} email to be validated
 * @returns true if the @param is a valid email address or false if otherwise
 */
exports.validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(email);
};
/**
 * Utitlity function to check if a password meets all the requirements
 * @param {string} password to be validated
 * @returns return an object containing the requirements and their respective validity tests results.
 */
exports.checkPassword = (password) => {
  const results = {
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  };
  if (!password || password.length === 0) {
    return results;
  }
  // Check for the length.
  if (password && password.length >= 8 && password.length <= 32) {
    results.length = true;
  }

  // Check if the password contains at least a capital letter.
  if (/.*[A-Z].*/.test(password)) {
    results.upperCase = true;
  }

  // Check if the password contains at least a lowercase letter.
  if (/.*[a-z].*/.test(password)) {
    results.lowerCase = true;
  }

  // Check if the password contains at least number.
  if (/.*[0-9].*/.test(password)) {
    results.number = true;
  }

  // Check if the password contains at least a special character.
  if (/[*@!#%&()^~{}]+/.test(password)) {
    results.specialChar = true;
  }
  return results;
};
/**
 * Utitlity function to validate a password
 * @param {string} password to be validated
 * @returns return an object containing error message and the validity tests results.
 */
exports.validatePassword = (password) => {
  if (!password || password.length < 8 || password.length > 32) {
    return {
      isValid: false,
      message:
        "Password must have at least 8 characters and maximum of 32 characters.",
    };
  }

  // Check if the password contains at least an uppercase letter.
  let regex = /.*[A-Z].*/;
  if (!regex.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least an uppercase letter.",
    };
  }

  // Check if the password contains at least a lowercase letter.
  regex = /.*[a-z].*/;
  if (!regex.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least a lowercase letter.",
    };
  }

  // Check if the password contains at least number
  regex = /.*[0-9].*/;
  if (!regex.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least a number.",
    };
  }

  // Check if the password contains at least a special character.
  regex = /[*@!#%&()^~{}]+/;
  if (!regex.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least a special character.",
    };
  }

  return { isValid: true, message: null };
};
/**
 * Utility function to check if inputs are valids
 * @param {string} email 
 * @param {string} password 
 * @param {string} confirmPassword 
 * @param {boolean} checkMatch flag param indicating whether to check if password and confirmPassword matched.
 * @returns an object containing the error message and validity test result
 */
exports.handleError = (email, password, confirmPassword, checkMatch) => {
  let isErr = false; // Flag variable which is true if at least one validation fails.

  // Set appropriate error message.
  const error = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    error.email = message.emailInvalid;
    isErr = true;
  }

  // Check if the password is valid
  const passwordCheck = this.validatePassword(password);
  if (!passwordCheck.isValid) {
    error.password = passwordCheck.message;
    isErr = true;
  }

  if (!checkMatch) {
    return { isErr, error };
  }
  // Check if the password and confirmPassword matched
  if (password && password.length !== 0 && password !== confirmPassword) {
    error.confirmPassword = message.notMatched;
    isErr = true;
  }
  return { isErr, error };
};
