const Urls = {
  GET: "https://22.javascript.pages.academy/kekstagram/data",
  POST: "https://22.javascript.pages.academy/kekstagram",
};

const DEFAULT_PREVIEW_LOAD = 25;
const RANDOM_PREVIEW_LOAD = 10;

let picturesList = document.querySelector(".pictures");

const filterDiscussed = document.querySelector("#filter-discussed");
const filterDefault = document.querySelector("#filter-default");

const request = (onSuccess, onError, method, data) => {
  fetch(Urls[method], {
    method: method,
    body: data,
  })
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response);
    })
    .catch(() => {
      onError();
    });
};
export { request };
