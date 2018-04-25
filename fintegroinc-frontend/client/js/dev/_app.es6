module.exports = (body) => {
  let pages = require('./modules/pages.es6')
  let Events = require('./modules/events.es6')

  pages(body).page('index')
  Events(body).initApp()
}
