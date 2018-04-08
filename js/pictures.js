'use strict';

var PICTURES_SIZE = 25;
var BIG_PICTURE_INDEX = 0;
var COMMENTS_ARR = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS_ARR = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
  'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var picturesTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');
var picturesList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var commentCount = document.querySelector('.social__comment-count');
var loadMeMore = document.querySelector('.social__comment-loadmore');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generatePicturesData = function (photosNumber) {
  var pictures = [];
  for (var i = 1; i <= photosNumber; i++) {
    pictures.push(
        {
          url: 'photos/' + i + '.jpg',
          likes: getRandomInt(15, 200),
          comments: getRandomInt(0, COMMENTS_ARR.length - 1),
          description: DESCRIPTIONS_ARR[getRandomInt(0, DESCRIPTIONS_ARR.length)]
        }
    );
  }
  return pictures;
};

var renderPictures = function (picture) {
  var pictureElement = picturesTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments;

  return pictureElement;
};

var createPicturesFragment = function (pictures) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPictures(pictures[i]));
  }
  picturesList.appendChild(fragment);
};

var showPhoto = function () {
  bigPicture.classList.remove('hidden');
};

var hideCountAndLoad = function () {
  commentCount.classList.add('visually-hidden');
  loadMeMore.classList.add('visually-hidden');
};

var makeText = function (selector, text) {
  var elements = document.querySelectorAll(selector);
  for (var i = 2; i < elements.length; i++) {
    console.log(elements[i]);
    elements[i].textContent = COMMENTS_ARR[getRandomInt(0, COMMENTS_ARR.length - 1)];
  }
  //return elements;
};

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  if (typeof className === 'object') {
    for (var i = 0; i < className.length; i++) {
      element.classList.add(className[i]);
    }
  }

  return element;
};

var initComments = function (picture) {
  var comment = makeElement('li', ['social__comment', 'social__comment--text']);
  var img = makeElement('img', 'social__picture');
  img.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = '35';
  img.height = '35';
  comment.appendChild(img);
  makeText('.social__comment', COMMENTS_ARR[getRandomInt(0, COMMENTS_ARR.length - 1)]);

  return comment;
};

var initBigPicture = function (picture) {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  var commentsList = document.querySelector('.social__comments');
  for (var i = 0; i < picture.comments; i++) {
    var bigPictureComments = initComments(picture);
    //makeText('.social__comment', COMMENTS_ARR[getRandomInt(0, COMMENTS_ARR.length - 1)]);
    commentsList.appendChild(bigPictureComments);
  }
};

var initPictures = function () {
  var pictures = generatePicturesData(PICTURES_SIZE);
  createPicturesFragment(pictures);
  showPhoto();
  initBigPicture(pictures[BIG_PICTURE_INDEX]);
  hideCountAndLoad();
};

initPictures();

