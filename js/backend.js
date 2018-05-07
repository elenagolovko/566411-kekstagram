'use strict';

(function () {
  var SUCCESS_RESPONSE = 200;
  var TIMEOUT = 10000;
  var MILISECONDS_TO_SECONDS = 1000;

  var checkStatus = function (xhr, onLoad, onError) {
    if (xhr.status === SUCCESS_RESPONSE) {
      onLoad(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var createErrorMessage = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка!');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания в ' + xhr.timeout / MILISECONDS_TO_SECONDS + ' сек');
    });
  };

  var loadPicturesData = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      checkStatus(xhr, onLoad, onError);
    });
    createErrorMessage(xhr, onLoad, onError);

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var savePicture = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      checkStatus(xhr, onLoad, onError);
    });
    createErrorMessage(xhr, onError);

    xhr.timeout = TIMEOUT;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadPicturesData,
    save: savePicture
  };
})();
