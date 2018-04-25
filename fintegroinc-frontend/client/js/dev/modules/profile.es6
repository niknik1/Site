import { host } from './host.es6'
import { ajaxApi, _getData, errorNotice, successNotice } from './api.es6'
import { getRowMediaPlugin, eraseCookie } from './coreFunc.es6'

module.exports = (body) => {
  function _updateProfile (el) {
    require.ensure([], (require) => {
      let form = $('.profile-settings').find('form')
      let newFirstName = form.find('#firstname').val()
      let newLastName = form.find('#lastname').val()
      let newQuote = form.find('#quote').val()
      let newProfilePhoto = form.find('#profilePhotoLink').val()

      ajaxApi({
        url: host() + '/profiles/' + el.data('profileid'),
        method: 'PUT',
        data: {
          firstname: newFirstName,
          lastname: newLastName,
          quote: newQuote,
          photo: newProfilePhoto,
          lived: form.find('#lived').val(),
          from: form.find('#from').val(),
          went: form.find('#went').val()
        },
        success: (response) => {
          successNotice({statusText: 'All right!'}, 'show')
          $('.profile-name').text(newFirstName + ' ' + newLastName)
          $('.profile-quote').text(newQuote)
          $('.profile-photo').attr('src', newProfilePhoto)
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
    }, 'profile')
  }

  function _removeProfile (el) {
    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/profiles/' + el.data('profileid'),
        method: 'DELETE',
        success: () => {
          successNotice({statusText: 'Profile complete remove'}, 'show')

          setTimeout(() => {
            eraseCookie('session-token')
            location.href = '/'
          }, 1000)
        }
      })
    })
  }

  function _toggleMenu (el) {
    require.ensure([], (require) => {
      let showElArr = []
      let hideElArr = []

      if (el.closest('li').hasClass('nav-item__profile')) {
        hideElArr = ['.nav-item__new-album', '.nav-item__remove-album', '.nav-item__photos', '.nav-item__new-photo']
        showElArr = ['.nav-item__albums']

        $('.nav-item__photos').removeClass('active')
        $('.bpy').removeClass('is-collapse')
      } else if (el.closest('li').hasClass('nav-item__albums')) {
        hideElArr = ['.nav-item__photos', '.nav-item__new-photo', '.nav-item__remove-album']
        showElArr = ['.nav-item__new-album']

        $('.bpy').removeClass('is-collapse')
        _getData({
          modules: ['albums'],
          url: ['/albums'],
          id: false,
          wrapper: ['.albums'],
          template: { view: ['partials/albums/index.hbs'] },
          callback: [
            () => {
              console.info('Get album is OK')
            }
          ]
        })
      } else if (el.hasClass('album-item')) {
        hideElArr = ['.nav-item__new-album']
        showElArr = ['.nav-item__photos', '.nav-item__new-photo', '.nav-item__remove-album']

        $('.nav-item, .nav-link').removeClass('active')
        $('.nav-item__photos').addClass('active').attr('data-albumid', el.data('albumid'))
        $('.bpy').addClass('is-collapse')
        _getData({
          modules: ['albums'],
          url: ['/albums'],
          id: el.data('albumid'),
          wrapper: ['.albums'],
          template: { view: ['partials/photos/index.hbs'] },
          callback: [
            () => {
              getRowMediaPlugin(false, '.albums')
              console.info('Get photo is OK')
            }
          ]
        })
      }

      $.each(showElArr, function (i, item) {
        $(item).show()
      })

      $.each(hideElArr, function (i, item) {
        $(item).hide()
      })
    })
  }

  function Events () {
    body.on('click', '.js-update-profile', function (e) {
      e.preventDefault()
      _updateProfile($(this))
    })

    body.on('click', '.nav-tabs .nav-link, .album-item', function () {
      _toggleMenu($(this))
    })

    body.on('click', '.js-remove-profile', function (e) {
      e.preventDefault()

      _removeProfile($(this))
    })
  }

  return {
    Events: Events
  }
}
