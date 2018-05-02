'use strict';

(function () {
  var pictures = [];
  var firstVersionPictures;
  var imageFilters = document.querySelector('.img-filters');
  var filterButtons = document.querySelectorAll('.img-filters__button');

  var filterPopular = function () {
    window.render(pictures.sort(function (first, second) {
      return second.likes - first.likes;
    }));
  };

  var filterDiscussed = function () {
    window.render(pictures.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    }));
  };

  var filterRecommended = function () {
    window.render(firstVersionPictures);
  };

  var clearPictures = function () {
    var picturesList = document.querySelector('.pictures');
    var oldPictures = picturesList.querySelectorAll('.picture__link');
    for (var j = 0; j < oldPictures.length; j++) {
      picturesList.removeChild(oldPictures[j]);
    }
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

  var successHandler = function (data) {
    data.pop();
    pictures = data;
    firstVersionPictures = pictures.slice();
    rewriteAfterFilter(filterRecommended, pictures);
    // debounce(filterPictures);
    filterPictures();
  };

  window.backend.load(successHandler, errorHandler);

  var rewriteAfterFilter = function (filter, pictures, clear) {
    if (clear) {
      clearPictures();
    }
    window.debounce(filter);
    // filter();
    window.initBigPicture(pictures);
  };

  var filterOnClick = function (evt) {
    filterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    evt.preventDefault();
    switch (evt.target.id) {
      case 'filter-popular':
        rewriteAfterFilter(filterPopular, pictures, true);
        break;
      case 'filter-discussed':
        rewriteAfterFilter(filterDiscussed, pictures, true);
        break;
      case 'filter-new':
        rewriteAfterFilter(filterRecommended, firstVersionPictures, true);
        break;
    }
  };

  var filterPictures = function () {
    imageFilters.classList.remove('img-filters--inactive');

    filterButtons[0].classList.remove('img-filters__button--active');

    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', filterOnClick);
    }
  };
})();
