const bigPicture = document.querySelector(".big-picture");
const body = document.querySelector("body");
const bigPictureCancel = document.querySelector(".big-picture__cancel");

const socialCommentCount = document.querySelector(".social__comment-count");
const commentsLoader = document.querySelector(".comments-loader");
socialCommentCount.classList.add("hidden");
commentsLoader.classList.add("hidden");

const commentList = document.querySelector(".social__comments");
const socialFooterText = document.querySelector(".social__footer-text");

const onBigPictureCloseClick = () => {
  bigPicture.classList.add("hidden");
  body.classList.remove("modal-open");
  bigPictureCancel.removeEventListener("click", onBigPictureCloseClick);
  commentList.innerHTML = "";
  socialFooterText.value = "";
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

const renderComments = (comments) => {
  let fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(renderComment(comment));
  });
  commentList.appendChild(fragment);
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
