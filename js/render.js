'use strict';

(function () {
  var PICTURES_LIST_SIZE = 25;
  var picturesTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture__link');
  var picturesList = document.querySelector('.pictures');

  var renderPictures = function (picture) {
    var pictureElement = picturesTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var render = function (data) {
    var takeNumber = data.length > PICTURES_LIST_SIZE ? PICTURES_LIST_SIZE : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPictures(data[i]));
    }
    picturesList.appendChild(fragment);
  };

  window.render = render;
})();
