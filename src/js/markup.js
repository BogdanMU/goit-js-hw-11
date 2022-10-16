
export function createMarkup(data) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = data;
  return `<div class="photo-card">
  <a class="photo-card__link" href="${largeImageURL}"><img class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="card-info-bar">
    <p class="card-description">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="card-description">
      <b>Views</b>
      ${views}
    </p>
    <p class="card-description">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="card-description">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
}