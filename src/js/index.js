import "../css/styles.css"
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import * as pixabay from './pixabayManipulations'
import * as notifications from './notifications'
import { refs } from "./refs";
import { createMarkup } from './markup'
import { throttle } from 'throttle-debounce';

let amountOfPages = 0

refs.formRef.addEventListener('submit', onSubmit);

const lightbox = new SimpleLightbox('.gallery a');

async function onSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (!searchQuery) {
    notifications.onEmptyQuery();
    return;
  }
  try {
    const searchData = await pixabay.getPictures(searchQuery);
      const { hits, totalHits } = searchData;
      amountOfPages = totalHits / 40 ;
    if (totalHits === 0) {
      notifications.onNoMatches()
      return;
    }
    notifications.onSucces(totalHits);
    const markup = hits.map(item => createMarkup(item)).join('');
    refs.galleryRef.innerHTML = markup
    if (totalHits > 40) {
        pixabay.page += 1;
        amountOfPages -= 1;
    }
      lightbox.refresh();
      window.addEventListener('scroll', throttle(500, handleInfiniteScroll) )
  } catch (error) {
    notifications.onError();
    console.log(error);
  }
}

async function onScrollLoad() {
    refs.loaderRef.classList.remove('hidden')
  const response = await pixabay.getPictures(pixabay.query);
    const { hits } = response; 
    const markup = hits.map(item => createMarkup(item)).join('');
    
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh(); 
  
    pixabay.page += 1;
    amountOfPages -=1
}



function handleInfiniteScroll() {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 150;
    
    if (amountOfPages < 0) {

        window.removeEventListener('scroll', throttle(500, handleInfiniteScroll))
        refs.loaderRef.classList.add('hidden')
        return
    }
      
    if (amountOfPages < 1) {
    notifications.endOfQuery()
    }
      
    
    if (endOfPage) {
        onScrollLoad();
        console.log('loaded');
        console.log('pages left:', amountOfPages);
        return
    }
    
};



// _.throttle(func, wait, options)

    
