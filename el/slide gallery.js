function MySliderBox1__init() {
  var swiper = new Swiper('.my-slider-box-1 .swiper-container', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    slidesPerView:1,
    spaceBetween:0,
    loop: false,
    navigation: {
      nextEl: '.my-slider-box-1 .my-slider-box-1__btn-right',
      prevEl: '.my-slider-box-1 .my-slider-box-1__btn-left',
    },
  });
}

MySliderBox1__init();

function MySliderBox2__init() {
  var swiper = new Swiper('.my-slider-box-2 .swiper-container');
}

MySliderBox2__init();

