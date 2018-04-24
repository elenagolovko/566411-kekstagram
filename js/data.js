'use strict';

(function () {
  window.data = {
    DESCRIPTIONS_ARR: ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
    'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'],
    COMMENTS_ARR: ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],

    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    makeElement: function (tagName, className, text) {
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
    },

    generatePicturesData: function (photosNumber) {
      var pictures = [];
      for (var i = 1; i <= photosNumber; i++) {
        pictures.push(
            {
              url: 'photos/' + i + '.jpg',
              likes: window.data.getRandomInt(15, 200),
              comments:  window.data.getRandomInt(0, window.data.COMMENTS_ARR.length - 1),
              description: window.data.DESCRIPTIONS_ARR[ window.data.getRandomInt(0, window.data.DESCRIPTIONS_ARR.length)]
            }
        );
      }
      return pictures;
    }
  }
}) ();
