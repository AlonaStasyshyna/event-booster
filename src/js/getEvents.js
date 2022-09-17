import { COUNTRIES_LIST } from './modules/countriesList';
import { countriesListMurkup } from './templates/countriesListMurkup';
import { getEvents } from './modules/getAPI';
// --------------------------------------------

const refSeachEventsInputs = document.querySelector('.js-search-form');
const refSearchFormInput = document.querySelector('.js-countries');

refSeachEventsInputs.addEventListener('input', onSeachEventsInput);

refSearchFormInput.insertAdjacentHTML(
  'beforeend',
  countriesListMurkup(COUNTRIES_LIST)
);

getEvents();

let event = '';
let country = '';

function onSeachEventsInput(e) {
  if (e.target.name === 'event') {
    event = e.target.value;
  }
  if (e.target.name === 'country') {
    country = e.target.value;
  }

  getEvents(event, country).then(console.log);
}
