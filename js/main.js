import { getData } from "./api.js";
import { renderPhotos } from "./preview.js";
import "./editor.js";
import "./validation.js";

getData(renderPhotos);
