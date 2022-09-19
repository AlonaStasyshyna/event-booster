import { getEvents } from '../modules/getAPI';
import { createEventCard } from './createEventCard';

const paginationBarRef = document.querySelector('.pagination__wripper');

const markup = {
  number(n, isActive = false) {
    return /*html*/ `<li
      class="pagination__button ${isActive ? 'pagination__button--active' : ''}"
      data-page="${n}"
      data-type="number"
    >
      <span>${n}</span>
    </li>`;
  },
  dots() {
    return /*html*/ `<li 
        class=pagination__button pagination__button_dots"
        data-type="dots"> 
      <span>...</span>
    </li>`;
  },
};
let currentPage = 1;
const listOfEl = document.querySelector('.events__cards');
const searchInputEl = document.querySelector('.search-form__input');
const searchCountryEl = document.querySelector('.js-countries');

paginationBarRef.addEventListener('click', onPaginationBarClick);

async function onPaginationBarClick(event) {
  if (event.target.dataset.type !== 'number') return;
  currentPage = event.target.dataset.page;
  listOfEl.innerHTML = '';

  const result = await getEvents(searchInputEl.value, searchCountryEl.value);
  const events = result.data._embedded.events;
  const totalPages = result.data.page.totalPages;

  events.forEach(e => (listOfEl.innerHTML += createEventCard(e)));
  renderPaginationBar(totalPages, Number(currentPage));
}

export function renderPaginationBar(totalPages, cPage) {
  let toInsert = '';
  let pageBefore = cPage - 2;
  let pageAfter = cPage + 2;

  if (totalPages >= 500) totalPages = 500;

  //Отрисовка числа 1 и ... после неё, если надо
  if (cPage > 2) {
    toInsert += markup.number(1, false);
    if (cPage > 4) {
      toInsert += markup.dots();
    }
  }

  for (let i = pageBefore; i <= pageAfter; i++) {
    if (i > totalPages) {
      continue;
    }
    if (i < 0) {
      continue;
    }
    if (i === 0) {
      i += 1;
    }
    //Insane hardcoding
    if (i === 1) {
      if (cPage === 3) {
        i++;
      }
    }
    //Insane hardcoding
    if (i === totalPages) {
      if (cPage === totalPages - 2) {
        continue;
      }
    }
    if (i != cPage) {
      toInsert += markup.number(i);
    } else {
      toInsert += markup.number(i, true);
    }
  }

  //Отрисовка числа последней страницы и ... до, если надо
  if (cPage < totalPages - 1) {
    if (cPage < totalPages - 3) {
      toInsert += markup.dots();
    }
    toInsert += markup.number(totalPages, false);
  }

  paginationBarRef.innerHTML = toInsert;
}