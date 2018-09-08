export function customSelect(nativeSelect) {
  //select props
  let isOpen = false;
  let index = 0; // index of current option
  const select = document.createElement("div");
  let options = [];

  //creating custom select element
  select.className = "select form__select";

  select.tabIndex = 0;
  const selectValueElem = document.createElement("div");
  selectValueElem.dataset.placeholder = nativeSelect.dataset.placeholder;
  selectValueElem.className = "select-value select-placeholder";

  nativeSelect.tabIndex = -1;
  nativeSelect.hidden = true;
  const optList = document.createElement("UL");
  optList.className = "select-optList";
  for (let i = 0; i < nativeSelect.options.length; i++) {
    const option = document.createElement("LI");
    option.innerHTML = nativeSelect.options[i].innerHTML;
    option.classList.add("select-option");
    option.dataset.index = i;
    optList.appendChild(option);
  }

  select.appendChild(selectValueElem);
  select.appendChild(optList);
  nativeSelect.insertAdjacentElement("afterend", select);

  options = [...optList.children];
  function showOptList() {
    if (isOpen) return;
    isOpen = true;
    select.classList.add("select--active");
  }
  function hideOptList() {
    if (!isOpen) return;
    isOpen = false;
    select.classList.remove("select--active");
  }
  function toggleOptList() {
    select.classList.toggle("select--active");
  }
  function highlightOption() {}
  function updateValue() {}

  // Event Listeners
  select.addEventListener("click", toggleOptList);
  select.addEventListener("keydown", function(event) {
    console.log(event);
    if ((!isOpen && event.keyCode === 40) || event.keyCode === 38) {
      select.classList.add("select--active");
      e.preventDefault();
    } else {
      select.classList.remove("select--active");
    }
  });
  select.addEventListener("keyup", function(event) {
    if (event.keyCode === 40 && index < length - 1) {
      index++;
    }
    if (event.keyCode === 38 && index > 0) {
      index--;
    }
  });

  return {
    select
  };
}

/*
*
* CUSTOM
*/
// custom select
function lol() {
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
    const option = document.createElement("DIV");

    option.innerHTML = select.options[i].innerHTML;
    option.classList.add("select-option");
    option.dataset.index = i;

    divOptions.appendChild(option);
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

  function addOption() {
    //TODO: add option to original select and custom
    //???? delete original select, add options only in custom
  }
}
