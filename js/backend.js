'use strict';

(function () {
  var loadPicturesData = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка!');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания в ' + xhr.timeout / 1000 + ' сек');
    });

    xhr.timeout = 1000;

    xhr.open('GET', URL);
    xhr.send();
  };

  var savePicture = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка!');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания в ' + xhr.timeout / 1000 + ' сек');
    });

    xhr.timeout = 1000;

    xhr.open('POST', URL);
    xhr.send();
  };

  window.backend = {
    load: loadPicturesData,
    save: savePicture
  };
})();
