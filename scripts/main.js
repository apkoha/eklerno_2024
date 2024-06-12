import ECLAIRS from "../eclairs.json" with { type: "json" };
import { createBestsellersList, getBestEclairs } from "./bestsellers.js";
import { getEclairsData, createPaginationContainer } from "./products.js";

const init = () => {
  getEclairsData(ECLAIRS);
  createPaginationContainer();
  createBestsellersList();
  getBestEclairs(ECLAIRS);
};

init();

//переворот карточек компонентов
const compoundCardsList = document.querySelector(".compound__list");
const compoundCardItems = document.querySelectorAll(".compound__item");

compoundCardsList.addEventListener("click", ({ target }) => {
  const card = target.closest(".compound__item");
  for (let i = 0; i < compoundCardItems.length; i++) {
    if (
      card.dataset.compound == compoundCardItems[i].id ||
      card.id == compoundCardItems[i].dataset.compound
    ) {
      compoundCardItems[i].classList.toggle("visually-hidden");
      card.classList.toggle("visually-hidden");
    }
  }
});

//Универсальная функция открытия/закрытия модалок
//в даннос случаи popup subscribe.
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

