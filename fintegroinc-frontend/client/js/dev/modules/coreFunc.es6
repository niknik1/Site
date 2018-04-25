import { ajaxApi, errorNotice } from './api.es6'
import { host } from './host.es6'

export function sleep (miliseconds) {
  let currentTime = new Date().getTime()
  while (currentTime + miliseconds >= new Date().getTime()) {}
}

// Authorisation and Registration event
export function auth (el, type, data) {
  require.ensure([], (require) => {
    let validatorFunc = require('./validator.es6')
    if (!validatorFunc().validator()._submit(el.closest('form'))) { return false }

    let successFn
    let promise = new Promise((resolve, reject) => {
      resolve('result')
      reject(new Error('error'))
    })

    if (type === 'login') {
      successFn = (response) => {
        promise
          .then(
            result => {
              createCookie('session-token', response.token, 1)
              localStorage.setItem('userId', response.profile.user_id)
            },
            error => {
              console.error('Rejected: ' + error)
            }
          ).then(
            () => {
              location.reload()
            }
          )
      }
    } else {
      successFn = () => {
        require.ensure([], (require) => {
          let formAnim = require('./animation.es6')
          formAnim().changeAuthForm('login', true)
        })
      }
    }

    ajaxApi({
      url: host() + '/' + type,
      method: 'post',
      data: data,
      beforeSend: () => {
      },
      success: (response) => {
        successFn(response)

        return true
      },
      error: (xhr) => {
        $('.form-signin')[0].reset()
        errorNotice(xhr.responseJSON, 'show')
      }
    })
  })
}

export function checkAuth () {
  return readCookie('session-token') ? readCookie('session-token') : false
}

export function getRowMediaPlugin (items, parentWrapper) {
  require.ensure([], (require) => {
    let rowGrid = require('./rowGrid.es6')

    require('./../../../vendor/zoomPlugin/zoom.min.js')

    rowGrid(items, parentWrapper)
  })
}

export function createCookie (name, value, days) {
  let expires

  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toGMTString()
  } else {
    expires = ''
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}

export function readCookie (name) {
  let nameEQ = name + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') { c = c.substring(1, c.length) }
    if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length) }
  }
  return null
}

export function eraseCookie (name) {
  createCookie(name, '', -1)
}
