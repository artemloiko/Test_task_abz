const overlayLoader = function(curScroll) {
  const loaderElem = document.querySelector(".loader");
  // const curScroll = document.documentElement.scrollTop;

  function blockScroll() {
    scrollTo(0, curScroll);
  }

  function showLoader() {
    loaderElem.style.visibility = "visible";
    document.addEventListener("scroll", blockScroll);
  }

  function hideLoader() {
    loaderElem.style.visibility = "hidden";
    document.removeEventListener("scroll", blockScroll);
  }

  return {
    show: showLoader,
    hide: hideLoader
  };
};
export { overlayLoader };
