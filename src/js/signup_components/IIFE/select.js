import { customSelect } from "../customSelect";
import { deleteInputErr, setInputErr } from "../formCheck";

(function() {
  //==========================================================
  //=========== Filling and creating custom select ===========
  //==========================================================
  fetch("http://504080.com/api/v1/directories/enquiry-types")
    .then(response => response.json())
    .then(parsedRes => fillSelect(parsedRes.data))
    .then(nativeSelect => createCustomSelect(nativeSelect))
    .catch(error => {
      showDefaultInput();
    });

  //fill default select
  const fillSelect = function(data) {
    const nativeSelect = document.getElementById("select");

    data.forEach((item, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.innerHTML = item.name;
      nativeSelect.appendChild(option);
    });

    addExtraFieldInteraction(nativeSelect);
    return Promise.resolve(nativeSelect);
  };

  function createCustomSelect(nativeSelect) {
    const select = customSelect(nativeSelect);
    addErrorsInteraction(nativeSelect, select);
  }
})();

function showDefaultInput() {
  const other = document.getElementById("select-other");
  other.hidden = false;
  other.required = true;
  other.placeholder = "Enquiry type";
  other.classList.remove("form__other");
}

function addErrorsInteraction(nativeSelect, select) {
  // custom select check
  select.addEventListener("blur", function() {
    deleteInputErr(this);
    select.classList.remove("select--error");
    if (!select.firstElementChild.innerHTML) {
      setInputErr(this, "This field is required");
      select.classList.add("select--error");
    }
  });
  //on select choose option delete error
  nativeSelect.addEventListener("change", () => {
    deleteInputErr(select);
    select.classList.remove("select--error");
  });
}

function addExtraFieldInteraction(nativeSelect) {
  const other = document.getElementById("select-other");
  //show other if last option
  nativeSelect.addEventListener("change", function(e) {
    if (this.selectedIndex === this.options.length - 1) {
      other.hidden = false;
      other.required = true;
    } else {
      other.hidden = true;
      other.required = false;
    }
  });
}
