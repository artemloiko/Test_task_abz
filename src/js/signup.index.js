import style from "../scss/signup.index.scss";
import { customSelect } from "./select";

//custom select with error handling
(function() {
  fetch("http://504080.com/api/v1/directories/enquiry-types")
    .then(response => response.json())
    .then(data => createCustomSelect(data.data))
    .catch(error => {
      // Sorry, the server did not respond. Trying again
      console.log("fetch error", error);
      createCustomSelect(null);
    });
  const createCustomSelect = function(data) {
    const nativeSelect = document.getElementById("select");
    const other = document.getElementById("select-other");

    //Filling select with received data
    if (data) {
      data.forEach((item, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = item.name;
        nativeSelect.appendChild(option);
      });
    } else {
      //if can't upload types add text input Enquiry type
      nativeSelect.hidden = true;
      other.hidden = false;
      other.required = true;
      other.placeholder = "Enquiry type";
      other.style.marginTop = 0;
      return;
    }

    const select = customSelect(nativeSelect);

    //show other on last option
    nativeSelect.addEventListener("change", function(e) {
      if (this.selectedIndex === this.options.length - 1) {
        other.hidden = false;
        other.required = true;
      } else {
        other.hidden = true;
        other.required = false;
      }
    });

    // custom select check
    select.addEventListener("blur", function() {
      deleteInputErr(this);
      select.classList.remove("select--error");
      if (!select.firstElementChild.innerHTML) {
        setInputErr(this, "This field is required");
        select.classList.add("select--error");
      }
    });

    // hide error on change
    nativeSelect.addEventListener("change", function(e) {
      if (nativeSelect.dataset.placeholder) delete nativeSelect.dataset.placeholder;
      if (select.firstElementChild.innerHTML) {
        deleteInputErr(this);
        select.classList.remove("select--error");
      }
    });
  };
})();

//TODO add description
function setInputErr(input, errText) {
  const inputWrapper = input.closest("label");
  if (inputWrapper) {
    inputWrapper.classList.add("form__input-block--error");
    inputWrapper.dataset.error = errText;
  }
}
//TODO add description
function deleteInputErr(input) {
  const inputWrapper = input.closest("label");
  if (inputWrapper) inputWrapper.classList.remove("form__input-block--error");
}
//form validations
//TODO: and sending...
function sendData(formData) {
  console.dir(formData.get("user_name"));
  const url = "http://504080.com/api/v1/support";
  fetch(url, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(response => console.log("Success:", response))
    .catch(error => console.error("Error:", error));
}
(function() {
  const form = document.forms[0];
  //forms elements
  const select = document.getElementById("select");
  const other = document.getElementById("select-other");
  const name = form.elements["user_name"];
  const email = form.elements["email"];
  const subject = form.elements["subject"];
  const description = form.elements["description"];
  const file = form.elements["file"];

  const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+\.[a-zA-Z0-9-]+$/;

  // This field is required on blur
  const formRequiredElems = [other, name, email, subject, description];

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
    if (!emailRegExp.test(this.value)) {
      setInputErr(this, "Invalid email");
    }
  });

  // Check form
  document.forms[0].addEventListener("submit", function(e) {
    formRequiredElems.forEach(elem => checkValueMiss(elem));

    if (!emailRegExp.test(email.value)) {
      setInputErr(email, "Invalid email");
      e.preventDefault();
      return;
    }

    if (select.dataset.placeholder) {
      select.nextElementSibling.classList.add("select--error");
      setInputErr(select, "This field is required");
      e.preventDefault();
      return;
    }

    let formData = new FormData(form);
    if (other.hidden) {
      formData.set("enquiry_type", select.options[select.selectedIndex].innerHTML);
    }
    sendData(formData);
    e.preventDefault();
  });

  function checkValueMiss(elem) {
    deleteInputErr(elem);
    if (elem.validity.valueMissing) {
      setInputErr(elem, "This field is required");
    }
  }
})();

//img uploader with error handling

(function() {
  const inputFile = document.forms[0].elements["file"];
  const uploadBlock = inputFile.parentNode;

  inputFile.addEventListener("change", function() {
    deleteInputErr(this);
    const f = this.files[0];

    if (!f) return;

    //type file check
    if (!f.type.match(/image\/\w*/)) {
      setInputErr(inputFile, "Image only please");
      return;
    }

    //size file check
    if (f.size > 5 * 1024 * 1024) {
      setInputErr(inputFile, "Image should not exceed 5MB");
      return;
    }
    //dimensions file check
    //create images with file src to check dimensions
    const image = document.createElement("img");
    image.src = window.URL.createObjectURL(f);
    image.style.position = "fixed";
    image.style.visibility = "hidden";
    image.style.pointerEvents = "none";
    document.forms[0].appendChild(image);

    const reader = new FileReader();

    reader.onload = function(e) {
      //if dimensions are exceed 300x300 set error
      if (image.offsetHeight > 300 || image.offsetWidth > 300) {
        setInputErr(inputFile, "Image should not exceed 300x300 pixels");
        document.forms[0].removeChild(image);
        return;
      }
      //show uploaded image
      uploadBlock.classList.add("form__file-wrapper--loaded");
      uploadBlock.style.backgroundImage = `url(${e.target.result})`;
    };

    reader.readAsDataURL(f);
  });
})();

// textarea charCount

(function() {
  const tarea = document.querySelector(".form__textarea");
  const twrap = document.querySelector(".form__input-block--tarea");

  tarea.addEventListener("input", function() {
    this.style.height = "152px";
    if (this.offsetHeight !== this.scrollHeight) {
      this.style.height = this.scrollHeight + 2 + "px";
    }
    twrap.dataset.charcount = `(${this.value.length}/1000)`;
  });
})();
