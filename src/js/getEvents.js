import { COUNTRIES_LIST } from './modules/countriesList';
import { countriesListMurkup } from './templates/countriesListMurkup';
import { getEvents } from './modules/getAPI';
// --------------------------------------------

const refSeachEventsInputs = document.querySelector('.js-search-form');
console.dir(refSeachEventsInputs);
const refSearchFormInput = document.querySelector('.js-countries');

refSeachEventsInputs.addEventListener('input', onSeachEventsInput);

refSearchFormInput.insertAdjacentHTML(
  'beforeend',
  countriesListMurkup(COUNTRIES_LIST)
);

getEvents();

function onSeachEventsInput(e) {
  console.log(e.target);
}
