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

let event = '';
let country = '';
let currentPage = 1;
let currentEvents;

refSearchEventsInputs.addEventListener(
  'input',
  debounce(onSearchEventsInput, 1000)
);

refSearchFormInput.insertAdjacentHTML(
  'beforeend',
  countriesListMurkup(COUNTRIES_LIST)
);

getEvents().then(data => {
  const events = data.data._embedded.events;
  currentEvents = events;
  const totalPagesOfEl = data.data.page.totalPages;

  renderPaginationBar(totalPagesOfEl, currentPage);

  events.forEach((e, i) => (refEventsGallery.innerHTML += createEventCard(e, i)));
});

function onSearchEventsInput(e) {
  if (e.target.name === 'event') {
    event = e.target.value;
  }

  if (e.target.name === 'country') {
    country = e.target.value;
  }

  getEvents(event, country).then(data => {
    if (!data.data.page.totalElements) {
      return refEventsGallery.innerHTML = `<h2 class="events__err">Nothing found :c</h2>`
    }

    refEventsGallery.innerHTML = '';
    const events = data.data._embedded.events;
    const totalPagesOfEl = data.data.page.totalPages;

    currentEvents = events;

    renderPaginationBar(totalPagesOfEl, currentPage);

    events.forEach((e, i) => (refEventsGallery.innerHTML += createEventCard(e, i)));
  });
}

// -----------------Color control on SearchFormInput--------------
refSearchFormInput.addEventListener('click', onCountryInputClick);
function onCountryInputClick(e) {
  if (e.target.value) {
    refSearchFormInput.classList.add('search-form__input--white');
  }
  if (!e.target.value) {
    refSearchFormInput.classList.remove('search-form__input--white');
  }
}
