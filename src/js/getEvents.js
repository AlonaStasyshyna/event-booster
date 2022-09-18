import { COUNTRIES_LIST } from './modules/countriesList';
import { countriesListMurkup } from './templates/countriesListMurkup';
import { createEventCard } from './templates/createEventCard';
import { getEvents } from './modules/getAPI';
import { renderPaginationBar } from './templates/pagination';
import debounce from 'lodash.debounce';
// --------------------------------------------
const refEventsGallery = document.querySelector('.events__cards');
const refSearchEventsInputs = document.querySelector('.js-search-form');
const refSearchFormInput = document.querySelector('.js-countries');

refSearchEventsInputs.addEventListener(
  'input',
  debounce(onSearchEventsInput, 1000)
);

refSearchFormInput.insertAdjacentHTML(
  'beforeend',
  countriesListMurkup(COUNTRIES_LIST)
);

getEvents('', 'US').then(data => {
  const events = data.data._embedded.events;
  const totalPagesOfEl = data.data.page.totalPages;

  renderPaginationBar(totalPagesOfEl, currentPage);

  events.forEach(e => (refEventsGallery.innerHTML += createEventCard(e)));
});

let event = '';
let country = '';
let currentPage = 1;

function onSearchEventsInput(e) {
  if (e.target.name === 'event') {
    event = e.target.value;
  }

  if (e.target.name === 'country') {
    country = e.target.value;
  }

  getEvents(event, country).then(data => {
    if (!data.data.page.totalElements) {
      return alert('Oops, there is no events');
    }

    refEventsGallery.innerHTML = '';
    const events = data.data._embedded.events;
    const totalPagesOfEl = data.data.page.totalPages;

    renderPaginationBar(totalPagesOfEl, currentPage);

    events.forEach(e => (refEventsGallery.innerHTML += createEventCard(e)));
  });
}
