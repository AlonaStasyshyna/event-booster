import { COUNTRIES_LIST } from './modules/countriesList';
import { countriesListMurkup } from './templates/countriesListMurkup';
import { getEvents } from './modules/getAPI';
import { createEventCard } from './createEventCard';
import { renderPaginationBar } from './templates/pagination';
// --------------------------------------------
const eventsGallery = document.querySelector('.events__cards');
const refSearchEventsInputs = document.querySelector('.js-search-form');
const refSearchFormInput = document.querySelector('.js-countries');

refSearchEventsInputs.addEventListener('input', onSearchEventsInput);

refSearchFormInput.insertAdjacentHTML(
  'beforeend',
  countriesListMurkup(COUNTRIES_LIST)
);

getEvents('', 'US').then(data => {
  const events = data.data._embedded.events;
  const totalPagesOfEl = data.data.page.totalPages;
  
  renderPaginationBar(totalPagesOfEl, currentPage);

  events.forEach(e => eventsGallery.innerHTML += createEventCard(e));
});

let event = '';
let country = '';
let currentPage = 1;

function onSearchEventsInput(e) {
  eventsGallery.innerHTML = '';

  if (e.target.name === 'event') {
    event = e.target.value;
  };

  if (e.target.name === 'country') {
    country = e.target.value;
  };

  getEvents(event, country).then(data => {
    const events = data.data._embedded.events;
    const totalPagesOfEl = data.data.page.totalPages;
    
    renderPaginationBar(totalPagesOfEl, currentPage);

    events.forEach(e => eventsGallery.innerHTML += createEventCard(e));
  });
};