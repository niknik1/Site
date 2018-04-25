import { _getData, ajaxApi, errorNotice, successNotice } from './api.es6'
import { host } from './host.es6'
import { getRowMediaPlugin } from './coreFunc.es6'

module.exports = (body) => {
  function _updateRequest (el) {
    require.ensure([], (require) => {
      _getData({
        modules: ['friends', 'profile', 'photoSmall'],
        url: ['/social-activities', '/profiles', '/albums'],
        id: false,
        wrapper: ['.followers-list-block', '.user', '.user__info-photos [data-grid="images"]'],
        template: {
          view: [
            'partials/followers/followers-items.hbs',
            'partials/profile/user-aside.hbs',
            'partials/albums/smallPhotosBlock.hbs'
          ]
        },
        callback: [
          () => {},
          () => {},
          getRowMediaPlugin(false, '.user__info-photos')
        ]
      })

      if (el.hasClass('js-modal-btn')) {
        el.closest('.modal-dialog').find('.close').trigger('click')
      }
    }, 'social')
  }

  function _follow (el) {
    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/social-activities',
        method: 'POST',
        data: {
          user_id: el.closest('.user-item').attr('data-userid'),
          type: '1'
        },
        success: () => {
          successNotice({statusText: 'Subscribe successfull'}, 'show')
          _updateRequest()
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
    }, 'social')
  }

  function _block (el) {
    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/social-activities',
        method: 'POST',
        data: {
          user_id: el.closest('.user-item').attr('data-userid'),
          type: '2'
        },
        success: () => {
          successNotice({statusText: 'User is blocked'}, 'show')
          _updateRequest(el)
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
    }, 'social')
  }

  function _unfollow (el) {
    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/social-activities/' + el.closest('.user-item').attr('data-userid'),
        method: 'DELETE',
        success: () => {
          _updateRequest(el)
          successNotice({statusText: 'Unsubscribe successfull'}, 'show')
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
    }, 'social')
  }

  function SearchEvents () {
    $('.js-follow').on('click', function (e) {
      e.preventDefault()
      _follow($(this))
    })

    $('.js-unfollow').on('click', function (e) {
      e.preventDefault()
      _unfollow($(this))
    })

    $('js-block').on('click', function (e) {
      e.preventDefault()
      _block($(this))
    })
  }

  function HomeEvents () {
    body.on('click', '.js-unfollow-update', function (e) {
      e.preventDefault()
      _unfollow($(this))
    })

    body.on('click', '.js-block-update', function (e) {
      e.preventDefault()
      _block($(this))
    })
  }

  return {
    HomeEvents: HomeEvents,
    SearchEvents: SearchEvents
  }
}
