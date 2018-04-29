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
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255, 231, 82, 0.2); color: #ffe753;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length - 1; i++) {
      fragment.appendChild(renderPictures(pictures[i]));
    }
    picturesList.appendChild(fragment);

    window.initBigPicture(pictures);
  };

  window.backend.load(successHandler, errorHandler);
})();
