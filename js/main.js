import { renderPhotos } from "./preview.js";
import { request } from "./api.js";
import "./editor.js";
import "./validation.js";

const onError = () => {
  showError("Ошибка загрузки, попробуйте еще раз", "Закрыть");
};

request(renderPhotos, onError, "GET");
