'use strict';

(function () {
  var commentCount = document.querySelector('.social__comment-count');
  var loadMeMore = document.querySelector('.social__comment-loadmore');

  var hideCountAndLoad = function () {
    commentCount.classList.add('visually-hidden');
    loadMeMore.classList.add('visually-hidden');
  };

  var pictureOnClick = function (picture, pictures, index) {
    picture.addEventListener('click', function () {
      window.preview.initBigPictureData(pictures[index]);
      window.preview.openBigPicture();
    });
  };

  var initBigPicture = function (picturesData) {
    var picturesImg = document.querySelectorAll('.picture__img');
    for (var i = 0; i < picturesImg.length; i++) {
      var pictureIndex = i;
      var pictureImg = picturesImg[i];
      pictureOnClick(pictureImg, picturesData, pictureIndex);
    }
  };

  hideCountAndLoad();

  window.initBigPicture = initBigPicture;
})();
