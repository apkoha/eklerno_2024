import ECLAIRS from "../eclairs.json" with { type: "json" };
import REVIEWS from "../review.json" with { type: "json" };
import { buyBestEclairs, createBestsellersList, getBestEclairs } from "./bestsellers.js";
import { addToCart, cartList, changelAmount, getAddedEclairs } from "./cart.js";
import {  getEclairsData } from "./products.js";
import { getReviewData } from "./review.js";

const init = () => {
  getEclairsData(ECLAIRS);
  createBestsellersList();
  getBestEclairs(ECLAIRS);
  getReviewData(REVIEWS);
};

init();

const checkboxes = document.querySelectorAll(".checkbox");
export const checkboxesChecked = document.querySelectorAll(".checkbox__input");
const swiperWrapperContainer = document.querySelector(".swiper-wrapper");

//изменение надписи в чекбоксе в зависимости от состояния
//!!! не работает вне main.js !!!
const editCheckboxChecked = () => {
  const target = event.target;
  
  if (!target.closest(".checkbox__input")) return;

  for (let i = 0; i < checkboxes.length; i++) {
    for (let j = 0; j < checkboxesChecked.length; j++) {
      if (checkboxesChecked[j].checked) {
        checkboxes[j].children[2].innerText = "Выбрано";
      } else {
        checkboxes[j].children[2].innerText = "Выбрать";
      }
    }
  }
};

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

//отслеживание кликов на чекбоксах свайпера с эклерами
swiperWrapperContainer.addEventListener("change", editCheckboxChecked);
swiperWrapperContainer.addEventListener("change", addToCart);

//добавление эклера в корзину по клику на кнопку "купить"
const buyBtn = document.querySelector('.button__buy');
buyBtn.addEventListener("click", getAddedEclairs)

//изменение списка товаров корзине: добавление/удаление, запуск подсчёта суммы
cartList.addEventListener("click", changelAmount);

//добавление "хитов продаж" в корзину по клику на кнопку "bestsellers__button"
const buyBestsellers = document.querySelector(".bestsellers__button");
buyBestsellers.addEventListener ("click", buyBestEclairs)