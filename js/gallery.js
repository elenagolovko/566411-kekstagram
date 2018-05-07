'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var pictureOnClick = function (picture, pictures, index) {
    picture.addEventListener('click', function () {
      window.preview.initBigPictureData(pictures[index]);
      window.preview.openBigPicture();
    });
  };

  var pictureOnEnterPress = function (pictures) {
    var showRightPicture = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE && evt.target.classList.value === 'picture__link') {
        var pictureSrc = evt.target.children[0].src;
        var pictureIndex = pictureSrc.match(/photos\/\d+/)[0].split('/')[1];
        window.preview.initBigPictureData(pictures[pictureIndex - 1]);
        window.preview.openBigPicture();
      }
    };

    document.addEventListener('keydown', showRightPicture);
  };

  var initBigPicture = function (picturesData) {
    var picturesImg = document.querySelectorAll('.picture__img');
    for (var i = 0; i < picturesImg.length; i++) {
      var pictureIndex = i;
      var pictureImg = picturesImg[i];
      pictureOnClick(pictureImg, picturesData, pictureIndex);
    }
  };

  window.gallery = {
    initBigPicture: initBigPicture,
    pictureOnEnterPress: pictureOnEnterPress
  };
})();
