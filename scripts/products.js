// создание элемента слайдера и карточки эклера в нём
// по элементам массива ECLAIRS, полученных циклом for of в функции "getEclairsData"
const createSwiperProductCard = (eclair) => {
  const swiperWrapperContainer = document.querySelector(".swiper-wrapper");

  const swiperSlideContainer = document.createElement("div");
  swiperSlideContainer.classList.add("swiper-slide");
  swiperWrapperContainer.append(swiperSlideContainer);

  const productContainer = document.createElement("div");
  productContainer.classList.add("products__item");

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
  <label class="checkbox style-h">
    <input class="checkbox__input" type="checkbox" data-id="${eclair.id}"/>
    <div class="checkbox__checkmark"></div>
    <div class="products__button button--orange checkbox__body">Выбрать</div>
  </label>
  `;

  swiperSlideContainer.append(productContainer);

  // создание блока пагинации (буллетов)
  const productsSlider = document.querySelector(".products__slider");
  const swiperPaginationContainer = document.createElement("div");
  swiperPaginationContainer.classList.add("swiper-pagination");
  swiperPaginationContainer.id = "products__swiper-pagination";
  productsSlider.append(swiperPaginationContainer);
};

//для каждого элемента массива ECLAIRS выполни функцию createSwiperProductCard
export const getEclairsData = (ECLAIRS) => {
  for (const eclair of ECLAIRS) {
    createSwiperProductCard(eclair);
  }
};
