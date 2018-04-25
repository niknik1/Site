import { sleep } from './coreFunc.es6'

module.exports = () => {
  let parentBtnContent
  let preloader = ''

  function wallPreloader (status) {
    if (status) {
      $('.wall .preloader-item').show()
      $('.wall-list').addClass('is-loading')
    } else {
      setTimeout(() => {
        $('.wall .preloader-item').hide()
        $('.wall-list').removeClass('is-loading')
      }, 750)
    }
  }

  function btnPreloader (btn, status) {
    if (['', null, undefined].indexOf(btn) >= 0) { return false }
    if (['', null, undefined].indexOf(status) >= 0) { return false }

    switch (status) {
      case 'show':
        parentBtnContent = $(btn).text()
        $(btn).html(preloader)

        break
      case 'hide':
        $(btn).html(parentBtnContent)

        console.log(parentBtnContent)

        break
    }
  }

  // Change Login form to Registration and back
  function changeAuthForm (callback) {
    let emailField = $('.user-email-f')
    let actionBtn = $('.btn-signin')
    let linkBtn = $('.js-linkBtn')
    let form = $('.form-signin')
    let formStatus = form.attr('data-type')

    // Hide form content
    form.animate({opacity: 0}, 200)

    sleep(200)

    // Change form
    switch (formStatus) {
      case 'login':
        emailField.show()
        emailField.find('input').attr('data-validate', 'email')
          .attr('data-validate-func', 'required')
          .attr('data-validate-hint', 'This field can not be empty!')
          .attr('data-validate-hint-position', 'right')
        $('.forgot-password').hide()
        actionBtn.text('Registration')
        actionBtn.addClass('js-register').removeClass('js-login')
        linkBtn.text('Return to login')
        $('.form-signin').attr('data-type', 'registration')

        break
      case 'registration':
        emailField.hide()
        emailField.find('input').removeAttr('data-validate')
          .removeAttr('data-validate-func')
          .removeAttr('data-validate-hint')
          .removeAttr('data-validate-hint-position')
        $('.forgot-password').show()
        actionBtn.text('Sign In')
        actionBtn.removeClass('js-register').addClass('js-login')
        linkBtn.text('А тута можно зарегаться')
        $('.form-signin').attr('data-type', 'login')

        break
    }

    if (callback) {
      $('.form-signin')[0].reset()
    }

    // Show form content
    form.animate({opacity: 1}, 200)
  }

  return {
    wall: wallPreloader,
    btn: btnPreloader,
    changeAuthForm: changeAuthForm
  }
}
