//слайдер https://swiperjs.com/element
//https://youtu.be/ddbxsrGPRY0 - туториал

//настройки слайдера товаров(эклеры)
const swiper = new Swiper(".products__slider", {
  // отображение буллетов пагинации и возможность клика по ним
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // количесвто слайдов в блоке
  slidesPerView: 4,
  // отступ между слайдами
  spaceBetween: 18,

  //скорость перелистывания
  speed: 400,

  // настройка количества слайдов в зависимости от разрешения экрана
  breakpoints: {
    320: {
      slidesPerView: 1,
    },

    610: {
      slidesPerView: 2,
    },

    910: {
      slidesPerView: 3,
    },

    1200: {
      slidesPerView: 4,
    },
  },
});

//настройки слайдера отзывов
const swiperReview = new Swiper(".review__slider", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  slidesPerView: 3,
  spaceBetween: 16,
  speed: 400,

  breakpoints: {
    319: {
      slidesPerView: 1,
    },

    741: {
      slidesPerView: 2,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 28,
    },
  },
});
