import { _getData, ajaxApi, errorNotice, successNotice } from './api.es6'
import { host } from './host.es6'

module.exports = (body) => {
  /*
  function _changeModal (status) {
    require.ensure([], (require) => {
      let chatGrp = $('.js-msgGroup')
      let msgGrp = $('.js-conversation')
      let modalTitle = $('.modal-title')

      if (status) {
        modalTitle.html('<a class="js-Back-to-Chat" href="#">Back</a>')
      } else {
        modalTitle.html('Messages')
      }

      chatGrp.toggleClass('hidden-xs-up')
      msgGrp.toggleClass('hidden-xs-up')
    })
  }
  */
  function _startChat () {
    require.ensure([], (require) => {
      $('.empty-item').remove()
      $('.wall-list').find('style').remove()

      return false

      _getData({
        modules: ['user'],
        url: ['/profiles'],
        id: localStorage.getItem('newChat'),
        wrapper: ['.wall-list'],
        template: {
          view: ['partials/chat/chatGroup.hbs']
        },
        callback: [
          () => {
            localStorage.removeItem('newChat')
            console.log('Start new chat')
          }
        ]
      })
    })
  }

  function _getChats () {
    require.ensure([], (require) => {
      console.log('Chat')
    }, 'chat')
  }

  function _createChat () {
    require.ensure([], (require) => {

    })
  }

  function _loadMsgList (chat) {
    require.ensure([], (require) => {
      console.log('Msg')
    }, 'chat')
  }

  function _sendMsg (id) {
    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/chat/' + id,
        method: 'PUT',
        data: {
          message: $('#').val()
        },
        success: (response) => {
          console.log('send message is ok')
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
    })
  }

  function _removeMsg () {
    require.ensure([], (require) => {
      ajaxApi({
        url: host() + '/chat/' + id,
        method: 'DELETE',
        success: (response) => {
          console.log('remove message is ok')
        },
        error: (xhr) => {
          errorNotice(xhr.responseJSON, 'show')
        }
      })
    })
  }

  function Events () {
    if (localStorage.getItem('newChat')) {
      _startChat()
    }
  }

  return {
    Events: Events
  }
}
