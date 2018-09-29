document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("signup");
  const other = document.getElementById("select-other");
  const email = form.elements["email"];

  const formRequiredElems = [...form.elements].filter(elem => elem.required);
  //by default other isn't required, but listener should be added
  formRequiredElems.push(other);

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
  const form = document.getElementById("signup");
  const select = document.getElementById("select");
  const email = form.elements["email"];

  const formRequiredElems = [...form.elements].filter(elem => elem.required);
  //add errors if they are there
  formRequiredElems.forEach(elem => checkValueMiss(elem));

  //check every required input
  let formIsCorrect = formRequiredElems.every(elem => !elem.validity.valueMissing);
  if (!email.validity.valid) {
    setInputErr(email, "Invalid email");
    formIsCorrect = false;
  }
  if (select.selectedIndex < 0) {
    select.nextElementSibling.classList.add("select--error");
    setInputErr(select, "This field is required");
    formIsCorrect = false;
  }

  return formIsCorrect;
}
