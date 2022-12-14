import Notiflix from 'notiflix';

export const onSucces = (totalHits) => Notiflix.Notify.success(`Found ${totalHits} images!`);

export const onError = () => Notiflix.Notify.failure('Something went wrong! Please retry');

export const onNoMatches = () => Notiflix.Notify.failure(
        'There are no images matching your search query. Please try again.'
);
      
export const endOfQuery = () =>  Notiflix.Notify.info(
      "You are close to the end of search query"
);
    
export const onEmptyQuery = () => Notiflix.Notify.failure('Enter something to start search!');