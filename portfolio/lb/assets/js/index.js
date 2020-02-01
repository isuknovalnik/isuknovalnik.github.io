(function () {
  window.setWindowHeight();

  var fullscreenSwiper = document.querySelector(".fullscreen-swiper");
  var fullscreenWrapper = fullscreenSwiper.querySelector('.fullscreen-wrapper');
  var fullscreenSlides = fullscreenSwiper.querySelectorAll('.swiper-screen');
  var isFullscreenSwiper = false;
  var mobScrollTimer;
  var whiteHeaderHeight = window.matchMedia('(min-width: 768px)').matches ? 100 : 40;
  var isHeaderWhite = false;

  var setHeaderBack = function () {
    if($(this).scrollTop() > whiteHeaderHeight) {
      if (!isHeaderWhite) {
        $('.header').addClass('header--white-back');
        isHeaderWhite = true;
      }
    } else {
      if (isHeaderWhite) {
        $('.header').removeClass('header--white-back');
        isHeaderWhite = false;
      }
    }
  };

  var mobScrollHandler = function () {
    clearTimeout(mobScrollTimer);
    mobScrollTimer = setTimeout(setHeaderBack, 30);
  };

  var mainNavHandler = function (evt) {
    evt.preventDefault();
    $('.header__nav-btn').removeClass('header__nav-btn--active');
    $('.header-modal').removeClass('header-modal--active');
    $('.header').removeClass('header--active-nav');
    $('body').removeClass('header-modal-active');
    var elementClick = $(this).attr("href");
    if (isFullscreenSwiper) {
      var screenElement = $(elementClick);
      var screenNumber = $('.swiper-screen').index(screenElement);
      fullscreenSwiper.slideTo(screenNumber, 800);
    } else {
      var destination = $(elementClick).offset().top;
      $('html, body').animate({ scrollTop: destination }, 800);
    }
    return false;
  };

  var animEndEv = 'webkitAnimationEnd animationend';
  var swiperWow = function () {
    var currentSlide = $(fullscreenSwiper.slides[fullscreenSwiper.activeIndex]);
    var elems = currentSlide.find(".swiper-wow")
    elems.each(function() {
      var $this = $(this);
      var animationType = $this.data('animation');
      $this.removeAttr("style");
      $this.addClass("animated");
      $this.addClass(animationType).on(animEndEv, function() {
          $this.removeClass(animationType);
          $this.removeClass("animated swiper-wow");
        });
    });
  };

  var initFullscreenSwiper = function () {
    $('.swiper-wow').attr("style", "visibility: hidden;");
    $('.fullscreen-swiper').addClass('swiper-container');
    fullscreenSwiper = new Swiper ('.fullscreen-swiper', {
      slideClass: 'swiper-screen',
      wrapperClass: 'fullscreen-wrapper',
      direction: 'vertical',
      loop: false,
      autoplay: false,
      spaceBetween: 0,
      speed: 800,
      preventInteractionOnTransition: true,
      simulateTouch: false,
      mousewheel: true,
      sensitivity: 1.5,
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: '.fullscreen-pagination',
        clickable: true,
      },
      hashNavigation: {
        watchState: true,
      },
    });
    fullscreenSwiper.on('slideChangeTransitionEnd', swiperWow);
    isFullscreenSwiper = true;
    swiperWow();
  };

  var destroyFullscreenSwiper = function() {
    fullscreenSwiper.destroy();
    fullscreenWrapper.removeAttribute('style');
    fullscreenSlides.forEach(function (elem) {
      elem.removeAttribute('style');
    });
    $('.fullscreen-swiper').removeClass('swiper-container');
    $('.swiper-wow').removeAttr('style');
    isFullscreenSwiper = false;
  };

  var initLookbookSwiper = function () {
    var lookbookSwiper = new Swiper ('.lookbook-slider__container', {
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: true,
      preloadImages: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      lazy: true,
      speed: 600,
      navigation: {
        nextEl: '#lookbook-btn-next',
        prevEl: '#lookbook-btn-prev',
      },
      breakpoints: {
        660: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1280: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },

    });
  };

  var processResize = function() {
    window.setWindowHeight();
    whiteHeaderHeight = window.matchMedia('(min-width: 768px)').matches ? 100 : 40;

    if (window.matchMedia('(min-width: 1024px)').matches) {
      if (!isFullscreenSwiper) {
        window.removeEventListener('scroll', mobScrollHandler);
        $('.header').removeClass('header--white-back');
        isHeaderWhite = false;
        initFullscreenSwiper();
      } else {
        fullscreenSwiper.update();
      }
    } else {
      if (isFullscreenSwiper) {
        destroyFullscreenSwiper();
        window.addEventListener('scroll', mobScrollHandler);
        if($(this).scrollTop() > whiteHeaderHeight) {
          $('.header').addClass('header--white-back');
          isHeaderWhite = true;
        }
      }
    }
  };

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(processResize, 10);
  });
  
  $('.js-scroll-to').click(mainNavHandler);
  if (window.matchMedia("(min-width: 1024px)").matches) {
    initFullscreenSwiper();
  } else {
    window.addEventListener('scroll', mobScrollHandler);
    if($(this).scrollTop() > whiteHeaderHeight) {
      $('.header').addClass('header--white-back');
      isHeaderWhite = true;
    }
  }
  initLookbookSwiper();

})();
