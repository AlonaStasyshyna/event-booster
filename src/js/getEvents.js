import { COUNTRIES_LIST } from './modules/countriesList';
import { countriesListMarkup } from './templates/countriesListMarkup';
import { getEvents } from './modules/getAPI';
import { createEventCard } from './createEventCard';

const refEventsGallery = document.querySelector('.events__cards');
const refSearchEventsInputs = document.querySelector('.js-search-form');
const refSearchFormInput = document.querySelector('.js-countries');

let event = '';
let country = '';

function onSearchEventsInput(e) {
  refEventsGallery.innerHTML = '';

  if (e.target.name === 'event') {
    event = e.target.value;
  };

  if (e.target.name === 'country') {
    country = e.target.value;
  };

  getEvents(event, country).then(data => {
    const events = data.data._embedded.events;
    events.forEach(e => refEventsGallery.innerHTML += createEventCard(e));
  });
};

getEvents('', 'US').then(data => {
  const events = data.data._embedded.events;
  events.forEach(e => refEventsGallery.innerHTML += createEventCard(e));
});

refSearchEventsInputs.addEventListener('input', onSearchEventsInput);

refSearchFormInput.insertAdjacentHTML(
  'beforeend',
  countriesListMarkup(COUNTRIES_LIST)
);