import ECLAIRS from "../eclairs.json" with { type: "json" };
import { checkboxesChecked } from "./main.js";

export const cartList = document.querySelector(".cart-popup__list");
export const emptyCartText = document.querySelector(".cart-popup__text");

export const createCartCards = (eclair) => {
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-popup__item");
  cartItem.innerHTML = `
    <div class="cart__item-container">
      <img
        class="cart-popup__img"
        src="${eclair.urlToImages[0]}"
        alt=""
        width="160"
        height="136"
      />
      <h3 class="cart__item-title">${eclair.title}</h3>
      <div class="cart__item__price">
        <p class="cart__price-text">${eclair.price} ₽</p>
      </div>
      <div class="cart__count">
        <button class="count__minus-btn count__btn" data-id="${eclair.id}">-</button>
        <div class="cart__count-container">${eclair.count}</div>
        <button class="count__plus-btn count__btn" data-id="${eclair.id}">+</button>
      </div>
    </div>
  `;

  cartList.append(cartItem);
};

//объявление "Корзины"
let cart = [];

//добавление в "Корзину"
export const addToCart = () => {
  cart = [];
    
  for (let i=0; i < checkboxesChecked.length; i++) {
    if(checkboxesChecked[i].checked) {
      cart.push({"id":checkboxesChecked[i].dataset.id})
    }
  }
}

//отрисовка "Корзины"
export const getAddedEclairs = () => {
  event.preventDefault();
  cartList.innerHTML = "";
  emptyCartText.innerText = "";

  if (cart.length === 0) {
    emptyCartText.innerText = "Пока ничего не выбрано :(";
    return;
  }

  for (const eclair of ECLAIRS) {
    for (let i = 0; i < cart.length; i++) {
      if (eclair.id == cart[i].id) {
        createCartCards(eclair);
        calcCartPrice();
      }
    }
  }
};

// https://youtu.be/pIgyoL5FjgI
export const changelAmount = () => {
 const target = event.target;
 event.preventDefault();
 let counter;

 if (target.classList.contains("count__plus-btn") || target.classList.contains("count__minus-btn")) {
   const counterItemContainer = target.closest(".cart__count") 
   counter = counterItemContainer.querySelector(".cart__count-container");
 };

 if (target.classList.contains("count__plus-btn")) {
   counter.innerText = ++counter.innerText;
 }

 if (target.classList.contains("count__minus-btn")) {
 
  if (parseInt(counter.innerText) > 1) {
    counter.innerText = --counter.innerText;
    } else if (target.closest(".cart-popup__list") && parseInt(counter.innerText) === 1) {
      target.closest(".cart-popup__item").remove();
      toggleCartStatus();
      calcCartPrice();
    }
  }

  if (target.classList.contains("count__btn") && target.closest(".cart-popup__list")) {
    calcCartPrice();
  }
}

export const calcCartPrice = () => {
  const cartItems = document.querySelectorAll(".cart-popup__item");
  const totalPriceEl = document.querySelector(".cart__sum-value");

  let totalPrice = 0;

  cartItems.forEach( function (item) {
    const amountEl = item.querySelector(".cart__count-container")
    const priceEl = item.querySelector(".cart__price-text")
    const currenPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText)
    totalPrice += currenPrice;
  })

  totalPriceEl.innerText = totalPrice;
}

//при удалении всех товаров в корзине выводит надпись.
export const toggleCartStatus = () => {
  if (cartList.children.length === 0) {
    emptyCartText.innerText = "Корзина пуста";
  }
}


