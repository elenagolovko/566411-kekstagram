'use strict';

(function () {
  var picturesTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture__link');
  var picturesList = document.querySelector('.pictures');

  var renderPictures = function (picture) {
    var pictureElement = picturesTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments;

    return pictureElement;
  };

  window.createPicturesFragment = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPictures(pictures[i]));
    }
    picturesList.appendChild(fragment);
  };
})();
