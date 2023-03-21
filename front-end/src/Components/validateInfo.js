const validateEmail = (values) => {
  let email = null;
  let isValidated = false;
  if (!values.email) {
    email = "Email Required!";
  } else if (
    !/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/i.test(
      values.email
    )
  ) {
    email = "Email Address is invalid";
  } else {
    isValidated = true;
  }

  return { email, isValidated };
};

const validateOTP = (values) => {
  let OTPerror = {};
  let isValidated = false;
  if (!values.OTP) {
    OTPerror = "OTP Required!";
  } else if (!/\d{6}/.test(values.OTP)) {
    OTPerror = "Exactly 6 Numeric characters allowed";
  } else {
    isValidated = true;
  }
  return { OTPerror, isValidated };
};

const validateUser = (values) => {
  let userError = {
    username: null,
    password: null,
    confirmation: null,
  };
  let isValidated = false;
  let usernameValid = false;
  let passwordValid = false;
  let confirmationValid = false;
  if (!values.username) {
    userError.username = "Username Required";
  } else if (!/^[^\d!@#$%^&*_].[a-zA-Z0-9_]+$/g.test(values.username)) {
    userError.username =
      "Username should begin with Alphabetical character. Example: Burning_Soul99";
  } else {
    usernameValid = true;
  }
  if (!values.password) {
    userError.password = "Password Required";
  } else if (values.password.length < 6) {
    userError.password = "Password must contain atleast 6 characters";
  } else {
    passwordValid = true;
  }
  if (!values.confirmation) {
    userError.confirmation = "Confirmation Password Required";
  } else if (values.confirmation !== values.password) {
    userError.confirmation = "Both the passwords should be the same";
  } else {
    confirmationValid = true;
  }

  if (usernameValid && passwordValid && confirmationValid) {
    isValidated = true;
  }
  return { userError, isValidated };
};
const validateLogin = (values) => {
  let userError = {
    username: null,
    password: null,
    confirmation: null,
  };
  let isValidated = false;
  let usernameValid = false;
  let passwordValid = false;
  if (!values.username) {
    userError.username = "Username Required";
  } else {
    usernameValid = true;
  }
  if (!values.password) {
    userError.password = "Password Required";
  } else {
    passwordValid = true;
  }

  if (usernameValid && passwordValid) {
    isValidated = true;
  }
  return { userError, isValidated };
};

const validateAccount = (values) => {
  let nameError = {
    fname: null,
    lname: null,
    dob: null,
  };
  let isValidated = false;
  let fnameValid = false;
  let lnameValid = false;
  let dobValid = false;
  if (!values.fname) {
    nameError.fname = "Enter this field!";
  } else if (!/^[A-Za-z]+$/g.test(values.fname)) {
    nameError.fname = "Only Alphabet Characters allowed!";
  } else {
    fnameValid = true;
  }
  if (!values.lname) {
    nameError.lname = "Enter this field!";
  } else if (!/^[A-Za-z]+$/g.test(values.lname)) {
    nameError.fname = "Only Alphabet Characters allowed!";
  } else {
    lnameValid = true;
  }
  console.log(values);
  if (!values.day || !values.month || !values.year) {
    nameError.dob = "Enter appropriate Date of Birth!";
    // console.log(day, "-", month, "-", year);
  } else {
    dobValid = true;
  }

  if (fnameValid && lnameValid && dobValid) {
    isValidated = true;
  }
  return { nameError, isValidated };
};
export {
  validateEmail,
  validateOTP,
  validateUser,
  validateAccount,
  validateLogin,
};
