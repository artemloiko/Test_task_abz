export function customSelect(nativeSelect) {
  //select props
  let isOpen = false;
  let index = -1; // index of current option
  let options = [];

  const select = document.createElement("div");
  const selectValueElem = document.createElement("div");
  const optList = document.createElement("UL");
  //creating custom select element
  select.className = "select form__select";

  select.tabIndex = 0;
  selectValueElem.dataset.placeholder = nativeSelect.dataset.placeholder;
  selectValueElem.className = "select-value select-value--placeholder";

  nativeSelect.tabIndex = -1;
  nativeSelect.hidden = true;
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

  function showOptList(e) {
    if (isOpen) return;
    isOpen = true;
    select.classList.add("select--active");
    e.preventDefault();
    e.stopPropagation();
  }
  function hideOptList() {
    if (!isOpen) return;
    isOpen = false;
    select.classList.remove("select--active");
  }
  function toggleOptList() {
    isOpen = !isOpen;
    select.classList.toggle("select--active");
  }

  //optHeight is outside for computed one time
  const optHeight = options[0].offsetHeight;
  function changeOption(keyCode, curOption) {
    if (index === -1) {
      if (!keyCode) {
        index = curOption.dataset.index;
        options[index].classList.toggle("current");
        return;
      }
      options[0].classList.toggle("current");
      index++;
      return;
    }
    if (!keyCode) {
      options[index].classList.toggle("current");
      index = curOption.dataset.index;
      options[index].classList.toggle("current");
      return;
    }
    if (keyCode === 40 && index < options.length - 1) {
      options[index].classList.toggle("current");
      index++;
      options[index].classList.toggle("current");
    }
    if (keyCode === 38 && index > 0) {
      options[index].classList.toggle("current");
      index--;
      options[index].classList.toggle("current");
    }
    if (options[index].offsetTop + optHeight > optList.offsetHeight) {
      optList.scrollTop += optHeight;
    } else if (options[index].offsetTop < optList.scrollTop) {
      optList.scrollTop -= optHeight;
    }
  }
  function updateValue() {
    nativeSelect.selectedIndex = index;
    selectValueElem.innerHTML = options[index].innerHTML;
  }

  function hidePlaceholder(e) {
    if (e.keyCode === 13 || (e.keyCode === 7 && index >= 0)) {
      selectValueElem.classList.remove("select-value--placeholder");
      select.removeEventListener("keydown", hidePlaceholder);
    } else if (e.type === "click" && index >= 0) {
      selectValueElem.classList.remove("select-value--placeholder");
      select.removeEventListener("click", hidePlaceholder);
    }
  }
  // Event Listeners mouse
  selectValueElem.addEventListener("click", showOptList);
  select.addEventListener("click", function(e) {
    if (e.target.dataset.index) {
      updateValue();
      hideOptList();
    } else {
      hideOptList();
    }
  });

  select.addEventListener("mouseover", function(e) {
    if (isOpen && e.target.dataset.index) {
      changeOption(0, e.target);
    }
  });

  // Event Listeners keyboard
  select.addEventListener("keydown", function(e) {
    if (!isOpen && (e.keyCode === 40 || e.keyCode === 38)) {
      showOptList(e);
    } else if (isOpen && (e.keyCode === 40 || e.keyCode === 38)) {
      changeOption(e.keyCode);
      e.preventDefault();
    } else if (isOpen && (e.keyCode === 13 || e.keyCode === 9)) {
      updateValue();
      hideOptList();
    } else if (e.keyCode === 27) {
      hideOptList();
    }
  });
  select.addEventListener("keydown", hidePlaceholder);
  select.addEventListener("click", hidePlaceholder);
  document.addEventListener("click", hideOptList);
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
