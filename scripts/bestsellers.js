export const createBestsellersList = () => {
  // const bestsellersListContainer = document.querySelector(
  //   ".bestsellers__list__container"
  // );

  const bestsellersInfoContainer = document.querySelector(".bestsellers__info");

  const bestsellersList = document.createElement("ul");
  bestsellersList.classList.add("bestsellers__list");
  bestsellersInfoContainer.before(bestsellersList);
};

const createBestsellersCard = (bestEclair) => {
  const bestsellersList = document.querySelector(".bestsellers__list");

  const bestsellersItem = document.createElement("li");
  bestsellersItem.classList.add("bestsellers__item");
  bestsellersItem.innerHTML = `
<img
  class="bestsellers__item-img"
  src="${bestEclair.urlToImages[1]}"
  alt=""
  width="368"
  height="464"
/>`;
  bestsellersList.append(bestsellersItem);
};

export const getBestEclairs = (ECLAIRS) => {
  for (const bestEclair of ECLAIRS) {
    if (bestEclair.isBestSeller === true) {
      createBestsellersCard(bestEclair);
    }
  }
};
