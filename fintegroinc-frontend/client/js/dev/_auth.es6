module.exports = (body) => {
  let Events = require('./modules/events.es6')
  let authCard = require('./../../views/partials/layout/authCard.hbs')

  require('./../../scss/auth-style.scss')

  $('#wrapper').prepend(authCard())

  Events(body).initAuth()

  window.onload = setTimeout(() => {
    body.animate({ opacity: 1 }, 250)
  }, 500)
}
