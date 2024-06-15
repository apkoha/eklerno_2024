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
        <p class="products__price-text">${eclair.price} ₽</p>
      </div>
      <div class="cart__count">
        <button class="count__minus-btn count__btn">-</button>
        <div class="cart__count-container">1</div>
        <button class="count__plus-btn count__btn">+</button>
      </div>
    </div>
  `;

  cartList.append(cartItem);
};

let cart = [];

const getAddedEclairs = () => {
  event.preventDefault();
  cartList.innerHTML="";
  console.log('cart: ', cart);

  if (cart.length === 0) {
    cartList.innerHTML="Пока ничего не выбрано :(";
    return;
  }

  for (const eclair of ECLAIRS) {
    for (let i = 0; i < cart.length; i++) {
      if (eclair.id == cart[i].id) {
        createCartCards(eclair);
      }
    }
  }
};

const addToCart = () => {
  cart = [];
  localStorage.clear();
  
  for (let i=0; i < checkboxesChecked.length; i++) {
    if(checkboxesChecked[i].checked) {
      cart.push({"id":checkboxesChecked[i].dataset.id, "price":checkboxesChecked[i].dataset.price})
      localStorage.setItem("id", JSON.stringify(cart));
    }
  }
  // console.log('localStorage: ', localStorage);
  return cart;
}

swiperWrapperContainer.addEventListener("change", editCheckboxChecked);
swiperWrapperContainer.addEventListener("change", addToCart);

const buyBtn = document.querySelector('.button__buy');
buyBtn.addEventListener("click", getAddedEclairs)