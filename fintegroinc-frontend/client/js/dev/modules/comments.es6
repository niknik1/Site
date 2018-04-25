import { _setData, _removeData } from './api.es6'

module.exports = (body) => {
  function _toggleCommentBlock (el) {
    el.closest('.wall-item').find('.post-comment').toggle()

    let thisText = el.text()

    if (thisText === 'Commented') {
      el.text('Close comment block')
    } else {
      el.text('Commented')
    }
  }

  function _sendComment (el) {
    require.ensure([], (require) => {
      let commentInput = el.closest('.post-comment').find('input')

      _setData({
        url: '/comments',
        method: 'POST',
        data: {
          text: commentInput.val(),
          post_id: el.closest('.wall-item').data('postid')
        },
        successFn: (response) => {
          let commentRow = require('./../../../views/partials/posts/comment-item.hbs')
          el.closest('.wall-item').find('.comments-list').append(commentRow(response))
          commentInput.val(' ')
        }
      })
    }, 'comments')
  }

  function _removeComment (el) {
    require.ensure([], (require) => {
      let commentId = el.data('commentid')
      _removeData({
        url: '/comments/' + commentId,
        successFn: (response) => {
          el.closest('.comments-item').remove()
        }
      })
    }, 'comments')
  }

  function Events () {
    body.on('click', '.set-comment-post', function (e) {
      e.preventDefault()

      _toggleCommentBlock($(this))
    })

    body.on('click', '.js-send-comment', function (e) {
      e.preventDefault()

      _sendComment($(this))
    })

    body.on('click', '.remove-comments', function (e) {
      e.preventDefault()

      _removeComment($(this))
    })
  }

  return {
    events: Events
  }
}
