import { deleteInputErr, setInputErr } from "./formCheck";

//img uploader with error handling
(function() {
  const inputFile = document.forms[0].elements["file"];
  const uploadBlock = inputFile.parentNode;

  inputFile.addEventListener("change", function() {
    deleteInputErr(this);
    const f = this.files[0];

    if (!f) return;

    //type file check
    if (!f.type.match(/image\/\w*/)) {
      setInputErr(inputFile, "Image only please");
      return;
    }

    //size file check
    if (f.size > 5 * 1024 * 1024) {
      setInputErr(inputFile, "Image should not exceed 5MB");
      return;
    }
    //dimensions file check
    //create images with file src to check dimensions
    const image = document.createElement("img");
    image.src = window.URL.createObjectURL(f);
    image.style.position = "fixed";
    image.style.visibility = "hidden";
    image.style.pointerEvents = "none";
    document.forms[0].appendChild(image);

    const reader = new FileReader();

    reader.onload = function(e) {
      //if dimensions are exceed 300x300 set error
      if (image.offsetHeight > 300 || image.offsetWidth > 300) {
        setInputErr(inputFile, "Image should not exceed 300x300 pixels");
        document.forms[0].removeChild(image);
        return;
      }
      //show uploaded image
      uploadBlock.classList.add("form__file-wrapper--loaded");
      uploadBlock.style.backgroundImage = `url(${e.target.result})`;
    };

    reader.readAsDataURL(f);
  });
})();
