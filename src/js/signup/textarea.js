// textarea charCount
(function() {
  const tarea = document.querySelector(".form__textarea");
  const twrap = document.querySelector(".form__input-block--tarea");

  tarea.addEventListener("input", function() {
    this.style.height = "152px";
    if (this.offsetHeight !== this.scrollHeight) {
      this.style.height = this.scrollHeight + 2 + "px";
    }
    twrap.dataset.charcount = `(${this.value.length}/1000)`;
  });
})();
