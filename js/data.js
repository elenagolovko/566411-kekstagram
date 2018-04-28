'use strict';

(function () {

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  window.data = {
    getRandomInt: getRandomInt,
    makeElement: makeElement,
  };
})();
