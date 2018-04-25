import { _uploadMedia, ajaxApi, _getData, errorNotice } from './api.es6'
import { host } from './host.es6'
import { getRowMediaPlugin } from './coreFunc.es6'

module.exports = (body) => {
  function _uploadPostMedia (el) {
    require.ensure([], (require) => {
      _uploadMedia({
        input: el,
        successFn: (response) => {
          let mediaBlock = '<li><span class="remove-media">×</span><img class="wall-media" src="' + response.link + '" alt="wall media"/></li>'
          $('.wall__post-media ul').prepend(mediaBlock)
          $('.wall__post-media').show()
        }
      })
    })
  }

  function _uploadProfilePhoto (el) {
    require.ensure([], (require) => {
      _uploadMedia({
        input: el,
        successFn: (response) => {
          $('#profilePhotoLink').val(response.link)
        }
      })
    })
  }

  function _uploadAlbumPhoto (el) {
    require.ensure([], (require) => {
      _uploadMedia({
        input: el,
        successFn: (response) => {
          $('#albumPhoto').val(response.link)
          ajaxApi({
            url: host() + '/photos',
            method: 'POST',
            data: {
              album_id: $('.nav-item__photos').data('albumid'),
              url: response.link
            },
            success: (response) => {
              _getData({
                modules: ['albums'],
                url: ['/albums'],
                id: $('.nav-item__photos').data('albumid'),
                wrapper: ['.albums'],
                template: { view: ['partials/photos/index.hbs'] },
                callback: [
                  () => {
                    getRowMediaPlugin(false, '.albums')
                    console.info('Upload photo is OK')
                  }
                ]
              })
            },
            error: (xhr) => {
              errorNotice(xhr.responseJSON, 'show')
            }
          })
        }
      })
    })
  }

  function Events () {
    body.on('click', '.js-get-media-dialog', function (e) {
      e.preventDefault()
      $('.js-media-file').trigger('click')
    })

    body.on('change', '.js-media-file', function () {
      _uploadPostMedia(this)
    })

    body.on('change', '#profilePhoto', function () {
      _uploadProfilePhoto(this)
    })

    body.on('change', '.js-media-album-file', function () {
      _uploadAlbumPhoto(this)
    })

    body.on('click', '.remove-media', function (e) {
      e.preventDefault()

      $(this).parent('li').remove()
    })
  }

  return {
    Events: Events
  }
}
