import { host } from './host.es6'
import { ajaxApi, _getData, errorNotice, successNotice } from './api.es6'

module.exports = (body) => {
  let requestObj = {
    modules: ['albums'],
    url: ['/albums'],
    id: false,
    wrapper: ['.albums'],
    template: { view: ['partials/albums/index.hbs'] },
    callback: [
      () => {
        console.info('Create album is OK')
      }
    ]
  }

  function _createAlbum (el) {
    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/albums',
        method: 'POST',
        data: {
          name: $('#albumName').val()
        },
        success: (response) => {
          successNotice({statusText: 'Album is create'}, 'show')
          _getData(requestObj)
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
      $('#newAlbum').find('[data-dismiss="modal"]').trigger('click')
    }, 'album')
  }

  function _removeAlbum () {
    if (!$('*').is('.album')) { return false }

    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/albums/' + $('.albums .album').data('albumid'),
        method: 'DELETE',
        success: (response) => {
          successNotice({statusText: 'Remove album is complete'}, 'show')
          $('.nav-item__albums, .nav-item__albums a').trigger('click')
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
    }, 'album')
  }

  function Events () {
    $('.js-create-album').click((e) => {
      e.preventDefault()
      _createAlbum($(this))
    })

    $('.nav-item__new-photo').click((e) => {
      e.preventDefault()
      $('.js-media-album-file').trigger('click')
    })

    $('.nav-item__remove-album').click((e) => {
      e.preventDefault()
      _removeAlbum()
    })
  }

  return {
    Events: Events
  }
}
