import style from "../scss/signup.index.scss";
import { customSelect } from "./select";

// const inputController = (function() {
//   function setErr(input, errText) {
//     const inputWrapper = input.closest("label");
//     if (inputWrapper) {
//       inputWrapper.classList.add("form__input-block--error");
//       inputWrapper.dataset.error = errText;
//     }
//   }

//   function deleteErr(input) {
//     const inputWrapper = input.closest("label");
//     if (inputWrapper) inputWrapper.classList.remove("form__input-block--error");
//   }

//   return {
//     setErr: setErr,
//     deleteErr: deleteErr
//   };
// })();

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
  //Filling select with received data
  const nativeSelect = document.getElementById("select");
  data.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.name;
    nativeSelect.appendChild(option);
  });
  console.log("it is checking form");
  const other = document.getElementById("select-other");
  nativeSelect.addEventListener("change", function(e) {
    if (this.selectedIndex === this.options.length - 1) {
      other.hidden = false;
    } else {
      other.hidden = true;
    }
  });

  document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
  });

  const select = customSelect(nativeSelect);
})();

//img uploader

(function() {
  const inputFile = document.forms[0].elements["file"];
  const uploadBlock = inputFile.parentNode;
  inputFile.addEventListener("change", function() {
    const file = this.files[0];
    if (!file) return;
    // inputController.deleteErr(inputFile);
    // if (!file.type.match(/image\/\w*/)) {
    //   inputController.setErr(inputFile, "Image only please.");
    //   return;
    // }
    // if (file.size > 5 * 1024 * 1024) {
    //   inputController.setErr(inputFile, "Image cannot be more 5mb.");
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = function(e) {
      uploadBlock.classList.add("form__file-wrapper--loaded");
      uploadBlock.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
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
