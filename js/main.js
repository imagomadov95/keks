import { addPhotes, photos } from "./data.js";
import { renderPhotos } from "./preview.js";
import { body } from "./rendering.js";

renderPhotos();

const uploadFile = document.querySelector("#upload-file");

const uploadOverlay = document.querySelector(".img-upload__overlay");
const imgUploadCancel = document.querySelector(".img-upload__cancel");

const scaleControlSmaller = document.querySelector(".scale__control--smaller");
const scaleControlBigger = document.querySelector(".scale__control--bigger");
const scaleControlValue = document.querySelector(".scale__control--value");
const imgUploadPreview = document.querySelector(".img-upload__preview > img");
const effectLevelSlider = document.querySelector(".effect-level__slider");
const effectLevelValue = document.querySelector(".effect-level__value");
const effectsItems = document.querySelectorAll(".effects__item > input");

uploadFile.addEventListener("click", () => {
  uploadOverlay.classList.remove("hidden");
  body.classList.remove("modal-open");
  const file = uploadFile.file;
  console.log(file);
});

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

imgUploadCancel.addEventListener("click", () => {
  uploadOverlay.classList.add("hidden");
  body.classList.add("modal-open");
});

scaleControlSmaller.addEventListener("click", () => {
  if (parseInt(scaleControlValue.value) === 25) {
    scaleControlValue.value = 25 + "%";
  } else {
    scaleControlValue.value = parseInt(scaleControlValue.value) - 25 + "%";
  }
  scaleImg();
});

scaleControlBigger.addEventListener("click", () => {
  if (parseInt(scaleControlValue.value) === 100) {
    scaleControlValue.value = parseInt(scaleControlValue.value) + "%";
  } else {
    scaleControlValue.value = parseInt(scaleControlValue.value) + 25 + "%";
  }
  scaleImg();
});

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: "lower",
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const sliderValue = (mi, ma, st, fo) => {
  let valueSlider;
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: mi,
      max: ma,
    },
    start: 8,
    step: st,
    connect: "lower",
  });

  effectLevelSlider.noUiSlider.on("update", (values, handle) => {
    effectLevelValue.value = values[handle];
    valueSlider = effectLevelValue.value;
    valueSlider += fo;
  });
  return valueSlider;
};

const effectChanges = () => {
  if (effectsItems[1].checked) {
    imgUploadPreview.className = "effects__preview--chrome";
    imgUploadPreview.style.filter = `grayscale(${sliderValue(
      0.1,
      1,
      0.1,
      "%"
    )})`;
    console.log(sliderValue(0.1, 1, 0.1, "%"));
    console.log(imgUploadPreview.style.filter);
  } else if (effectsItems[0].checked) {
    imgUploadPreview.className = "";
  } else if (effectsItems[2].checked) {
    imgUploadPreview.className = "effects__preview--sepia";
  } else if (effectsItems[3].checked) {
    imgUploadPreview.className = "effects__preview--marvin";

    /* imgUploadPreview.style.filter = "invert(10%)"; */
  } else if (effectsItems[4].checked) {
    imgUploadPreview.className = "effects__preview--phobos";
  } else if (effectsItems[5].checked) {
    imgUploadPreview.className = "effects__preview--heat";
  }
};

for (let item of effectsItems) {
  item.addEventListener("click", () => {
    effectChanges();
  });
}
imgUploadPreview.style.filter = `grayscale(${sliderValue(0.1, 1, 0.1)})`;
