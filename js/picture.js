'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;
  var pictures = [];
  var filter = document.querySelector('.img-filters');

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
    pictures = data;
    window.firstVersionPictures = pictures.slice();
    window.initBigPicture(pictures);
    debounce(filterPictures);
    // clearPictures();
  };

  window.backend.load(successHandler, errorHandler);

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var filterPictures = function () {
    filter.classList.remove('img-filters--inactive');

    var filterButtons = document.querySelectorAll('.img-filters__button');
    filterButtons[0].classList.remove('img-filters__button--active');

    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', function (evt) {
        filterButtons.forEach(function (button) {
          button.classList.remove('img-filters__button--active');
        });
        evt.target.classList.add('img-filters__button--active');
        evt.preventDefault();
        switch (evt.target.id) {
          case 'filter-popular':
            clearPictures();
            filterPopular();
            break;
          case 'filter-discussed':
            clearPictures();
            filterDiscussed();
            break;
          case 'filter-new':
            clearPictures();
            filterRecommended();
            break;
        }
      });
    }
  };
})();
