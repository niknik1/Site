import { _setData, _removeData } from './api.es6'
import { getRowMediaPlugin } from './coreFunc.es6'

module.exports = (body) => {
  function _sendPost () {
    require.ensure([], (require) => {
      let mediaList = []
      $('.wall__post-media').find('img').each(function (i) {
        mediaList[i] = { url: $(this).attr('src') }
      })

      _setData({
        url: '/posts',
        data: {
          text: $('.js-wall-msg').val() ? $('.js-wall-msg').val() : '',
          media: mediaList
        },
        successFn: (response) => {
          require.ensure([], (require) => {
            let postData = {
              posts: {
                0: {
                  user_id: response.user_id,
                  // text: $('.js-wall-msg').val(),
                  text: response.text,
                  // date: new Date().toJSON().slice(0, 19).replace(/-/g, '-').replace('T', ' '),
                  data: response.date,
                  id: response.id,
                  mediaList: mediaList
                }
              }
            }
            let wallBlock = require('./../../../views/partials/posts/simple-item.hbs')

            $('.wall-list').prepend(wallBlock(postData))

            if ($('*').is('.wall-item.empty-item')) {
              $('.wall-item.empty-item').remove()
            }

            if (mediaList.length > 0) {
              getRowMediaPlugin([$('.wall-list .wall-item:first-child')])
            }

            $('.wall__post-media').hide()
            $('.wall__post-media ul').html(' ')
            $('.js-wall-msg').val(' ')
          })
        }
      })
    }, 'posts')
  }

  function _removePost (el) {
    require.ensure([], (require) => {
      _removeData({
        url: '/posts/' + el.data('id'),
        successFn: () => {
          $('[data-postid="' + el.data('id') + '"]').remove()

        // Return empty wall-item with notice
          if ($('[data-postid]').length < 1) {
            require.ensure([], (require) => {
              let emptyBlock = require('./../../../views/partials/error/posts/empty.hbs')
              $('.wall-list').prepend(emptyBlock())
            })
          }
        }
      })
    }, 'posts')
  }

  function Events () {
    body.on('click', '.js-send-msg', function (e) {
      e.preventDefault()
      _sendPost()
    })

    body.on('click', '.remove-post', function (e) {
      e.preventDefault()
      _removePost($(this))
    })
  }

  return {
    Events: Events
  }
}
