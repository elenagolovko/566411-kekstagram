'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var COMMENTS_COUNT = 5;
  var AVATAR_MIN_NUM = 1;
  var AVATAR_MAX_NUM = 6;
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.cancel');
  var commentsList = document.querySelector('.social__comments');
  var loadMeMore = document.querySelector('.social__comment-loadmore');

  var hideLoad = function () {
    loadMeMore.classList.add('visually-hidden');
  };

  var showLoad = function () {
    loadMeMore.classList.remove('visually-hidden');
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onHideBigPicture();
    }
  };

  var resetComments = function () {
    commentsList.textContent = '';
  };

  var onHideBigPicture = function () {
    bigPicture.classList.add('hidden');
    closeBigPicture.removeEventListener('click', onHideBigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
    resetComments();
  };

  var initComments = function (text) {
    var img = window.data.makeElement('img', 'social__picture');
    img.src = 'img/avatar-' + window.data.getRandomInt(AVATAR_MIN_NUM, AVATAR_MAX_NUM) + '.svg';
    img.alt = 'Аватар комментатора фотографии';
    img.width = '35';
    img.height = '35';

    var comment = window.data.makeElement('li', ['social__comment', 'social__comment--text']);
    comment.appendChild(img);
    comment.appendChild(document.createTextNode(text));

    return comment;
  };

  var setRightCommentsNumber = function () {
    var commentsCountElement = bigPicture.querySelector('.social__comment-count');
    var changeCountValue = commentsCountElement.childNodes[0];
    changeCountValue.nodeValue = commentsList.children.length + ' из ';
  };

  var createComments = function (someComments) {
    for (var i = 0; i < someComments.length; i++) {
      var bigPictureComments = initComments(someComments[i]);
      commentsList.appendChild(bigPictureComments);
    }
    setRightCommentsNumber();
  };

  var addMoreComments = function (allComments) {
    if (allComments.length <= COMMENTS_COUNT) {
      hideLoad();
      createComments(allComments);
      return;
    }

    var start = COMMENTS_COUNT;
    var newFiveComments = allComments.slice(0, COMMENTS_COUNT);
    allComments = allComments.slice(COMMENTS_COUNT);
    createComments(newFiveComments);

    var onCommentsHandle = function () {
      var takeNumber = allComments.length > COMMENTS_COUNT ? COMMENTS_COUNT : allComments.length;
      newFiveComments = allComments.slice(0, takeNumber);
      allComments = allComments.slice(COMMENTS_COUNT);

      createComments(newFiveComments);

      start = start + COMMENTS_COUNT;
      if (commentsList.children.length.toString() === bigPicture.querySelector('.comments-count').textContent) {
        hideLoad();
        return;
      }
    };

    loadMeMore.addEventListener('click', onCommentsHandle);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE && evt.target.classList.value === 'social__comment-loadmore') {
        onCommentsHandle();
      }
    });
  };

  var initBigPictureData = function (picture) {
    resetComments();
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.comments[0];
    showLoad();
    addMoreComments(picture.comments);
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    closeBigPicture.addEventListener('click', onHideBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  window.preview = {
    initBigPictureData: initBigPictureData,
    openBigPicture: openBigPicture
  };
})();
