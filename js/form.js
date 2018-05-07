'use strict';

(function () {
  var ESC_KEYCODE = 27;
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
  var uploadFile = document.querySelector('#upload-file');
  var uploadImgOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = uploadImgOverlay.querySelector('.img-upload__preview');
  var imgUpload = uploadImgOverlay.querySelector('.img-upload__preview img');
  var closeUploadBtn = uploadImgOverlay.querySelector('.cancel');
  var effectsItem = document.querySelectorAll('.effects__item');
  var imgUploadResizeInput = document.querySelector('.img-upload__resize');
  var resizeValue = imgUploadResizeInput.querySelector('.resize__control--value');
  var resizeButtons = imgUploadResizeInput.querySelectorAll('.resize__control');
  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionText = document.querySelector('.text__description');
  var uploadForm = document.querySelector('.img-upload__form');
  var scaleBox = uploadImgOverlay.querySelector('.scale__line');
  var scalePin = uploadImgOverlay.querySelector('.scale__pin');
  var scaleLev = uploadImgOverlay.querySelector('.scale__level');
  var effectLevel = uploadImgOverlay.querySelector('[name="effect-level"]');
  var scaleSlider = uploadImgOverlay.querySelector('.img-upload__scale');

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

  var hideFormOnSuccess = function () {
    uploadForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      if (checkHashTagsValidity(hashtagInput.value)) {
        window.backend.save(new FormData(uploadForm), function () {
          hideUploadForm();
        }, function () {
          document.querySelector('.img-upload__message--error').classList.remove('hidden');
        });
      }
    });
  };

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

  var onOverlayEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagInput) {
      hideUploadForm();
    }
  };

  var resetEffect = function () {
    imgUploadPreview.style = 'filter: none';
    scaleSlider.setAttribute('style', 'display: none');
    imgUpload.setAttribute('style', 'transform: scale(1)');
    resizeValue.value = RESIZE_MAX;
    hashtagInput.value = '';
    descriptionText.value = '';
  };

  createEffect();
  hideFormOnSuccess();
})();
