import * as notifications from './notifications'
import axios from 'axios';


export let page = 1;
export let query = null;

const URL = 'https://pixabay.com/api/';
const KEY = '30634050-07972830b8543a44b224b68c4';
const parameters = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

export async function getPictures(searchQuery) {
  if (searchQuery !== query) {
    page = 1;
    query = searchQuery;
  }
  try {
    const response = await axios.get(
      `${URL}${parameters}&q=${query}&page=${page}`
    );
    page += 1;
    return response.data;
  } catch (error) {
    notifications.onError()
    console.log(error);
  }
}