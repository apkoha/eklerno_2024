import ECLAIRS from "../eclairs.json" with { type: "json" };
import REVIEWS from "../review.json" with { type: "json" };
import * as say from './modalControll.js';
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

//отслеживание кликов на чекбоксах свайпера с эклерами
swiperWrapperContainer.addEventListener("change", editCheckboxChecked);
swiperWrapperContainer.addEventListener("change", addToCart);

//добавление эклера в корзину по клику на кнопку "в корзину"
const buyBtn = document.querySelector('.button__buy');
buyBtn.addEventListener("click", getAddedEclairs)

//изменение списка товаров корзине: добавление/удаление, запуск подсчёта суммы
cartList.addEventListener("click", changelAmount);

//добавление "хитов продаж" в корзину по клику на кнопку "bestsellers__button"
const buyBestsellers = document.querySelector(".bestsellers__button");
buyBestsellers.addEventListener ("click", buyBestEclairs)