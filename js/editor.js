import { body } from "./rendering.js";
import { request } from "./api.js";
import { showError, showSuccess } from "./alerts.js";
import { effectLevel, lastClass } from "./effects.js";
const Keys = {
  ESC: "Esc",
  ESCAPE: "Escape",
};

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

const uploadFile = document.querySelector("#upload-file");
const uploadOverlay = document.querySelector(".img-upload__overlay");
const imgUploadCancel = document.querySelector(".img-upload__cancel");
let inputHashtag = document.querySelector(".text__hashtags");
const textDescription = document.querySelector("text__description");

const scaleImg = () => {
  if (parseInt(scaleControlValue.value) === 100) {
    imgUploadPreview.style.transform = "scale(1)";
  } else if (parseInt(scaleControlValue.value) === 75) {
    imgUploadPreview.style.transform = "scale(0.75)";
  } else if (parseInt(scaleControlValue.value) === 50) {
    imgUploadPreview.style.transform = "scale(0.50)";
  } else if (parseInt(scaleControlValue.value) === 25) {
    imgUploadPreview.style.transform = "scale(0.25)";
  }
};

uploadFile.addEventListener("click", () => {
  resetSettings();
  uploadOverlay.classList.remove("hidden");
  body.classList.add("modal-open");
});

const closeModal = () => {
  uploadOverlay.classList.add("hidden");
  body.classList.remove("modal-open");
  uploadFile.value = "";
  inputHashtag.value = "";
};

imgUploadCancel.addEventListener("click", () => {
  closeModal();
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === ("Escape" || "Esc")) {
    closeModal();
  }
});

const buttonPlus = uploadOverlay.querySelector(".scale__control--bigger");
const buttonMinus = uploadOverlay.querySelector(".scale__control--smaller");
const scaleValue = uploadOverlay.querySelector(".scale__control--value");
const imagePreview = uploadOverlay.querySelector(".img-upload__preview > img");

const resetSettings = () => {
  imagePreview.style = "transform: scale(1.00)";
  imagePreview.style.filter = "";
  if (lastClass) {
    imagePreview.classList.remove(lastClass);
  }

  scaleValue.value = "100%";
  effectLevel.classList.add("visually-hidden");
};

buttonPlus.addEventListener("click", () => {
  let scale = parseInt(scaleValue.value, 10) + Scale.STEP;

  if (scale >= Scale.MAX) {
    scale = Scale.MAX;
  }

  scaleValue.value = scale + "%";
  scale = scale / 100;
  imagePreview.style.transform = "scale(" + scale + ")";
});

buttonMinus.addEventListener("click", () => {
  let scale = parseInt(scaleValue.value, 10) - Scale.STEP;

  if (scale <= Scale.MIN) {
    scale = Scale.MIN;
  }

  scaleValue.value = scale + "%";
  scale = scale / 100;
  imagePreview.style.transform = "scale(" + scale + ")";
});
// Отправляем фотку
const uploadForm = document.querySelector(".img-upload__form");

const onSuccess = () => {
  showSuccess("Ура!");
  closeModal();
  uploadForm.reset();
};

const onError = () => {
  showError("ЧТо-то пошло не так", "Загрузить другой файл");
};

uploadForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  request(onSuccess, onError, "POST", new FormData(evt.target));
});
