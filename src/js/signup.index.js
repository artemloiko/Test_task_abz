import swal from "sweetalert2";
import style from "../scss/signup.index.scss";
import { customSelect } from "./signup/select";
import { overlayLoader } from "./signup/overlayLoader";
import { deleteInputErr, setInputErr, checkForm } from "./signup/formCheck";
import "./signup/imgUploader";
import "./signup/textarea.js";

(function() {
  //  FILLING and CREATING custom select _____________________________________________

  //get data for select
  fetch("http://504080.com/api/v1/directories/enquiry-types")
    .then(response => response.json())
    .then(data => fillSelect(data.data))
    .then(select => createCustomSelect(select))
    .catch(error => {
      console.log("loads enquiry-types fetch error", error);
      fillSelect(null);
    });

  //fill default select
  const fillSelect = function(data) {
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
      //if can't upload types show only text input Enquiry type
      nativeSelect.hidden = true;
      other.hidden = false;
      other.required = true;
      other.placeholder = "Enquiry type";
      other.style.marginTop = 0;
      return;
    }

    return Promise.resolve(nativeSelect);
  };

  // Creating custom select with errors handling __________________________________________________________
  function createCustomSelect(nativeSelect) {
    //creating custom select
    const select = customSelect(nativeSelect);
    // custom select check
    select.addEventListener("blur", function() {
      deleteInputErr(this);
      select.classList.remove("select--error");
      if (!select.firstElementChild.innerHTML) {
        setInputErr(this, "This field is required");
        select.classList.add("select--error");
      }
    });
    //on select option delete error
    nativeSelect.addEventListener("change", () => {
      deleteInputErr(select);
      select.classList.remove("select--error");
    });
  }
})();

(function() {
  const nativeSelect = document.getElementById("select");
  const other = document.getElementById("select-other");
  //show other on last option
  nativeSelect.addEventListener("change", function(e) {
    if (nativeSelect.dataset.placeholder) delete nativeSelect.dataset.placeholder;

    if (this.selectedIndex === this.options.length - 1) {
      other.hidden = false;
      other.required = true;
    } else {
      other.hidden = true;
      other.required = false;
    }
  });
})();

//form validations
//TODO: and sending...

function sendingData(formData) {
  const loader = overlayLoader(document.documentElement.scrollTop);
  loader.show();

  fetch("http://504080.com/api/v1/support", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(response => {
      loader.hide();
      if (response.success) {
        swal({
          type: "success",
          title: "Success",
          text: response.data.message,
          confirmButtonColor: "#87b448"
        });
      } else {
        //TODO: onerror add error to input
        let errorText = response.error.description;
        if (response.error.details) {
          response.error.details.forEach(errItem => {
            errorText = errorText + "<br/>" + errItem.description;
          });
        }

        swal({
          type: "error",
          title: response.error.message,
          html: errorText,
          confirmButtonColor: "#87b448"
        });
      }
    })
    .catch(error => {
      console.error("Error:", error);
      swal({
        type: "error",
        title: "Error",
        text: "Sorry, the server did not respond.",
        confirmButtonColor: "#87b448"
      });
    });
}

document.forms[0].addEventListener("submit", function(e) {
  if (!checkForm()) {
    e.preventDefault();
    return;
  }

  const other = document.getElementById("select-other");
  let formData = new FormData(document.forms[0]);
  if (other.hidden) {
    formData.set("enquiry_type", select.options[select.selectedIndex].innerHTML);
  }

  sendingData(formData);
  e.preventDefault();
});
