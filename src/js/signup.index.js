console.log("Hello from signup.index.js");

(function charCount() {
  const tarea = document.querySelector(".signUp__textarea");
  const twrap = document.querySelector(".signUp__input-block--tarea");
  tarea.addEventListener("input", function() {
    // console.log(twrap.dataset.charcount);
    this.style.height = "152px";
    if (this.offsetHeight !== this.scrollHeight) {
      this.style.height = this.scrollHeight + 2 + "px";
    }
    twrap.dataset.charcount = `(${this.value.length}/1000)`;
  });
})();
