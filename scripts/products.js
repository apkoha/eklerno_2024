// создание элемента слайдера и карточки эклера в нём
// по элементам массива ECLAIRS, полученных циклом for of в функции "getEclairsData"
const createSwiperProductCard = (eclair) => {
  const swiperWrapperContainer = document.querySelector(".swiper-wrapper");

  const swiperSlideContainer = document.createElement("div");
  swiperSlideContainer.classList.add("swiper-slide");
  swiperWrapperContainer.append(swiperSlideContainer);

  const productContainer = document.createElement("div");
  productContainer.classList.add("products__item");
  swiperSlideContainer.append(productContainer);

  productContainer.innerHTML = `
  <img
  class="products__item-img"
  src="${eclair.urlToImages[0]}"
  alt=""
  width="270"
  height="230"
  />
  <h3 class="products__item-title">${eclair.title}</h3>
  <p class="products__item-text">${eclair.description}</p>
  <div class="products__price">
  <p class="products__price-text">${eclair.price} ₽</p>
  </div>
  `;

  swiperSlideContainer.append(productContainer);
};

//для каждого элемента массива ECLAIRS выполни функцию createSwiperProductCard
export const getEclairsData = (ECLAIRS) => {
  for (const eclair of ECLAIRS) {
    createSwiperProductCard(eclair);
  }
};

// создание блока пагинации (буллетов)
export const createPaginationContainer = () => {
  const productsSlider = document.querySelector(".products__slider");

  const swiperPaginationContainer = document.createElement("div");
  swiperPaginationContainer.classList.add("swiper-pagination");
  swiperPaginationContainer.id = "swiper-pagination";
  productsSlider.append(swiperPaginationContainer);
};
