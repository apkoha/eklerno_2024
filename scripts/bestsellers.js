import ECLAIRS from "../eclairs.json" with { type: "json" };
import { calcCartPrice, cartList, createCartCards, emptyCartText } from "./cart.js";

//создание элемента ul для карточек "хитов продаж"
export const createBestsellersList = () => {
  const bestsellersInfoContainer = document.querySelector(".bestsellers__info");

  const bestsellersList = document.createElement("ul");
  bestsellersList.classList.add("bestsellers__list");
  bestsellersInfoContainer.before(bestsellersList);
};

//шаблон карточки "хитов продаж", элемент li
const createBestsellersCard = (bestEclair) => {
  const bestsellersList = document.querySelector(".bestsellers__list");

  const bestsellersItem = document.createElement("li");
  bestsellersItem.classList.add("bestsellers__item");
  bestsellersItem.innerHTML = `
<img
  class="bestsellers__item-img"
  src="${bestEclair.urlToImages[1]}"
  alt=""
  width="368"
  height="464"
/>`;
  bestsellersList.append(bestsellersItem);
};

//отрисовка товаров из массива ECLAIRS со свойством isBestSeller
export const getBestEclairs = (ECLAIRS) => {
  for (const bestEclair of ECLAIRS) {
    if (bestEclair.isBestSeller) {
      createBestsellersCard(bestEclair);
    }
  }
};

//добавление "хитов продаж" в корзину с предварительной очисткой и подсчётом суммы
export const buyBestEclairs = () => {
  emptyCartText.innerText = "";
  cartList.innerHTML= "";

  for (const bestEclair of ECLAIRS) {
    if (bestEclair.isBestSeller) {
      createCartCards(bestEclair);
      calcCartPrice();
    }
  }
};
