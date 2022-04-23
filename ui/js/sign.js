const EMAIL_PATTERN =
  /^[a-zA-Z0-9._]{1,}\@[a-z]{1,}\.[a-z]{1,}\.{0,}[a-z]{0,}$/;
const PASSWD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%&^@!])[a-zA-Z0-9#$%^&@!]{8,}$/;
const NAME_PATTERN = /^[a-zA-Z]{3,25}$/;

const mainBody = document.getElementById("main_body");
const loginForm = document.getElementById("form1");
const signupForm = document.getElementById("form2");
const primaryToggle = document.getElementById("toggle_page");
const secondaryToggle = document.getElementById("toggle_page1");

signupForm.remove();
let stat = 1;

const validateInput = (
  inputType,
  formSubmitBtn,
  formInput,
  inputPattern,
  inputErrorElement,
  inputConstraintsElement = ""
) => {
  const validate = (inputVal) => {
    if (inputPattern.test(inputVal) === false) {
      formSubmitBtn.setAttribute("disabled", "");
      formInput.classList.add("invalid-input");
      inputErrorElement.innerText = `Please enter a valid ${inputType}`;
      inputErrorElement.classList.remove("hide");
      if (inputConstraintsElement !== "") {
        inputConstraintsElement.classList.remove("hide");
      }
    } else {
      formSubmitBtn.removeAttribute("disabled");
      formInput.classList.remove("invalid-input");
      inputErrorElement.classList.add("hide");
      if (inputConstraintsElement !== "") {
        inputConstraintsElement.classList.add("hide");
      }
    }
  };

  formInput.addEventListener("input", () => {
    let formInputVal = formInput.value;
    validate(formInputVal.trim());
  });
};

const addLoginFormValidations = () => {
  const loginSubmitBtn = document.querySelector('#form1 input[type="submit"]');

  const loginEmailInput = document.querySelector('#form1 input[type="email"]');
  const loginEmailErrorElement = document.querySelector("#form1 #email-error");

  validateInput(
    "email",
    loginSubmitBtn,
    loginEmailInput,
    EMAIL_PATTERN,
    loginEmailErrorElement
  );

  const loginPasswdInput = document.querySelector(
    '#form1 input[type="password"]'
  );
  const loginPasswdErrorElement = document.querySelector(
    "#form1 #passwd-error"
  );
  const loginPasswdConstraintsElement = document.querySelector(
    "#form1 #passwd-constraints"
  );

  validateInput(
    "password",
    loginSubmitBtn,
    loginPasswdInput,
    PASSWD_PATTERN,
    loginPasswdErrorElement,
    loginPasswdConstraintsElement
  );
};

const addSignupFormValidations = () => {
  const signupSubmitBtn = document.querySelector('#form2 input[type="submit"]');

  const signupEmailInput = document.querySelector('#form2 input[type="email"]');
  const signupEmailErrorElement = document.querySelector("#form2 #email-error");

  validateInput(
    "email",
    signupSubmitBtn,
    signupEmailInput,
    EMAIL_PATTERN,
    signupEmailErrorElement
  );

  const signupFirstNameInput = document.querySelector(
    '#form2 input[name="firstname"]'
  );
  const signupFirstNameErrorElement = document.querySelector(
    "#form2 #first-name-error"
  );
  const signupFirstNameConstraintsElement = document.querySelector(
    "#form2 #first-name-constraints"
  );

  validateInput(
    "first name",
    signupSubmitBtn,
    signupFirstNameInput,
    NAME_PATTERN,
    signupFirstNameErrorElement,
    signupFirstNameConstraintsElement
  );

  const signupLastNameInput = document.querySelector(
    '#form2 input[name="lastname"]'
  );
  const signupLastNameErrorElement = document.querySelector(
    "#form2 #last-name-error"
  );
  const signupLastNameConstraintsElement = document.querySelector(
    "#form2 #last-name-constraints"
  );

  validateInput(
    "last name",
    signupSubmitBtn,
    signupLastNameInput,
    NAME_PATTERN,
    signupLastNameErrorElement,
    signupLastNameConstraintsElement
  );

  const signupPasswdInput = document.querySelector(
    '#form2 input[type="password"]'
  );
  const signupPasswdErrorElement = document.querySelector(
    "#form2 #passwd-error"
  );
  const signupPasswdConstraintsElement = document.querySelector(
    "#form2 #passwd-constraints"
  );

  validateInput(
    "password",
    signupSubmitBtn,
    signupPasswdInput,
    PASSWD_PATTERN,
    signupPasswdErrorElement,
    signupPasswdConstraintsElement
  );
};

const togglePage = () => {
  if (stat === 1) {
    loginForm.remove();
    mainBody.appendChild(signupForm);
    stat = 2;
    addSignupFormValidations();
  } else {
    signupForm.remove();
    mainBody.appendChild(loginForm);
    stat = 1;
    addLoginFormValidations();
  }
};

addLoginFormValidations();
primaryToggle.addEventListener("click", togglePage);
secondaryToggle.addEventListener("click", togglePage);
