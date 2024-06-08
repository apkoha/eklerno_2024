//плавный скролл до блока с id совпадающим с data-attribute ссылки в навигации.
//превентдефаулт позволяет оставить атрибут href для ссылок. Чтобы продолжало работать выделение через tab
//и на случай отключения скрипта.
const navLinks = document.querySelectorAll(".header__link, .footer__nav-link");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].onclick = function (e) {
    e.preventDefault();
    document
      .getElementById(navLinks[i].getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
    navigation.classList.remove("header__nav_active");
  };
}

const buttonHowMake = document.querySelector(".hero__button-how");
const howMakeBlock = document.getElementById("how");

buttonHowMake.addEventListener("click", (e) => {
  howMakeBlock.scrollIntoView({ behavior: "smooth" });
});

const heroBuyButton = document.querySelector(".hero__button-buy");
const productsBlock = document.getElementById("products");

heroBuyButton.addEventListener("click", (e) => {
  productsBlock.scrollIntoView({ behavior: "smooth" });
});

const buttonScrollDown = document.querySelector(".hero__button-scroll");

buttonScrollDown.addEventListener("click", (e) => {
  productsBlock.scrollIntoView({ behavior: "smooth" });
});

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

//закрытие popup subscribe, popup order, бургер навигации
const subscribeButton = document.querySelector(".subscribe__button");
const subscribeCloseButton = document.querySelector(
  ".subscribe-popup__close-button"
);
const subscribePopup = document.querySelector(".subscribe__popup");

const sellersButton = document.querySelector(".sellers__button ");
const oderCloseButton = document.querySelector(".form__client_close-button");
const cartPopup = document.querySelector(".cart__popup");

//открытие бургер навигации
const burger = document.querySelector(".burger");
const navigation = document.querySelector(".header__nav");
const headerCloseButton = document.querySelector(".header__close-button");

burger.addEventListener("click", () => {
  headerCloseButton.classList.add("header__close-button--active");
  navigation.classList.add("header__nav_active");
});

headerCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  navigation.classList.remove("header__nav_active");
});

subscribeButton.addEventListener("click", (e) => {
  e.preventDefault();
  subscribePopup.classList.add("show__popup");
});

subscribeCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  subscribePopup.classList.remove("show__popup");
});

sellersButton.addEventListener("click", (e) => {
  e.preventDefault();
  cartPopup.classList.add("show__popup");
});

oderCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  cartPopup.classList.remove("show__popup");
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    if (
      subscribePopup.classList.contains("show__popup") ||
      cartPopup.classList.contains("show__popup") ||
      navigation.classList.contains("header__nav_active")
    ) {
      e.preventDefault();
      subscribePopup.classList.remove("show__popup");
      cartPopup.classList.remove("show__popup");
      navigation.classList.remove("header__nav_active");
    }
  }
});
