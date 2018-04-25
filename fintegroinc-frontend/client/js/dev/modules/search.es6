import { _getData } from './api.es6'
import { getRowMediaPlugin } from './coreFunc.es6'

module.exports = (body) => {
  function _search (el) {
    require.ensure([], (require) => {
      let requestObj = {
        modules: ['search'],
        url: ['/search'],
        id: false,
        data: {
          search: el.val()
        },
        wrapper: ['.wall'],
        template: {
          view: ['partials/search/index.hbs']
        },
        callback: [
          () => {
            let social = require('./social.es6')
            let animation = require('./animation.es6')
            social(body).SearchEvents()
            animation().wall(false)
            console.log('Search is complete')
          }

        ]
      }

      if (el.attr('data-wrapper') === 'index') {
        _getData(requestObj)
      } else {
        _getData({
          modules: ['index', 'profiles', 'photoSmall', 'friends'],
          url: ['/site', '/profiles', '/albums', '/social-activities'],
          wrapper: [
            '#wrapper',
            '.user',
            '.user__info-photos [data-grid="images"]',
            '.followers-list-block'
          ],
          template: {
            view: [
              'partials/layout/index.hbs',
              'partials/profile/user-aside.hbs',
              'partials/albums/smallPhotosBlock.hbs',
              'partials/followers/followers-items.hbs'
            ]
          },
          callback: [
            () => {},
            () => {
              _getData(requestObj)
            },
            getRowMediaPlugin(false, '.user__info-photos'),
            () => {}
          ]
        })
      }

      $('#search').attr('data-wrapper', 'index')
      el.val(' ')
    }, 'search')
  }

  function Events () {
    body.on('keyup', '#search', function (e) {
      e.preventDefault()

      if (e.keyCode === 13) {
        _search($(this))
      }
    })
  }

  return {
    Events: Events
  }
}
