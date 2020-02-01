(function () {
  window.setWindowHeight();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(window.setWindowHeight, 10);
  });
})();
