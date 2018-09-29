// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

function preventDefault(e) {
  e.preventDefault();
  return false;
}

function preventDefaultForScrollKeys(e) {
  if (e.keyCode === 32 || e.keyCode === 13) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    return false;
  }
  if (~keys.indexOf(e.keyCode)) {
    e.preventDefault();
    return false;
  }
}

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false);
  window.onwheel = preventDefault;
  window.ontouchmove = preventDefault;
  document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

const overlayLoader = function(loader) {
  function showLoader() {
    loader.style.visibility = "visible";
    disableScroll();
  }

  function hideLoader() {
    loader.style.visibility = "hidden";
    enableScroll();
  }

  return {
    show: showLoader,
    hide: hideLoader
  };
};
export { overlayLoader };
