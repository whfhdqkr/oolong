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
    on: {
    slideChangeTransitionEnd: function () {
      document.querySelectorAll(".swiper-slide").forEach((slide) => {
        if (!slide.classList.contains("swiper-slide-active")) {
          slide.style.opacity = "0";
          slide.style.visibility = "hidden"; // ✅ 완전 숨김
        } else {
          slide.style.opacity = "1";
          slide.style.visibility = "visible";
        }
      });
    },
  },
  });
}

MySliderBox1__init();

function MySliderBox2__init() {
  var swiper = new Swiper('.my-slider-box-2 .swiper-container');
}

MySliderBox2__init();

