webpackJsonp([5,4],{

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {\n\nvar _coreFunc = __webpack_require__(32);\n\nmodule.exports = function () {\n  var parentBtnContent = void 0;\n  var preloader = '';\n\n  function wallPreloader(status) {\n    if (status) {\n      $('.wall .preloader-item').show();\n      $('.wall-list').addClass('is-loading');\n    } else {\n      setTimeout(function () {\n        $('.wall .preloader-item').hide();\n        $('.wall-list').removeClass('is-loading');\n      }, 750);\n    }\n  }\n\n  function btnPreloader(btn, status) {\n    if (['', null, undefined].indexOf(btn) >= 0) {\n      return false;\n    }\n    if (['', null, undefined].indexOf(status) >= 0) {\n      return false;\n    }\n\n    switch (status) {\n      case 'show':\n        parentBtnContent = $(btn).text();\n        $(btn).html(preloader);\n\n        break;\n      case 'hide':\n        $(btn).html(parentBtnContent);\n\n        console.log(parentBtnContent);\n\n        break;\n    }\n  }\n\n  // Change Login form to Registration and back\n  function changeAuthForm(callback) {\n    var emailField = $('.user-email-f');\n    var actionBtn = $('.btn-signin');\n    var linkBtn = $('.js-linkBtn');\n    var form = $('.form-signin');\n    var formStatus = form.attr('data-type');\n\n    // Hide form content\n    form.animate({ opacity: 0 }, 200);\n\n    (0, _coreFunc.sleep)(200);\n\n    // Change form\n    switch (formStatus) {\n      case 'login':\n        emailField.show();\n        emailField.find('input').attr('data-validate', 'email').attr('data-validate-func', 'required').attr('data-validate-hint', 'This field can not be empty!').attr('data-validate-hint-position', 'right');\n        $('.forgot-password').hide();\n        actionBtn.text('Registration');\n        actionBtn.addClass('js-register').removeClass('js-login');\n        linkBtn.text('Return to login');\n        $('.form-signin').attr('data-type', 'registration');\n\n        break;\n      case 'registration':\n        emailField.hide();\n        emailField.find('input').removeAttr('data-validate').removeAttr('data-validate-func').removeAttr('data-validate-hint').removeAttr('data-validate-hint-position');\n        $('.forgot-password').show();\n        actionBtn.text('Sign In');\n        actionBtn.removeClass('js-register').addClass('js-login');\n        linkBtn.text('А тута можно зарегаться');\n        $('.form-signin').attr('data-type', 'login');\n\n        break;\n    }\n\n    if (callback) {\n      $('.form-signin')[0].reset();\n    }\n\n    // Show form content\n    form.animate({ opacity: 1 }, 200);\n  }\n\n  return {\n    wall: wallPreloader,\n    btn: btnPreloader,\n    changeAuthForm: changeAuthForm\n  };\n};\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./client/js/dev/modules/animation.es6\n// module id = 123\n// module chunks = 4 5\n\n//# sourceURL=webpack:///./client/js/dev/modules/animation.es6?");

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {\n\nvar _host = __webpack_require__(33);\n\nvar _api = __webpack_require__(56);\n\nmodule.exports = function (body) {\n  var requestObj = {\n    modules: ['albums'],\n    url: ['/albums'],\n    id: false,\n    wrapper: ['.albums'],\n    template: { view: ['partials/albums/index.hbs'] },\n    callback: [function () {\n      console.info('Create album is OK');\n    }]\n  };\n\n  function _createAlbum(el) {\n    Promise.resolve().then((function (require) {\n      (0, _api.ajaxApi)({\n        url: (0, _host.host)() + '/albums',\n        method: 'POST',\n        data: {\n          name: $('#albumName').val()\n        },\n        success: function success(response) {\n          (0, _api.successNotice)({ statusText: 'Album is create' }, 'show');\n          (0, _api._getData)(requestObj);\n        },\n        error: function error(xhr) {\n          (0, _api.errorNotice)(xhr.responseJSON, 'show');\n        }\n      });\n      $('#newAlbum').find('[data-dismiss=\"modal\"]').trigger('click');\n    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n  }\n\n  function _removeAlbum() {\n    if (!$('*').is('.album')) {\n      return false;\n    }\n\n    Promise.resolve().then((function (require) {\n      (0, _api.ajaxApi)({\n        url: (0, _host.host)() + '/albums/' + $('.albums .album').data('albumid'),\n        method: 'DELETE',\n        success: function success(response) {\n          (0, _api.successNotice)({ statusText: 'Remove album is complete' }, 'show');\n          $('.nav-item__albums, .nav-item__albums a').trigger('click');\n        },\n        error: function error(xhr) {\n          (0, _api.errorNotice)(xhr.responseJSON, 'show');\n        }\n      });\n    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n  }\n\n  function Events() {\n    var _this = this;\n\n    $('.js-create-album').click(function (e) {\n      e.preventDefault();\n      _createAlbum($(_this));\n    });\n\n    $('.nav-item__new-photo').click(function (e) {\n      e.preventDefault();\n      $('.js-media-album-file').trigger('click');\n    });\n\n    $('.nav-item__remove-album').click(function (e) {\n      e.preventDefault();\n      _removeAlbum();\n    });\n  }\n\n  return {\n    Events: Events\n  };\n};\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./client/js/dev/modules/albums.es6\n// module id = 136\n// module chunks = 5\n\n//# sourceURL=webpack:///./client/js/dev/modules/albums.es6?");

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {\n\nvar _api = __webpack_require__(56);\n\nmodule.exports = function (body) {\n  function _toggleCommentBlock(el) {\n    el.closest('.wall-item').find('.post-comment').toggle();\n\n    var thisText = el.text();\n\n    if (thisText === 'Commented') {\n      el.text('Close comment block');\n    } else {\n      el.text('Commented');\n    }\n  }\n\n  function _sendComment(el) {\n    Promise.resolve().then((function (require) {\n      var commentInput = el.closest('.post-comment').find('input');\n\n      (0, _api._setData)({\n        url: '/comments',\n        method: 'POST',\n        data: {\n          text: commentInput.val(),\n          post_id: el.closest('.wall-item').data('postid')\n        },\n        successFn: function successFn(response) {\n          var commentRow = __webpack_require__(7);\n          el.closest('.wall-item').find('.comments-list').append(commentRow(response));\n          commentInput.val(' ');\n        }\n      });\n    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n  }\n\n  function _removeComment(el) {\n    Promise.resolve().then((function (require) {\n      var commentId = el.data('commentid');\n      (0, _api._removeData)({\n        url: '/comments/' + commentId,\n        successFn: function successFn(response) {\n          el.closest('.comments-item').remove();\n        }\n      });\n    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n  }\n\n  function Events() {\n    body.on('click', '.set-comment-post', function (e) {\n      e.preventDefault();\n\n      _toggleCommentBlock($(this));\n    });\n\n    body.on('click', '.js-send-comment', function (e) {\n      e.preventDefault();\n\n      _sendComment($(this));\n    });\n\n    body.on('click', '.remove-comments', function (e) {\n      e.preventDefault();\n\n      _removeComment($(this));\n    });\n  }\n\n  return {\n    events: Events\n  };\n};\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./client/js/dev/modules/comments.es6\n// module id = 137\n// module chunks = 5\n\n//# sourceURL=webpack:///./client/js/dev/modules/comments.es6?");

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {\n\nvar _host = __webpack_require__(33);\n\nvar _api = __webpack_require__(56);\n\nvar _coreFunc = __webpack_require__(32);\n\nmodule.exports = function (body) {\n  function _updateProfile(el) {\n    Promise.resolve().then((function (require) {\n      var form = $('.profile-settings').find('form');\n      var newFirstName = form.find('#firstname').val();\n      var newLastName = form.find('#lastname').val();\n      var newQuote = form.find('#quote').val();\n      var newProfilePhoto = form.find('#profilePhotoLink').val();\n\n      (0, _api.ajaxApi)({\n        url: (0, _host.host)() + '/profiles/' + el.data('profileid'),\n        method: 'PUT',\n        data: {\n          firstname: newFirstName,\n          lastname: newLastName,\n          quote: newQuote,\n          photo: newProfilePhoto,\n          lived: form.find('#lived').val(),\n          from: form.find('#from').val(),\n          went: form.find('#went').val()\n        },\n        success: function success(response) {\n          (0, _api.successNotice)({ statusText: 'All right!' }, 'show');\n          $('.profile-name').text(newFirstName + ' ' + newLastName);\n          $('.profile-quote').text(newQuote);\n          $('.profile-photo').attr('src', newProfilePhoto);\n        },\n        error: function error(xhr) {\n          (0, _api.errorNotice)(xhr.responseJSON, 'show');\n        }\n      });\n    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n  }\n\n  function _removeProfile(el) {\n    Promise.resolve().then((function (require) {\n      (0, _api.ajaxApi)({\n        url: (0, _host.host)() + '/profiles/' + el.data('profileid'),\n        method: 'DELETE',\n        success: function success() {\n          (0, _api.successNotice)({ statusText: 'Profile complete remove' }, 'show');\n\n          setTimeout(function () {\n            (0, _coreFunc.eraseCookie)('session-token');\n            location.href = '/';\n          }, 1000);\n        }\n      });\n    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n  }\n\n  function _toggleMenu(el) {\n    Promise.resolve().then((function (require) {\n      var showElArr = [];\n      var hideElArr = [];\n\n      if (el.closest('li').hasClass('nav-item__profile')) {\n        hideElArr = ['.nav-item__new-album', '.nav-item__remove-album', '.nav-item__photos', '.nav-item__new-photo'];\n        showElArr = ['.nav-item__albums'];\n\n        $('.nav-item__photos').removeClass('active');\n        $('.bpy').removeClass('is-collapse');\n      } else if (el.closest('li').hasClass('nav-item__albums')) {\n        hideElArr = ['.nav-item__photos', '.nav-item__new-photo', '.nav-item__remove-album'];\n        showElArr = ['.nav-item__new-album'];\n\n        $('.bpy').removeClass('is-collapse');\n        (0, _api._getData)({\n          modules: ['albums'],\n          url: ['/albums'],\n          id: false,\n          wrapper: ['.albums'],\n          template: { view: ['partials/albums/index.hbs'] },\n          callback: [function () {\n            console.info('Get album is OK');\n          }]\n        });\n      } else if (el.hasClass('album-item')) {\n        hideElArr = ['.nav-item__new-album'];\n        showElArr = ['.nav-item__photos', '.nav-item__new-photo', '.nav-item__remove-album'];\n\n        $('.nav-item, .nav-link').removeClass('active');\n        $('.nav-item__photos').addClass('active').attr('data-albumid', el.data('albumid'));\n        $('.bpy').addClass('is-collapse');\n        (0, _api._getData)({\n          modules: ['albums'],\n          url: ['/albums'],\n          id: el.data('albumid'),\n          wrapper: ['.albums'],\n          template: { view: ['partials/photos/index.hbs'] },\n          callback: [function () {\n            (0, _coreFunc.getRowMediaPlugin)(false, '.albums');\n            console.info('Get photo is OK');\n          }]\n        });\n      }\n\n      $.each(showElArr, function (i, item) {\n        $(item).show();\n      });\n\n      $.each(hideElArr, function (i, item) {\n        $(item).hide();\n      });\n    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n  }\n\n  function Events() {\n    body.on('click', '.js-update-profile', function (e) {\n      e.preventDefault();\n      _updateProfile($(this));\n    });\n\n    body.on('click', '.nav-tabs .nav-link, .album-item', function () {\n      _toggleMenu($(this));\n    });\n\n    body.on('click', '.js-remove-profile', function (e) {\n      e.preventDefault();\n\n      _removeProfile($(this));\n    });\n  }\n\n  return {\n    Events: Events\n  };\n};\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./client/js/dev/modules/profile.es6\n// module id = 138\n// module chunks = 5\n\n//# sourceURL=webpack:///./client/js/dev/modules/profile.es6?");

/***/ })

});