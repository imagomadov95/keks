import { addPhotes, photos } from "./data.js";
import { show } from "./rendering.js";

let picturesList = document.querySelector(".pictures");
let templatePicture = document
  .querySelector("#picture")
  .content.querySelector(".picture");

const renderPhoto = (picture) => {
  let task = templatePicture.cloneNode(true);
  task.querySelector(".picture__img").src = picture.url;
  task.querySelector(".picture__likes").textContent = picture.likes;
  task.querySelector(".picture__comments").textContent =
    picture.comments.length;

  task.addEventListener("click", (evt) => {
    evt.preventDefault();

    show(picture);
  });
  return task;
};

const renderPhotos = () => {
  let fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });
  picturesList.appendChild(fragment);
};

export { renderPhotos };
