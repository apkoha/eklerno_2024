import ECLAIRS from "../eclairs.json" with { type: "json" };
import { cart } from "./main.js";

const createCartCards = (eclair) => {
  const cartList = document.querySelector("cart-popup__list");

  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-popup__item");
  cartItem.innerHTML = `
  <img
  class="cart-popup__img"
  src="${eclair.urlToImages[0]}"
  alt=""
  width="121"
  height="107"
  />
  <p class="cart-popup__text">${eclair.title}</p>
  `;

  cartList.append(cartItem);
};

export const getAddedEclairs = (ECLAIRS) => {
  for (const eclair of ECLAIRS) {
    console.log("eclair: ", eclair);
    console.log(cart);
    // for (let i = 0; i < cart.length; i++) {
    //   if (eclair.id == cart[i].id) {
    //     createCartCards(eclair);
    //   }
    // }
  }
};

// getAddedEclairs();
