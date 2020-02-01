(function () {
  function loadHandler() {
    var preloader = document.querySelector('.js-preloader');
    document.querySelector('body').removeAttribute('style');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.addEventListener('transitionend', disablePreloader);

      function disablePreloader() {
        preloader.style.display = 'none';
        // - preloader.removeAttribute('style');
        preloader.removeEventListener('transitionend', disablePreloader);
        window.removeEventListener('load', loadHandler);
      }
    }
  }
  window.addEventListener('load', loadHandler);
})();
