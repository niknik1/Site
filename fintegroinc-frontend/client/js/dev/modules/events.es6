import { auth, eraseCookie } from './coreFunc.es6'

module.exports = (body) => {
  function authEvents () {
    // Login event
    body.on('click', '.js-login', function (e) {
      e.preventDefault()

      let userLogin = $('.user-login').val()
      let userPass = $('.user-password').val()

      auth($(this), 'login', {username: userLogin, password: userPass})
    })

    // Get register form event
    $('.js-get-register').click((e) => {
      e.preventDefault()

      require.ensure([], (require) => {
        let formAnim = require('./animation.es6')
        formAnim().changeAuthForm()
      })
    })

    // Registration event
    body.on('click', '.js-register', function (e) {
      e.preventDefault()

      let userLogin = $('.user-login').val()
      let userEmail = $('.user-email').val()
      let userPass = $('.user-password').val()

      auth($(this), 'registration', {login: userLogin, email: userEmail, password: userPass})
    })
  }

  function appEvents () {
    body.on('click', '.js-logout', (e) => {
      e.preventDefault()

      eraseCookie('session-token')
      localStorage.removeItem('userId')
      location.reload()
    })

    // Page navigate
    let pages = require('./pages.es6')
    pages(body).Events()

    // Send/Remove post to wall
    let posts = require('./posts.es6')
    posts(body).Events()

    // Send/Remove media for post
    let media = require('./media.es6')
    media(body).Events()

    // Search module
    let search = require('./search.es6')
    search(body).Events()

    body.on('click', '.bqt', function () {
      let social = require('./social.es6')
      social(body).SearchEvents()
    })

    // Chat
    let chat = require('./chat.es6')
    chat(body).Events()
  }

  return {
    initAuth: authEvents,
    initApp: appEvents
  }
}
