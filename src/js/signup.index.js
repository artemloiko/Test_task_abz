console.log("Hello from signup.index.js");

(function charCount() {
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

document.forms[0].addEventListener("submit", function(e) {
  console.log(e);
  e.preventDefault();
});
// custom select
(function() {
  const customSelect = document.querySelector(".custom-select");
  const select = customSelect.querySelector("select");

  // create a new DIV that will act as the selected item:
  const divSelected = document.createElement("DIV");

  divSelected.classList.add("select-selected", "select-placeholder");
  divSelected.setAttribute(
    "data-placeholder",
    customSelect.dataset.placeholder
  );

  customSelect.appendChild(divSelected);

  //create a new DIV that will contain the option list
  const divOptions = document.createElement("DIV");
  divOptions.classList.add("select-options", "select-hide");
  /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
  for (let i = 0; i < select.options.length; i++) {
    const divOption = document.createElement("DIV");

    divOption.innerHTML = select.options[i].innerHTML;
    divOption.classList.add("select-option");
    divOption.dataset.index = i;

    divOptions.appendChild(divOption);
  }
  customSelect.appendChild(divOptions);

  //   Event handlers
  //show select-options
  divSelected.addEventListener("click", function(e) {
    this.classList.toggle("select-selected--active");
    divOptions.classList.toggle("select-options--active");
    e.preventDefault();
    e.stopPropagation();
  });
  /*when an optiond(div) is clicked, update the original select box,
        and the selected item:*/
  divOptions.addEventListener("click", function(e) {
    divSelected.classList.remove("select-placeholder");
    divSelected.innerHTML = e.target.innerHTML;
    divSelected.classList.remove("select-selected--active");

    this.classList.remove("select-options--active");

    select.selectedIndex = e.target.dataset.index;

    const selectOther = document.getElementById("select-other");
    if (select.selectedIndex === select.options.length - 1) {
      selectOther.hidden = false;
    } else {
      selectOther.hidden = true;
    }
  });
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.body.addEventListener("click", function(e) {
    if (divSelected.classList.contains("select-selected--active")) {
      divSelected.classList.remove("select-selected--active");
      divOptions.classList.remove("select-options--active");
    }
  });
})();
