const createSwiperReviewCard = (review) => {
  const reviewSwiperWrapper = document.querySelector(".review__swiper-wrapper");

  const swiperSlideContainer = document.createElement("div");
  swiperSlideContainer.classList.add("swiper-slide");
  reviewSwiperWrapper.append(swiperSlideContainer);

  const reviewImgContainer = document.createElement("div");
  reviewImgContainer.classList.add("review__img-container");
  reviewImgContainer.innerHTML = `
  <img
    class="review__slider-img"
    src="${review.profilePhoto[0]}"
    alt=""
    width="80"
    height="80"
  />`;

  swiperSlideContainer.append(reviewImgContainer);

  const reviewInfoContainer = document.createElement("div");
  reviewInfoContainer.classList.add("review__info-container");
  reviewInfoContainer.innerHTML = `
  <h3 class="review__slider-title">${review.accountName}</h3>
   <p class="review__slider-text">
     ${review.text}
   </p>`;

  // создание блока пагинации (буллетов)
  swiperSlideContainer.append(reviewInfoContainer);
  const reviewSlider = document.querySelector(".review__slider");
  const swiperPaginationContainer = document.createElement("div");
  swiperPaginationContainer.classList.add("swiper-pagination");
  swiperPaginationContainer.id = "review__swiper-pagination";
  reviewSlider.append(swiperPaginationContainer);
};

export const getReviewData = (REVIEWS) => {
  for (const review of REVIEWS) {
    createSwiperReviewCard(review);
  }
};
