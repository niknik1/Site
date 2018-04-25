import { _getData } from './api.es6'
import { checkAuth, getRowMediaPlugin } from './coreFunc.es6'

module.exports = (body) => {
  function _changeDataAttr (id, el) {
    let owner = +id ? +id === +localStorage.getItem('userId') : true
    let changedLinkArr
    let newLink
    console.log(owner)

    switch (el) {
      case 'home':
        if (!owner) {
          changedLinkArr = ['wall', 'news']
          newLink = ['home', 'home-news']
        } else {
          changedLinkArr = ['home', 'home-news']
          newLink = ['wall', 'news']
        }
        break

      case 'home-news':
        $('#search').attr('data-wrapper', 'index')

        if (!owner) {
          changedLinkArr = ['wall']
          newLink = ['home']
        } else {
          changedLinkArr = ['index']
          newLink = ['wall']
        }
        break

      case 'news':
        if (!owner) {
          changedLinkArr = ['wall']
          newLink = ['home']
        } else {
          changedLinkArr = ['home']
          newLink = ['wall']
        }
        break

      case 'wall':

        break

      case 'profile':
        $('#search').attr('data-wrapper', 'profile')

        // if(!owner){
        changedLinkArr = ['news', 'wall']
        newLink = ['index-news', 'index']
        // }
        break

      case 'chat':
        changedLinkArr = ['index']
        newLink = ['wall']
        break
    }

    if (!changedLinkArr) { return false }

    for (let i = 0; i < changedLinkArr.length; i++) {
      console.log(changedLinkArr[i], newLink[i])
      if (!$('[data-page="' + changedLinkArr[i] + '"]').hasClass('js-page-alien')) {
        $('[data-page="' + changedLinkArr[i] + '"]').attr('data-page', newLink[i])
      }
    }
  }

  function _page (el, flag) {
    require.ensure([], (require) => {
      let page = typeof el === 'object' ? el.attr('data-page') : el
      let modulesArr
      let urlArr
      let id = typeof el === 'object' ? el.data('id') : false
      let wrapperArr
      let templateObj
      let callbackArr

      $('.js-page').closest('li').removeClass('active')
      $(el).closest('li').addClass('active')

      if (id === localStorage.getItem('userId')) {
        id = false
      }

      _changeDataAttr(id, page)

      switch (page) {
        case 'index':
        case 'index-news':
          modulesArr = ['index']
          urlArr = ['/site']
          wrapperArr = ['#wrapper']
          templateObj = {
            view: ['partials/layout/index.hbs'],
            style: ['app-style.scss']
          }
          callbackArr = [
            () => {
              setTimeout(() => {
                $('body').animate({ opacity: 1 }, 250)
              }, 750)

              _page(page === 'index' ? 'home' : 'home-news')
            }
          ]

          break
        case 'home':
        case 'home-news':

          modulesArr = ['profiles', 'photoSmall', (page === 'home' ? 'posts' : 'news'), 'friends']
          urlArr = ['/profiles', '/albums', (page === 'home' ? '/posts' : '/news'), '/social-activities']
          wrapperArr = [
            '.user',
            '.user__info-photos [data-grid="images"]',
            '.wall',
            '.followers-list-block'
          ]
          templateObj = {
            view: [
              'partials/profile/user-aside.hbs',
              'partials/albums/smallPhotosBlock.hbs',
              page === 'home' ? 'partials/posts/index.hbs' : 'partials/news/index.hbs',
              'partials/followers/followers-items.hbs'
            ]
          }
          callbackArr = [
            () => {
              console.info('home')
            },
            getRowMediaPlugin(false, '.user__info-photos'),
            () => {
              let animation = require('./animation.es6')
              let commentControll = require('./comments.es6')

              animation().wall(false)
              commentControll(body).events()
              getRowMediaPlugin(false, '.wall-item')
            },
            () => {
              let social = require('./social.es6')
              social(body).HomeEvents()
            }
          ]

          $('[data-page="index-news"]').attr('data-page', 'news')
          break

        case 'news':

          modulesArr = ['news']
          urlArr = ['/news']
          wrapperArr = ['.wall']
          templateObj = {
            view: ['partials/news/index.hbs']
          }
          callbackArr = [
            () => {
              let animation = require('./animation.es6')
              animation().wall(false)
              getRowMediaPlugin(false, '.wall-item')
            }
          ]
          console.info('news')
          break

        case 'wall':
          modulesArr = ['wall']
          urlArr = ['/posts']
          wrapperArr = ['.wall']
          templateObj = {
            view: ['partials/posts/index.hbs']
          }
          callbackArr = [
            () => {
              let animation = require('./animation.es6')
              animation().wall(false)
              getRowMediaPlugin(false, '.wall-item')
            }
          ]
          console.info('wall')
          break

        case 'profile':
          modulesArr = ['profiles', 'albums']
          urlArr = ['/profiles', '/albums']
          wrapperArr = ['.l-index', '.albums']
          templateObj = {
            view: ['partials/layout/profile.hbs', 'partials/albums/index.hbs']
          }
          callbackArr = [
            () => {
              require('./../../../scss/layout/_profile.scss')
              let profileApi = require('./profile.es6')
              profileApi(body).Events()
            },
            () => {
              let albumsApi = require('./albums.es6')
              albumsApi(body).Events()
            }
          ]
          console.info('profile')
          break

        case 'chat':
          if (el.hasClass('js-start-chat')) {
            el.closest('.modal-dialog').find('.close').trigger('click')
            localStorage.setItem('newChat', el.closest('.user-item').data('userid'))
            id = el.closest('.user-item').data('userid')
          }

          modulesArr = ['chats']
          urlArr = ['/chats']
          wrapperArr = ['.wall']
          templateObj = {
            view: ['partials/chat/index.hbs']
          }
          callbackArr = [
            () => {
              let animation = require('./animation.es6')
              animation().wall(false)
              let chat = require('./chat.es6')
              chat(body).Events()
            }
          ]
          break
      }

      _getData({
        modules: modulesArr,
        url: urlArr,
        id: id,
        wrapper: wrapperArr,
        template: templateObj,
        callback: callbackArr
      })
    })
  }

  function Events () {
    body.on('click', '.js-page', function (e) {
      e.preventDefault()
      if (checkAuth()) {
        _page($(this))
      } else {
        location.href = '/'
      }
    })
  }

  return {
    Events: Events,
    page: _page
  }
}
