import ECLAIRS from "../eclairs.json" with { type: "json" };
import REVIEWS from "../review.json" with { type: "json" };
import { createBestsellersList, getBestEclairs } from "./bestsellers.js";
import { getEclairsData } from "./products.js";
import { getReviewData } from "./review.js";

const init = () => {
  getEclairsData(ECLAIRS);
  createBestsellersList();
  getBestEclairs(ECLAIRS);
  getReviewData(REVIEWS);
};

init();

//Универсальная функция открытия/закрытия модалок
//в данном случаи popup subscribe.
const modalController = ({modal, btnOpen, btnClose}) => {
  const buttonsModal = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);
  
  const closeModal = event => {
    const target = event.target;
  
    if (target.closest(btnClose) || event.code === 'Escape'){
      modalElem.style.opacity = 0;
  
      setTimeout (() => {modalElem.style.visibility = "hidden";
      }, 300)
      
      window.removeEventListener('keydown', closeModal);
    };
  }

  const openModal = () => {
  modalElem.style.visibility = "visible";
  modalElem.style.opacity = 1
  window.addEventListener('keydown', closeModal);
}


//перебираем все кнопки с классом .modal__section и на каждую навешиваем слушатель
buttonsModal.forEach(button => {
  button.addEventListener("click", openModal)
})

modalElem.addEventListener("click", closeModal);
}

modalController({
  modal: ".subscribe__popup",
  btnOpen: ".subscribe__button",
  btnClose: ".subscribe-popup__close-button"
})

// открытие бургер навигации
const burger = document.querySelector(".burger");
const headerNavigation = document.querySelector(".header__nav");
const headerCloseButton = document.querySelector(".header__close-button");

burger.addEventListener("click", () => {
  headerCloseButton.classList.add("header__close-button--active");
  headerNavigation.classList.add("header__nav_active");
});

headerCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  headerNavigation.classList.remove("header__nav_active");
});

//закрытие бургера по клавише ESC
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    if (
      headerNavigation.classList.contains("header__nav_active")
    ) {
      e.preventDefault();
      headerNavigation.classList.remove("header__nav_active");
    }
  }
});

// закрытие бургер навигации при клике по ссылке в ней
const headerNav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".header__link, .footer__nav-link");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].onclick = function (e) {
    headerNav.classList.remove("header__nav_active");
  };
}

const checkboxes = document.querySelectorAll(".checkbox")
export const checkboxesChecked = document.querySelectorAll(".checkbox__input");
const swiperWrapperContainer = document.querySelector(".swiper-wrapper");

const editCheckboxChecked = () => {
  const target = event.target;
  if (!target.closest(".checkbox__input")) return;

  for (let i=0; i < checkboxes.length; i++) {
    for (let j=0; j < checkboxesChecked.length; j++) {
      if(checkboxesChecked[j].checked) {
        checkboxes[j].children[2].innerText = "Выбрано"
      } else {
        checkboxes[j].children[2].innerText = "Выбрать"
      }
    }
  }
}

const cartList = document.querySelector(".cart-popup__list");
const createCartCards = (eclair) => {

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

const cartTitle = document.querySelector(".cart-popup__title");

//отрисовка "Корзины"
const getAddedEclairs = () => {
  event.preventDefault();
  cartList.innerHTML="";

  if (cart.length === 0) {
    cartTitle.innerText="Пока ничего не выбрано :(";
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

//добавление в "Корзину"
const addToCart = () => {
  cart = [];
  localStorage.clear();
  
  for (let i=0; i < checkboxesChecked.length; i++) {
    if(checkboxesChecked[i].checked) {
      cart.push({"id":checkboxesChecked[i].dataset.id, "price":checkboxesChecked[i].dataset.price, "count":checkboxesChecked[i].dataset.count})
      //выше лишнее
      // localStorage.setItem("cartItems", JSON.stringify(cart));
    }
  }
  // const saveCard = JSON.parse(localStorage.getItem("cartItems"));
}

//отслеживание кликов на чекбоксах свайпера с эклерами
swiperWrapperContainer.addEventListener("change", editCheckboxChecked);
swiperWrapperContainer.addEventListener("change", addToCart);

//добавление эклера в корзину по клику на кнопку "купить"
const buyBtn = document.querySelector('.button__buy');
buyBtn.addEventListener("click", getAddedEclairs)

//значние и отрисовка первоначальной суммы товаров
const sumValueContainer = document.querySelector(".cart__sum-value");
let sumValue = 0;
sumValueContainer.innerText = sumValue;


// https://youtu.be/pIgyoL5FjgI
const changelAmount = () => {
 const target = event.target;
 event.preventDefault();
 let counter;

 if (target.classList.contains("count__plus-btn") || target.classList.contains("count__minus-btn")) {
   const counterItemContainer = target.closest(".cart__count") 
   counter = counterItemContainer.querySelector(".cart__count-container");
 };

 if (target.classList.contains("count__plus-btn")) {
  console.log("нажал на плюс");
  counter.innerText = ++counter.innerText;
 }

 if (target.classList.contains("count__minus-btn")) {
  console.log("нажал на минус");
 
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

cartList.addEventListener("click", changelAmount);

//при удалении всех товаров в корзине выводит надпись.
const toggleCartStatus = () => {
  if (cartList.children.length === 0) {
    cartTitle.innerText = "Корзина пуста";
  }
}

const calcCartPrice = () => {
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