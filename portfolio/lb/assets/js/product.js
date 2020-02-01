(function () {

  $('.js-scroll-to').click(function (evt) {
    evt.preventDefault();
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    $('html, body').animate({ scrollTop: destination }, 800);
    return false;
  });

  var isProductSwipersWide;

  var productThumbs = document.querySelector(".product-slider__thumbs");
  var productThumbsWrapper = productThumbs.querySelector('.swiper-wrapper');
  var productThumbsSlides = productThumbs.querySelectorAll('.product-thumb');

  var productPhotos = document.querySelector(".product-slider__photos");
  var productPhotosWrapper = productPhotos.querySelector('.swiper-wrapper');
  var productPhotosSlides = productPhotos.querySelectorAll('.product-photo');

  var productZoom = document.querySelector(".product-zoom");
  var productZoomWrapper = productZoom.querySelector('.swiper-wrapper');
  var productZoomSlides = productZoom.querySelectorAll('.product-photo-full');

  var initProductSwipersMob = function () {
    productThumbs = new Swiper('.product-slider__thumbs', {
      slideClass: 'product-thumb',
      spaceBetween: 3,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    productPhotos = new Swiper('.product-slider__photos', {
      slideClass: 'product-photo',
      effect: 'fade',
      navigation: {
        nextEl: '#product-btn-next',
        prevEl: '#product-btn-prev',
      },
      thumbs: {
        swiper: productThumbs
      }
    });

    isProductSwipersWide = false;
  };

  var initProductSwipersWide = function () {
    productThumbs = new Swiper('.product-slider__thumbs', {
      slideClass: 'product-thumb',
      direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    productPhotos = new Swiper('.product-slider__photos', {
      slideClass: 'product-photo',
      effect: 'fade',
      navigation: {
        nextEl: '#product-btn-next',
        prevEl: '#product-btn-prev',
      },
      thumbs: {
        swiper: productThumbs
      }
    });

    isProductSwipersWide = true;
  };

  var initProductZoomSwiper = function (slideNumber) {

    productZoom = new Swiper('.product-zoom', {
      slideClass: 'product-photo-full',
      initialSlide: slideNumber,
      zoom: true,
      navigation: {
        nextEl: '#product-zoom-btn-next',
        prevEl: '#product-zoom-btn-prev',
      }
    });
  };
  
  var destroyProductZoomSwiper = function() {
    productZoom.destroy();
    productZoomWrapper.removeAttribute('style');
    productZoomSlides.forEach(function (elem) {
      elem.removeAttribute('style');
    });
  };

  $('#product-btn-zoom').click(function() {
    $('.product-slider-modal').addClass('product-slider-modal--active');
    initProductZoomSwiper(productPhotos.activeIndex);
    $('#modal-btn-zoom').on("click",function() {
      productZoom.zoom.toggle();
    });
  });

  $('#slider-modal-btn-close').click(function() {
    $('.product-slider-modal').removeClass('product-slider-modal--active');
    destroyProductZoomSwiper();
    $('#modal-btn-zoom').off("click");
  });

  var destroyProductSwipers = function() {
    productPhotos.destroy();
    productThumbs.destroy();
    productPhotosWrapper.removeAttribute('style');
    productThumbsWrapper.removeAttribute('style');
    productPhotosSlides.forEach(function (elem) {
      elem.removeAttribute('style');
    });
    productThumbsSlides.forEach(function (elem) {
      elem.removeAttribute('style');
    });
    isProductSwipersWide = undefined;
  };

  var processResize = function() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (!isProductSwipersWide) {
        destroyProductSwipers();
        initProductSwipersWide();
      }
    } else {
      if (isProductSwipersWide) {
        destroyProductSwipers();
        initProductSwipersMob();
      }
    }
  };

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(processResize, 10);
  });

  if (window.matchMedia('(min-width: 768px)').matches) {
    initProductSwipersWide();
  } else {
    initProductSwipersMob();
  }

  $('#add-cart-close').click(function() {
    $('.modal--add-cart').removeClass('modal--active');
  });
})();
