import style from "../scss/signup.index.scss";
import swal from "sweetalert2";
import { overlayLoader } from "./signup_components/overlayLoader";
import { deleteInputErr, setInputErr, checkForm } from "./signup_components/formCheck";
import "./signup_components/IIFE/uploader";
import "./signup_components/IIFE/textarea";
import "./signup_components/IIFE/select";
//Sending data via POST
function sendingData(formData) {
  const loader = overlayLoader(document.querySelector(".loader"));
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
            setInputErr(document.forms[0].elements[errItem.field], errItem.description);
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
      loader.hide();
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
