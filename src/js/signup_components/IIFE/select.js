import { customSelect } from "../customSelect";
import { deleteInputErr, setInputErr } from "../formCheck";

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
      delete nativeSelect.dataset.placeholder;
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
    //on select choose option delete error
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
