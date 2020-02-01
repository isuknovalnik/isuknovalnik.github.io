(function () {
  $('.header__nav-btn').click(function(evt) {
    evt.preventDefault();
    $('.header__nav-btn').toggleClass('header__nav-btn--active');
    $('.header-modal').toggleClass('header-modal--active');
    $('.header').toggleClass('header--active-nav');
    $('body').toggleClass('header-modal-active');
  });

  window.setWindowHeight = function() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  var removeError = function (errorWrapper, errorInput) {
    errorInput.addEventListener('blur', function () {
      if (errorWrapper.classList.contains("error-input")) {
        errorWrapper.classList.remove("error-input");
      }
    });
  };
    
  var showError = function (errorWrappers, errorInputs, submitBtn) {
    submitBtn.addEventListener('click', function (event) {
      for (var i = 0; i < errorInputs.length; i++) {
        var validity = errorInputs[i].validity;
        if (validity.valid) {
          errorWrappers[i].classList.remove("error-input");
        } else {
          errorWrappers[i].classList.add("error-input");
          event.preventDefault();
        }
      }
    });

    for (var j = 0; j < errorInputs.length; j++) {
      removeError(errorWrappers[j], errorInputs[j]);
    }
  };

  var errorInput = document.querySelector(".text-input__input");
  if (errorInput) {
    var forms = document.querySelectorAll(".js-form");
    for (var k = 0; k < forms.length; k++) {
      var errorWrappers = forms[k].querySelectorAll(".text-input");
      var errorInputs = forms[k].querySelectorAll(".text-input__input");
      var submitBtn = forms[k].querySelector(".js-submit");

      showError(errorWrappers, errorInputs, submitBtn);
    }
  }

})();