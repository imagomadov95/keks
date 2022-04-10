import { showAlert } from "./util.js";
const imgUploadForm = document.querySelector(".img-upload__form");

const getData = (onSuccess) => {
  fetch("https://23.javascript.pages.academy/kekstagram/data")
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
      console.log(photos.ok);
      /* if (response.ok) {
        onSuccess(photos);
      } else {
        showAlert("Не удалось загрузить изоброжение");
      }

      .catch(() => {
        showAlert("Не удалось загрузить изоброжение");
      }); */
    });
};

export { getData };
