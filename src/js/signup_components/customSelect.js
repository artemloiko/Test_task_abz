export function customSelect(nativeSelect) {
  //select props
  let isOpen = false;
  let index = -1; // index of current option

  //select elements
  const select = document.createElement("div");
  const selectValue = document.createElement("div");
  const optList = document.createElement("UL");
  let options = []; // array of custom select options

  //return options
  function createCustomSelect() {
    //creating custom select element
    //hide native
    nativeSelect.tabIndex = -1;
    nativeSelect.hidden = true;
    //select wrapper
    select.className = "select form__select";
    select.tabIndex = 0;
    select.setAttribute("role", "listbox");
    //block with selected element
    selectValue.dataset.placeholder = nativeSelect.dataset.placeholder;
    selectValue.className = "select-value select-value--placeholder";

    optList.className = "select-optList";
    optList.setAttribute("role", "presentation");

    //creating options and fiiling optList
    for (let i = 0; i < nativeSelect.options.length; i++) {
      const option = document.createElement("LI");
      option.classList.add("select-option");
      option.dataset.index = i;
      option.setAttribute("role", "option");
      option.innerHTML = nativeSelect.options[i].innerHTML;

      options.push(option);
      optList.appendChild(option);
    }

    //Added custom select in DOM
    select.appendChild(selectValue);
    select.appendChild(optList);
    nativeSelect.insertAdjacentElement("afterend", select);
  }

  createCustomSelect();

  function showOptList(e) {
    if (isOpen) return;
    isOpen = true;
    select.classList.add("select--active");
    //to prevent immediate closing
    e.preventDefault();
    e.stopPropagation();
  }

  function hideOptList() {
    if (!isOpen) return;
    isOpen = false;
    select.classList.remove("select--active");
  }

  function changeOption(keyCode, curOption) {
    const toggleHighlight = index => options[index].classList.toggle("current");

    if (index === -1) {
      if (!keyCode) {
        index = curOption.dataset.index;
        toggleHighlight(index);
        return;
      }
      toggleHighlight(0);
      index++;
      return;
    }

    //if mouseover
    if (!keyCode) {
      toggleHighlight(index);
      index = curOption.dataset.index;
      toggleHighlight(index);
      return;
    }

    //if arrowDown
    if (keyCode === 40 && index < options.length - 1) {
      toggleHighlight(index);
      index++;
      toggleHighlight(index);
    }

    //if arrowUp
    if (keyCode === 38 && index > 0) {
      toggleHighlight(index);
      index--;
      toggleHighlight(index);
    }

    //if options isn't placed in block to scroll
    const optHeight = options[0].offsetHeight;

    // console.log("kek");
    // console.log("offsetHeight + scrollTop optList", optList.offsetHeight + optList.scrollTop);
    console.log("optList.scrollTop + optHeight", optList.scrollTop);
    console.log("options[index].offsetTop", options[index].offsetTop);

    if (options[index].offsetTop + optHeight > optList.scrollTop + optList.offsetHeight) {
      optList.scrollTop += optHeight;
    } else if (options[index].offsetTop < optList.scrollTop) {
      optList.scrollTop -= optHeight;
    }
  }

  //update selectValue and native select
  function updateValue() {
    selectValue.innerHTML = options[index].innerHTML;
    nativeSelect.selectedIndex = index;
    nativeSelect.dispatchEvent(new Event("change"));
  }

  //will work once, after first option selection than will be removed
  function hidePlaceholder(e) {
    if (e.keyCode === 13 || (e.keyCode === 7 && index >= 0)) {
      selectValue.classList.remove("select-value--placeholder");
      select.removeEventListener("keydown", hidePlaceholder);
    } else if (e.type === "click" && e.target.dataset.index && index >= 0) {
      selectValue.classList.remove("select-value--placeholder");
      select.removeEventListener("click", hidePlaceholder);
    }
  }
  // Event Listeners mouse
  selectValue.addEventListener("click", showOptList);

  select.addEventListener("click", function(e) {
    if (e.target.dataset.index) {
      updateValue();
      hideOptList();
    } else {
      hideOptList();
    }
  });

  document.addEventListener("click", hideOptList);

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
  //hide placeholder after selected element
  select.addEventListener("keydown", hidePlaceholder);
  select.addEventListener("click", hidePlaceholder);

  return select;
}
