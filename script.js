const buttonScrollDown = document.querySelector(".hero__button-scroll");
const compoundBlock = document.getElementById("compound");

buttonScrollDown.addEventListener("click", (e) => {
  compoundBlock.scrollIntoView({ behavior: "smooth" });
});

//плавный скролл до блока с id совпадающим с data-attribute ссылки в навигации.
//превентдефаулт позволяет оставить атрибут href для ссылок. Чтобы продожало работать выделение через tab
//и на случай отключения скрипта.
const navLinks = document.querySelectorAll(".header__link, .footer__nav-link");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].onclick = function (e) {
    e.preventDefault();
    document
      .getElementById(navLinks[i].getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
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

//popup subscribe
const subscribeButton = document.querySelector(".subscribe__button");
const subscribeCloseButton = document.querySelector(
  ".subscribe-popup__close-button"
);
const subscribePopup = document.querySelector(".subscribe-popup");

subscribeButton.addEventListener("click", (e) => {
  e.preventDefault();
  subscribePopup.classList.add("show__popup");
});

subscribeCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  subscribePopup.classList.remove("show__popup");
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    if (subscribePopup.classList.contains("show__popup")) {
      e.preventDefault();
      subscribePopup.classList.remove("show__popup");
    }
  }
});

//включение кнопки "отправить" при заполнении input
// const subscribeForm = document.querySelector(".subscribe__form");
// const subscribeInput = document.querySelector(
//   ".subscribe-popup__second-line input"
// );
// const subscribeSubmitButton = document.querySelector(
//   ".subscribe-popup__button"
// );
// const subscribeEmail = subscribeInput.value;

// subscribeForm.addEventListener("submit", (e) => {
//   if (!subscribeEmail) {
//     alert("Пожалуйста, введите email");
//     return;
//   } else {
//     subscribeSubmitButton.disabled === false;
//   }
//   subscribeForm.submit();
// });
