'use strict';

(function () {
  var DESCRIPTIONS_ARR = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
    'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];
  var COMMENTS_ARR = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

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

  window.data = {
    COMMENTS_ARR: COMMENTS_ARR,
    getRandomInt: getRandomInt,
    makeElement: makeElement,
    generatePicturesData: generatePicturesData
  };
})();
