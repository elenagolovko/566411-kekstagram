'use strict';

var ESC_KEYCODE = 27;
var PICTURES_SIZE = 25;
var MAX_HASHTAGS_NUMBER = 5;
var MAX_HASHTAGS_LENGTH = 20;
var RESIZE_MAX = '100%';
var RESIZE_HALF = '50%';
var RESIZE_THREE_QUATERS = '75%';
var RESIZE_MIN = '25%';
var MAX_EFFECT_VALUE = 100;
var PERCENT = 100;
var THIRD_PART = 33.33;
var HALF = 50;
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
var imgUpload = uploadImgOverlay.querySelector('.img-upload__preview img');
var closeUploadBtn = uploadImgOverlay.querySelector('.cancel');
var closeBigPicture = bigPicture.querySelector('.cancel');
var effectsItem = document.querySelectorAll('.effects__item');
var imgUploadResizeInput = document.querySelector('.img-upload__resize');
var resizeValue = imgUploadResizeInput.querySelector('.resize__control--value');
var resizeButtons = imgUploadResizeInput.querySelectorAll('.resize__control');
var commentsList = document.querySelector('.social__comments');
var hashtagInput = document.querySelector('.text__hashtags');
var uploadForm = document.querySelector('.img-upload__form');
var scaleBox = uploadImgOverlay.querySelector('.scale__line');
var scalePin = uploadImgOverlay.querySelector('.scale__pin');
var scaleLev = uploadImgOverlay.querySelector('.scale__level');
var effectLevel = uploadImgOverlay.querySelector('[name="effect-level"]');
var scaleSlider = uploadImgOverlay.querySelector('.img-upload__scale');

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

var changeSize = function (evt) {
  var change = 'max';
  if (evt.target.classList.contains('resize__control--minus')) {
    change = 'min';
  }
  switch (resizeValue.value) {
    case RESIZE_MAX:
      if (change === 'min') {
        resizeValue.value = RESIZE_THREE_QUATERS;
        imgUpload.setAttribute('style', 'transform: scale(0.75)');
      }
      break;
    case RESIZE_THREE_QUATERS:
      if (change === 'min') {
        resizeValue.value = RESIZE_HALF;
        imgUpload.setAttribute('style', 'transform: scale(0.5)');
        break;
      }
      resizeValue.value = RESIZE_MAX;
      imgUpload.setAttribute('style', 'transform: scale(1)');
      break;
    case RESIZE_HALF:
      if (change === 'min') {
        resizeValue.value = RESIZE_MIN;
        imgUpload.setAttribute('style', 'transform: scale(0.25)');
        break;
      }
      resizeValue.value = RESIZE_THREE_QUATERS;
      imgUpload.setAttribute('style', 'transform: scale(0.75)');
      break;
    case RESIZE_MIN:
      if (change === 'max') {
        resizeValue.value = RESIZE_HALF;
        imgUpload.setAttribute('style', 'transform: scale(0.5)');
      }
      break;
  }
  resizeValue.setAttribute('value', resizeValue.value);
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
  scaleSlider.setAttribute('style', 'display: none');
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
  resizeValue.setAttribute('value', RESIZE_MAX);
  resetEffect();
};

var setScaleEffect = function () {
  var currentEffect = document.querySelector('.effects__radio:checked');

  switch (currentEffect.id) {
    case 'effect-none':
      resetEffect();
      break;
    case 'effect-chrome':
      imgUploadPreview.setAttribute('style', 'filter: grayscale(' + effectLevel.value / PERCENT + ')');
      break;
    case 'effect-sepia':
      imgUploadPreview.setAttribute('style', 'filter: sepia(' + effectLevel.value / PERCENT + ')');
      break;
    case 'effect-marvin':
      imgUploadPreview.setAttribute('style', 'filter: invert(' + effectLevel.value + '%' + ')');
      break;
    case 'effect-phobos':
      imgUploadPreview.setAttribute('style', 'filter: blur(' + effectLevel.value / THIRD_PART + 'px' + ')');
      break;
    case 'effect-heat':
      imgUploadPreview.setAttribute('style', 'filter: brightness(' + (effectLevel.value / HALF + 1) + ')');
      break;
  }
};

var changeValueBar = function (param) {
  scalePin.style.left = param + 'px';
  scaleLev.style.width = param + 'px';
};

scalePin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoord = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoord.x - moveEvt.clientX,
    };

    startCoord.x = moveEvt.clientX;

    var newCoord = scalePin.offsetLeft - shift.x;
    if (newCoord > scaleBox.offsetWidth || newCoord < 0) {
      return;
    }
    changeValueBar(newCoord);
    effectLevel.value = (scaleLev.offsetWidth / scaleBox.offsetWidth) * PERCENT;
    effectLevel.setAttribute('value', effectLevel.value);
    setScaleEffect();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var resetValidationMessage = function () {
  hashtagInput.setCustomValidity('');
};

var validateHashtags = function (array) {
  if (array.length > MAX_HASHTAGS_NUMBER) {
    hashtagInput.setCustomValidity('Многовато хэштэгов!');
    return false;
  }

  var hashtagsObj = {};

  for (var i = 0; i < array.length; i++) {
    var hashtag = array[i];

    if (hashtag.length > MAX_HASHTAGS_LENGTH) {
      hashtagInput.setCustomValidity('Слишком много символов в хэштэге!');
      return false;
    }

    if (hashtagsObj[hashtag]) {
      hashtagInput.setCustomValidity('Этот хэштэг уже использован!');
      return false;
    }
    hashtagsObj[hashtag] = true;
  }
  return true;
};

hashtagInput.addEventListener('input', resetValidationMessage);

var checkHashTagsValidity = function (value) {
  if (!value) {
    return true;
  }
  var hashtags = value.split(' ');
  var result = [];
  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];
    if (/^#{1}/.test(hashtag) && hashtag.length > 1) {
      result.push(hashtag.toLowerCase());
    } else {
      hashtagInput.setCustomValidity('Не валидный хэштэг!');
      return false;
    }
  }
  return validateHashtags(result);
};

var onSubmitCheck = function (evt) {
  if (!checkHashTagsValidity(hashtagInput.value)) {
    evt.preventDefault();
  }
};

uploadForm.addEventListener('submit', onSubmitCheck);

uploadFile.addEventListener('change', openUploadForm);

var createEffect = function () {
  imgUploadResizeInput.style = 'z-index: 1';
  for (var i = 0; i < effectsItem.length; i++) {
    effectsItem[i].addEventListener('click', function () {
      scaleSlider.removeAttribute('style', 'display: none');
      effectLevel.value = MAX_EFFECT_VALUE;
      effectLevel.setAttribute('value', effectLevel.value);
      resizeValue.value = RESIZE_MAX;
      resizeValue.setAttribute('value', RESIZE_MAX);
      imgUpload.setAttribute('style', 'transform: scale(1)');
      changeValueBar(scaleBox.offsetWidth);
    });
    effectsItem[i].addEventListener('click', setScaleEffect);
  }
  for (var j = 0; j < resizeButtons.length; j++) {
    var resizeButton = resizeButtons[j];
    resizeButton.addEventListener('click', changeSize);
  }
};

createEffect();
initPictures();

