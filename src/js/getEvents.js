import { COUNTRIES_LIST } from './modules/countriesList';
import { getEvents } from './modules/getAPI';
// --------------------------------------------
const refSeachEventsInputs = document.querySelector('.js-search-form');
console.dir(refSeachEventsInputs);

refSeachEventsInputs.addEventListener('input', onSeachEventsInput);

getEvents();

function onSeachEventsInput(e) {
  console.log(e.target);
}
