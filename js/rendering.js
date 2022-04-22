const bigPicture = document.querySelector(".big-picture");
const body = document.querySelector("body");
const bigPictureCancel = document.querySelector(".big-picture__cancel");

const socialCommentCount = document.querySelector(".social__comment-count");
const commentsLoader = document.querySelector(".comments-loader");
socialCommentCount.classList.add("hidden");
/* commentsLoader.classList.add("hidden"); */

const commentList = document.querySelector(".social__comments");
const socialFooterText = document.querySelector(".social__footer-text");

const onBigPictureCloseClick = () => {
  bigPicture.classList.add("hidden");
  body.classList.remove("modal-open");
  bigPictureCancel.removeEventListener("click", onBigPictureCloseClick);
  commentList.innerHTML = "";
  socialFooterText.value = "";
  commentsLoader.classList.remove("hidden");
};

const commentsTemplate = document
  .querySelector("#comment")
  .content.querySelector(".social__comment");

const renderComment = (comment) => {
  const task = commentsTemplate.cloneNode(true);
  task.querySelector(".social__picture").src = comment.avatar;
  task.querySelector(".social__picture").alt = comment.name;
  task.querySelector(".social__text").textContent = comment.message;
  return task;
};

const removePhotos = () => {
  const images = document.querySelectorAll(".social__comment");
  if (images) {
    images.forEach((element) => {
      element.remove();
    });
  }
};

const verf = (comments, number, fragment) => {
  comments.slice(0, number).forEach((comment) => {
    fragment.appendChild(renderComment(comment));
  });
  commentList.appendChild(fragment);
};

const i = 4;
const numberComents = (h) => {
  let f = h + 5;
  return f;
};

const renderComments = (comments) => {
  let fragment = document.createDocumentFragment();

  verf(comments, i, fragment);

  commentsLoader.addEventListener("click", () => {
    removePhotos();
    verf(comments, numberComents(10), fragment);
    if (comments.length) {
      commentsLoader.classList.add("hidden");
    }
  });
};

const show = (picture) => {
  body.classList.add(".modal-open");
  bigPicture.querySelector(".big-picture__img > img").src = picture.url;
  bigPicture.querySelector(".likes-count").textContent = picture.likes;
  bigPicture.querySelector(".comments-count").textContent =
    picture.comments.length;
  bigPicture.querySelector(".social__caption").textContent =
    picture.description;

  bigPictureCancel.addEventListener("click", onBigPictureCloseClick);
  bigPicture.classList.remove("hidden");
  renderComments(picture.comments);
};

document.addEventListener("keydown", (evt) => {
  if (evt.key === ("Escape" || "Esc")) {
    onBigPictureCloseClick();
  }
});

export { show, body };
