import style from "../scss/signup.index.scss";
import { customSelect } from "./select";

const data = [
  {
    id: 1,
    name: "Type 1"
  },
  {
    id: 2,
    name: "Type 2"
  },
  {
    id: 3,
    name: "Type 3"
  },
  {
    id: 0,
    name: "Other"
  }
];
const checkForm = (function() {
  const form = document.forms[0];
  //forms elements
  const nativeSelect = document.getElementById("select");
  const other = document.getElementById("select-other");
  const name = form.elements["user_name"];
  const email = form.elements["email"];
  const subject = form.elements["subject"];
  const description = form.elements["description"];
  const file = form.elements["file"];

  //Filling select with received data
  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.name;
    nativeSelect.appendChild(option);
  });
  const select = customSelect(nativeSelect);

  // This field is required on blur
  const formRequiredElems = [other, name, email, subject, description];
  formRequiredElems.forEach(elem => {
    elem.addEventListener("blur", function() {
      checkValueMiss(elem);
    });
    elem.addEventListener("input", function() {
      if (!this.validity.valueMissing) {
        deleteErr(this);
      }
    });
  });
  //Some elements non required errors

  email.addEventListener("blur", function() {
    deleteErr(this);
    if (!this.validity.valid) {
      setErr(this, "Invalid email");
    }
  });

  select.addEventListener("blur", function() {
    console.log("select blur");
    deleteErr(this);
    select.classList.remove("select--error");
    if (!select.firstElementChild.innerHTML) {
      setErr(this, "This field is required");
      select.classList.add("select--error");
    }
  });

  // This field is required on sumbit
  document.forms[0].addEventListener("submit", function(e) {
    formRequiredElems.forEach(elem => checkValueMiss(elem));
    if (!email.validity.valid) setErr(email, "Invalid email");
    if (!select.firstElementChild.innerHTML) {
      select.classList.add("select--error");
      setErr(select, "This field is required");
    }
    e.preventDefault();
  });

  nativeSelect.addEventListener("change", function(e) {
    if (select.firstElementChild.innerHTML) {
      select.classList.remove("select--error");
      deleteErr(this);
    }
    if (this.selectedIndex === this.options.length - 1) {
      other.hidden = false;
      other.required = true;
    } else {
      other.hidden = true;
      other.required = false;
    }
  });
  function checkValueMiss(elem) {
    deleteErr(elem);
    if (elem.validity.valueMissing) {
      setErr(elem, "This field is required");
    }
  }
  function setErr(input, errText) {
    const inputWrapper = input.closest("label");
    if (inputWrapper) {
      inputWrapper.classList.add("form__input-block--error");
      inputWrapper.dataset.error = errText;
    }
  }
  function deleteErr(input) {
    const inputWrapper = input.closest("label");
    if (inputWrapper) inputWrapper.classList.remove("form__input-block--error");
  }
})();

//img uploader

(function() {
  const inputFile = document.forms[0].elements["file"];
  const uploadBlock = inputFile.parentNode;

  inputFile.addEventListener("change", function() {
    const f = this.files[0];
    // if (!f) return;
    // if (!f.type.match(/image\/\w*/)) {
    //   setErr(inputFile, "Image only please.");
    //   return;
    // }
    // if (f.size > 5 * 1024 * 1024) {
    //   setErr(inputFile, "Image cannot be more 5mb.");
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = function(e) {
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
    // console.log(twrap.dataset.charcount);
    this.style.height = "152px";
    if (this.offsetHeight !== this.scrollHeight) {
      this.style.height = this.scrollHeight + 2 + "px";
    }
    twrap.dataset.charcount = `(${this.value.length}/1000)`;
  });
})();
