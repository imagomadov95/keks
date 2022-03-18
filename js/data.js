import { getRandomInt, getRandomElementArr } from "./util.js";

const PHOTO_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Coments = {
  MIN: 1,
  MAX: 200,
};

let photos = [];

const DESCRIPTION = [
  "Вдохновение",
  "Шведские горы",
  "Шотландия",
  "Чеченская республика",
];

const MESSAGE = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const NAMES = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон",
];

const addComements = () => {
  const coments = [];
  for (let i = 0; i < getRandomInt(Coments.MIN, Coments.MAX); i++) {
    coments.push({
      id: getRandomInt(Coments.MIN, Likes.MAX),
      avatar: "img/avatar-" + getRandomInt(1, 6) + ".svg",
      message: getRandomElementArr(MESSAGE),
      name: getRandomElementArr(NAMES),
    });
  }
  return coments;
};

const addPhotes = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push({
      id: getRandomInt(Coments.MIN, Coments.MAX),
      url: "photos/" + getRandomInt(Coments.MIN, PHOTO_COUNT) + ".jpg",
      description: getRandomElementArr(DESCRIPTION),
      likes: getRandomInt(Likes.MIN, Likes.MAX),
      comments: addComements(),
    });
  }
};
addPhotes();
export { addPhotes, photos };
