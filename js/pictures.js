'use strict';

var ESC_KEYCODE = 27;
var PICTURES_SIZE = 25;
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
var uploadFile = document.querySelector('#upload-file');
var uploadImgOverlay = document.querySelector('.img-upload__overlay');
var imgUploadPreview = uploadImgOverlay.querySelector('.img-upload__preview');
var closeUploadBtn = uploadImgOverlay.querySelector('.cancel');
var closeBigPicture = bigPicture.querySelector('.cancel');
var effectsItem = document.querySelectorAll('.effects__item');
var imgUploadResizeInput = document.querySelector('.img-upload__resize');
var commentsList = document.querySelector('.social__comments');
var hashtagInput = document.querySelector('.text__hashtags');
var uploadForm = document.querySelector('.img-upload__form');

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

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideBigPicture();
  }
};

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  closeBigPicture.addEventListener('click', hideBigPicture);
  document.addEventListener('keydown', onBigPictureEscPress);
};

var resetComments = function () {
  commentsList.textContent = '';
};

var hideBigPicture = function () {
  bigPicture.classList.add('hidden');
  closeBigPicture.removeEventListener('click', hideBigPicture);
  document.removeEventListener('keydown', onBigPictureEscPress);
  resetComments();
};

var hideCountAndLoad = function () {
  commentCount.classList.add('visually-hidden');
  loadMeMore.classList.add('visually-hidden');
};

var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  if (typeof className === 'object') {
    for (var i = 0; i < className.length; i++) {
      element.classList.add(className[i]);
    }
  } else {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }

  return element;
};

var initComments = function (text) {
  var img = makeElement('img', 'social__picture');
  img.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = '35';
  img.height = '35';

  var comment = makeElement('li', ['social__comment', 'social__comment--text']);
  comment.appendChild(img);
  comment.appendChild(document.createTextNode(text));

  return comment;
};

var initBigPictureData = function (picture) {
  resetComments();
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  for (var i = 0; i < picture.comments; i++) {
    var bigPictureComments = initComments(COMMENTS_ARR[getRandomInt(0, COMMENTS_ARR.length - 1)]);
    commentsList.appendChild(bigPictureComments);
  }
};

var initBigPicture = function (picturesData) {
  var picturesImg = document.querySelectorAll('.picture__img');
  for (var i = 0; i < picturesImg.length; i++) {
    var pictureIndex = i;
    var pictureImg = picturesImg[i];
    pictureOnClick(pictureImg, picturesData, pictureIndex);
  }
};

var pictureOnClick = function (picture, pictures, index) {
  picture.addEventListener('click', function () {
    initBigPictureData(pictures[index]);
    openBigPicture();
  });
};

var initPictures = function () {
  var picturesData = generatePicturesData(PICTURES_SIZE);
  createPicturesFragment(picturesData);
  initBigPicture(picturesData);
  hideCountAndLoad();
};

var onOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagInput) {
    hideUploadForm();
  }
};

var resetEffect = function () {
  imgUploadPreview.style = 'filter: none';
};

var hideUploadForm = function () {
  uploadFile.value = '';
  uploadImgOverlay.classList.add('hidden');
  closeUploadBtn.removeEventListener('click', hideUploadForm);
  document.removeEventListener('keydown', onOverlayEscPress);
  resetEffect();
};

var openUploadForm = function () {
  uploadImgOverlay.classList.remove('hidden');
  closeUploadBtn.addEventListener('click', hideUploadForm);
  document.addEventListener('keydown', onOverlayEscPress);
};

var resetValidationMessage = function () {
  hashtagInput.setCustomValidity('');
};

var findSimilar = function (array) {
  var hashtagsObj = {};
  for (var i = 0; i < array.length; i++) {
    var hashtag = array[i];
    if (hashtag.length > 20) {
      hashtagInput.setCustomValidity('Слишком много символов в хэштэге!');
      return false;
    }
    if (hashtagsObj[hashtag]) {
      hashtagInput.setCustomValidity('Этот хэхштэг ты уже использовал!');
      return false;
    }
    hashtagsObj[hashtag] = true;
  }
  if (Object.keys(hashtagsObj).length <= 5) {
    return Object.keys(hashtagsObj);
  } else {
    hashtagInput.setCustomValidity('Многовато хэштэгов!');
    return false;
  }
};

hashtagInput.addEventListener('input', resetValidationMessage);

var checkHashtagInput = function (value) {
  if (value === '') {
    return true;
  }
  var hashtags = value.split(' ');
  var result = [];
  hashtags.forEach(function (hashtag) {
    if (!/^#{1}\w+/.test(hashtag)) {
      return;
    }
    result.push(hashtag.toLowerCase());
  });
  return findSimilar(result);
};

var onSubmitCheck = function (evt) {
  if (!checkHashtagInput(hashtagInput.value)) {
    evt.preventDefault();
  }
  // Первый раз не срабатывает почему то
};

uploadForm.addEventListener('submit', onSubmitCheck);

uploadFile.addEventListener('change', function () {
  openUploadForm();
});

var createEffect = function () {
  imgUploadResizeInput.style = 'z-index: 1';
  for (var i = 0; i < effectsItem.length; i++) {
    effectsItem[i].addEventListener('click', function (evt) {
      switch (evt.target.id) {
        case 'effect-none':
          resetEffect();
          break;
        case 'effect-chrome':
          imgUploadPreview.style = 'filter: grayscale(1)';
          break;
        case 'effect-sepia':
          imgUploadPreview.style = 'filter: sepia(1)';
          break;
        case 'effect-marvin':
          imgUploadPreview.style = 'filter: invert(100%)';
          break;
        case 'effect-phobos':
          imgUploadPreview.style = 'filter: blur(3px)';
          break;
        case 'effect-heat':
          imgUploadPreview.style = 'filter: brightness(3)';
          break;
      }
    });
  }
};

createEffect();
initPictures();

