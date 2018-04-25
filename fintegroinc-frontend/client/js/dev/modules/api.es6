import { readCookie, checkAuth } from './coreFunc.es6'
import { host } from './host.es6'

export function ajaxApi (options) {
  let token = readCookie('session-token') ? readCookie('session-token') : false

  if (['', null, undefined].indexOf(options.url) >= 0) { return false }
  if (['', null, undefined].indexOf(options.method) >= 0) { return false }
  if (['', null, undefined].indexOf(token) >= 0) { return false }

  if (['', null, undefined].indexOf(options.data) >= 0) { options.data = null }
  if (['', null, undefined].indexOf(options.before) >= 0) { options.before = () => {} }
  if (['', null, undefined].indexOf(options.success) >= 0) { options.success = () => {} }
  if (['', null, undefined].indexOf(options.error) >= 0) { options.error = () => {} }

  $.ajax({
    url: options.url,
    method: options.method,
    async: !!options.async,
    crossDomain: true,
    cache: false,
    headers: {
      bearer: token
    },
    data: options.data,
    beforeSend: () => {
      options.before()
    },
    success: (response) => {
      options.success(response)
    },
    error: (xhr) => {
      options.error(xhr)
    }
  })
}

export function _getData (options) {
  if (['', null, undefined].indexOf(options) >= 0) { return false }

  let beforeFn = () => {}

  function request (url, n) {
    return ajaxApi({
      url: host() + url,
      method: 'GET',
      async: false,
      data: options.data ? options.data : null, // temp hardcore for search (because single case)
      beforeSend: () => {
        if (beforeFn) {
          beforeFn()
        }
      },
      success: (response) => {
        let wrapper = options.wrapper[n]

        try {
          let template = require('./../../../views/' + options.template.view[n])

          if (options.template.style) {
            require('./../../../scss/' + options.template.style[0])
          }

          $(wrapper).html(template(response))

          if (options.callback[n]) {
            // console.log(options.callback[n])
            options.callback[n]()
          }
        } catch (err) {
          let template = require('./../../../views/partials/error/error.hbs')
          let errorMsg = {msg: 'Error loading data'}

          $(wrapper).html(template(errorMsg))
          console.log(err)
        }

        $(wrapper).closest('.block').find('.preloader-item').hide()
      },
      error: (xhr) => {
        let wrapper = options.wrapper[n]
        let template = require('./../../../views/partials/error/error.hbs')
        let errorMsg = {msg: 'Connection error'}

        $(wrapper).html(template(errorMsg))

        $(wrapper).siblings('.preloader-item').hide()

        errorNotice({error: xhr.statusText}, 'show')
      }
    })
  }

  for (let i = 0; i < options.modules.length; i++) {
    let url = options.url[i] + (options.id ? '/' + options.id : '')

    request(url, i)
  }
}

export function _setData (options) {
  if (['', null, undefined].indexOf(options) >= 0) { return false }

  ajaxApi({
    url: host() + options.url,
    method: 'POST',
    data: options.data,
    success: (response) => {
      options.successFn(response)
    },
    error: (xhr) => {
      errorNotice(xhr.responseJSON, 'show')
    }
  })
}

export function _removeData (options) {
  if (['', null, undefined].indexOf(options) >= 0) { return false }

  ajaxApi({
    url: host() + options.url,
    method: 'DELETE',
    success: (response) => {
      options.successFn(response)
    },
    error: (xhr) => {
      errorNotice(xhr.statusText, 'show')
    }
  })
}

export function _uploadMedia (options) {
  require.ensure([], (require) => {
    let file = options.input.files[0]
    let token = checkAuth()
    let formData
    let form = $(options.input).closest('form')

    if (file.name.length < 1) { } else if (file.size > 10 * 1024 * 1024) {
      errorNotice({error: 'The file is too big'}, 'show')
    } else if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/jpeg') {
      errorNotice({error: 'The file does not match png, jpg or gif'}, 'show')
    } else {
      // formData = new FormData($('#js-media-file-form')[0])
      formData = new FormData($(form)[0])

      $.ajax({
        url: host() + '/upload',
        type: 'POST',
        headers: {
          bearer: token
        },
        data: formData,
        crossDomain: true,
        cache: false,
        contentType: false,
        processData: false,
        // xhr: () => {
        // myXhr = $.ajaxSettings.xhr();
        // if(myXhr.upload){ // if upload property exists
        // myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // progressbar
        // }
        // return myXhr;
        // },
        beforeSend: () => {
          statusNotice('Image uploading', 'show')
        },
        success: (response) => {
          options.successFn(response)
          statusNotice('', false)
          successNotice({statusText: 'Upload complete'}, 'show')
        },
        error: () => {
          errorNotice({error: 'Something went wrong'}, 'show')
        }
      })
    }
  })
}

export function statusNotice (msg, status) {
  let statusWrapper = require('./../../../views/partials/error/status.hbs')
  let statusMsg = {
    title: 'In progress',
    text: msg
  }
  if (status) {
    $('.alerts-block').append(statusWrapper(statusMsg))

    setTimeout(() => {
      // $('.alert-block .alert-info').remove()
    }, 2500)
  } else {
    $('.alerts-block .alert-info').remove()
  }
}

export function errorNotice (xhr, status) {
  let alertWrapper = require('./../../../views/partials/error/alert.hbs')
  let error

  if (Object.keys(xhr) && Object.keys(xhr).lenght > 1) {
    error = {
      title: 'Error!',
      text: xhr || 'Error is multy error :)'
    }
  } else {
    error = {
      title: 'Error!',
      text: xhr.error ? xhr.error : 'Error is single error :)'
    }
  }

  if (status) {
    $('.alerts-block').prepend(alertWrapper(error))

    setTimeout(() => {
      $('.alerts-block .alert').remove()
    }, 5000)
  } else {
    $('.alerts-block .alert').remove()
  }
}

export function successNotice (msg, status) {
  let msgWrapper = require('./../../../views/partials/error/success.hbs')
  let success

  if (Object.keys(msg) && Object.keys(msg).lenght > 1) {
    success = {
      title: 'Success!',
      text: msg || 'Some success msg :)'
    }
  } else {
    success = {
      title: 'Success!',
      text: msg.statusText ? msg.statusText : 'Some success msg'
    }
  }

  if (status) {
    $('.alerts-block').prepend(msgWrapper(success))

    setTimeout(() => {
      $('.alerts-block .alert-success').remove()
    }, 5000)
  } else {
    $('.alerts-block .alert-success').remove()
  }
}
