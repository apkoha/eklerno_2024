//Универсальная функция открытия/закрытия модалок
const modalController = ({ modal, btnOpen, btnClose }) => {
  const buttonsModal = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  const closeModal = (event) => {
    const target = event.target;

    if (target.closest(btnClose) || event.code === "Escape") {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = "hidden";
        scrollController.enabledScroll();
      }, 300);

      window.removeEventListener("keydown", closeModal);
    }
  };

  const openModal = () => {
    modalElem.style.visibility = "visible";
    modalElem.style.opacity = 1;
    window.addEventListener("keydown", closeModal);
    scrollController.disabledScroll();
  };

  //перебираем все кнопки с классом .modal__section и на каждую навешиваем слушатель
  buttonsModal.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  modalElem.addEventListener("click", closeModal);
};

modalController({
  modal: ".subscribe__popup",
  btnOpen: ".subscribe__button",
  btnClose: ".subscribe-popup__close-button",
});

modalController({
  modal: ".cart__popup",
  btnOpen: ".button__buy",
  btnClose: ".form__client_close-button",
});

modalController({
  modal: ".cart__popup",
  btnOpen: ".bestsellers__button",
  btnClose: ".form__client_close-button",
});

//блокировка скролла при открытии модалок
const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${scrollController.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-right: ${window.innerWidth - document.body.offsetWidth};
    `;
    document.documentElement.style.scrollBehavior = "unset";
  },
  enabledScroll() {
    document.body.style.cssText = "";
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = "";
  },
};

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
    if (headerNavigation.classList.contains("header__nav_active")) {
      e.preventDefault();
      headerNavigation.classList.remove("header__nav_active");
    }
  }
});

// закрытие бургер навигации при клике по ссылке в ней
const headerNav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".header__link, .footer__nav-link");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", (e) => {
    headerNav.classList.remove("header__nav_active");
  });
}
