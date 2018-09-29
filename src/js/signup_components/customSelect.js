export function customSelect(nativeSelect) {
  //select props
  let isOpen = false;
  let index = -1; // index of current option by default it nothing
  nativeSelect.selectedIndex = -1;
  //select elements
  const selectValue = createSelectValue(nativeSelect);
  const optList = createOptList(nativeSelect.options);
  const options = [...optList.children]; // array of custom select options
  const select = createCustomSelect(optList, selectValue);

  //add select on page
  nativeSelect.insertAdjacentElement("afterend", select);

  //some cached dimensions
  const optHeight = options[0].offsetHeight;
  const optListHeight = optList.offsetHeight;

  //select methods
  select.reset = () => {
    toggleHighlight(index);
    index = nativeSelect.selectedIndex = -1;
    selectValue.innerHTML = "";
    selectValue.classList.add("select-value--placeholder");
  };

  //=================================================
  //=========== Functions for interaction ===========
  //=================================================

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

  function updateValue(e) {
    if (!isOpen || index === -1) return;
    selectValue.innerHTML = options[index].innerHTML;
    nativeSelect.selectedIndex = index;
    nativeSelect.dispatchEvent(new Event("change"));
  }

  function toggleHighlight(prevIndex, index) {
    if (index !== undefined) options[index].classList.toggle("current");
    options[prevIndex].classList.toggle("current");
  }

  function changeOption(e) {
    if (!isOpen) return;

    const key = e.keyCode;
    //if nothing was chosen
    if (index === -1) {
      toggleHighlight(++index);
      return;
    }

    //if mouseover
    if (key === undefined && e.target.dataset.index) {
      const curOptIndex = +e.target.dataset.index;
      toggleHighlight(index, curOptIndex);
      index = curOptIndex;
      return;
    }

    //if arrowDown
    if (key === 40 && index < options.length - 1) {
      toggleHighlight(index, ++index);
    }

    //if arrowUp
    if (key === 38 && index > 0) {
      toggleHighlight(index, --index);
    }

    //if options isn't placed in block to scroll optList
    const optListScroll = optList.scrollTop;
    if (options[index].offsetTop + optHeight > optListScroll + optListHeight) {
      optList.scrollTop += optHeight;
    } else if (options[index].offsetTop < optListScroll) {
      optList.scrollTop -= optHeight;
    }

    e.preventDefault();
  }

  //will work once, after first option selection than will be removed
  function hidePlaceholder(e) {
    if (!isOpen) return;
    if (e.keyCode === 13 || (e.keyCode === 9 && index >= 0)) {
      selectValue.classList.remove("select-value--placeholder");
      select.removeEventListener("keydown", hidePlaceholder);
    } else if (e.type === "click" && e.target.dataset.index && index >= 0) {
      selectValue.classList.remove("select-value--placeholder");
      select.removeEventListener("click", hidePlaceholder);
    }
  }

  //=============================================
  //================= Listeners =================
  //=============================================
  //hide placeholder after selected element
  select.addEventListener("click", hidePlaceholder);
  select.addEventListener("keydown", hidePlaceholder);

  //optList show/hide
  selectValue.addEventListener("click", function(e) {
    if (!isOpen) {
      showOptList();
    } else {
      hideOptList();
    }
    e.preventDefault();
    e.stopPropagation();
  });
  select.addEventListener("keydown", function(e) {
    if (e.keyCode === 40 || e.keyCode === 38) {
      showOptList();
      e.preventDefault();
    }
    if (e.keyCode === 27) {
      hideOptList();
    }
  });

  document.addEventListener("click", hideOptList);
  select.addEventListener("blur", hideOptList);

  //highlight options
  select.addEventListener("mouseover", changeOption);
  select.addEventListener("keydown", changeOption);

  //Update value
  select.addEventListener("click", function(e) {
    if (e.target.dataset.index) {
      updateValue();
      hideOptList();
    }
  });
  select.addEventListener("keydown", function(e) {
    if (e.keyCode === 13 || e.keyCode === 9) {
      updateValue();
      hideOptList();
    }
  });

  return select;
}

//=====================================================
//=========== Functions for select creating ===========
//=====================================================

function createSelectValue(nativeSelect) {
  const selectValue = document.createElement("div");

  selectValue.dataset.placeholder = nativeSelect.dataset.placeholder || nativeSelect.options[0].innerHTML;
  selectValue.className = "select-value select-value--placeholder";

  return selectValue;
}

function createOptList(options) {
  const optList = document.createElement("UL");
  optList.className = "select-optList";
  optList.setAttribute("role", "presentation");

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("LI");
    option.setAttribute("role", "option");
    option.innerHTML = options[i].innerHTML;
    option.classList.add("select-option");
    option.dataset.index = i;

    optList.appendChild(option);
  }

  return optList;
}

function createCustomSelect(optList, selectValue) {
  const select = document.createElement("div");

  select.setAttribute("role", "listbox");
  select.className = "select form__select";
  select.tabIndex = 0;

  select.appendChild(selectValue);
  select.appendChild(optList);

  return select;
}
