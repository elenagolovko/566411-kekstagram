'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var preview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');
  var fileChooser = document.querySelector('.img-upload__input');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var setPreviewBackground = function (value) {
      effectsPreview.forEach(function (effectPreview) {
        effectPreview.style = 'background-image: url(' + value + ');';
      });
    };

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        setPreviewBackground(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });
})();
