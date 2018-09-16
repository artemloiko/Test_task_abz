document.addEventListener("DOMContentLoaded", function() {
  const form = document.forms[0];
  //forms elements
  const other = document.getElementById("select-other");
  const name = form.elements["user_name"];
  const email = form.elements["email"];
  const subject = form.elements["subject"];
  const description = form.elements["description"];

  const formRequiredElems = [other, name, email, subject, description];

  // Check required fields on blur and input
  formRequiredElems.forEach(elem => {
    elem.addEventListener("blur", function() {
      checkValueMiss(elem);
    });

    elem.addEventListener("input", function() {
      if (!this.validity.valueMissing) {
        deleteInputErr(this);
      }
    });
  });

  // Email check
  email.addEventListener("blur", function() {
    deleteInputErr(this);
    if (!this.validity.valid) {
      setInputErr(this, "Invalid email");
    }
  });
});

function checkValueMiss(elem) {
  deleteInputErr(elem);
  if (elem.validity.valueMissing) {
    setInputErr(elem, "This field is required");
  }
}

export function setInputErr(input, errText) {
  const inputWrapper = input.closest("label");
  if (inputWrapper) {
    inputWrapper.classList.add("form__input-block--error");
    inputWrapper.dataset.error = errText;
  }
}

export function deleteInputErr(input) {
  const inputWrapper = input.closest("label");
  if (inputWrapper) inputWrapper.classList.remove("form__input-block--error");
}

// Check form
export function checkForm() {
  const select = document.getElementById("select");
  const email = document.forms[0].elements["email"];

  const formRequiredElems = [...document.forms[0].elements].filter(elem => elem.required);
  //add errors if they are there
  formRequiredElems.forEach(elem => checkValueMiss(elem));

  //check every required input
  let formIsCorrect = formRequiredElems.every(elem => !elem.validity.valueMissing);
  if (!email.validity.valid) {
    setInputErr(email, "Invalid email");
    formIsCorrect = false;
  }
  if (select.dataset.placeholder) {
    select.nextElementSibling.classList.add("select--error");
    setInputErr(select, "This field is required");
    formIsCorrect = false;
  }

  return formIsCorrect;
}
