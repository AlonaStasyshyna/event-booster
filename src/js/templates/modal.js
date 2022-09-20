import { events } from '../getEvents';

const barcode = `
  <svg class="bar-code" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" id="bar_code">
    <path d="M3.22222 0.833496L0 0.833496L0 20.1668H3.22222L3.22222 0.833496Z" fill="#0E0E0E"></path>
    <path d="M11.3266 0.833496L8.10439 0.833496L8.10439 20.1668H11.3266L11.3266 0.833496Z" fill="#0E0E0E"></path>
    <path d="M16.2088 0.833496L12.9866 0.833496L12.9866 20.1668H16.2088L16.2088 0.833496Z" fill="#0E0E0E"></path>
    <path d="M28.9999 0.833496L24.2154 0.833496L24.2154 20.1668H28.9999L28.9999 0.833496Z" fill="#0E0E0E"></path>
    <path d="M6.44449 0.833496L4.88219 0.833496L4.88219 20.1668H6.44449L6.44449 0.833496Z" fill="#0E0E0E"></path>
    <path d="M19.3333 0.833496L17.771 0.833496L17.771 20.1668H19.3333L19.3333 0.833496Z" fill="#0E0E0E"></path>
    <path d="M22.5555 0.833496L20.9932 0.833496L20.9932 20.1668H22.5555L22.5555 0.833496Z" fill="#0E0E0E"></path>
  </svg>
`;

const refs = {
  openModalBtn: document.querySelector('[info-modal-open]'),
  closeModalBtn: document.querySelector('[info-modal-close]'),
  modal: document.querySelector('[info-modal]'),
  events: document.querySelector('.events__cards'),
  modalContent: document.querySelector('.modal-content'),
  modalContainer: document.querySelector('.modal-container'),
};
let typeOfTickets = '';

refs.events.addEventListener('click', e => {
  const target = e.path[2];
  if (target.tagName === 'LI') {
    generatePriceOfModalContent(events[target.id]);
    generateModalContent(events[target.id]);
    toggleModal();
  }
});

refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hide');
}

refs.modalContainer.addEventListener('click', e => {
  if (!e.target.closest('.modal')) {
    toggleModal();
  }
});

function generatePriceOfModalContent(event) {
  const arrOfPrices = event?.priceRanges;

  if (arrOfPrices) {
    return (typeOfTickets = arrOfPrices
      .map(oneType => {
        return `
                <div class="scan">
                    ${barcode}
                    <p class="info-text">${toUpperCaseFirstLetter(
                      oneType?.type
                    )}:
                    ${oneType?.min} - ${oneType?.max}
                    ${oneType?.currency}
                    </p>
                </div>
                <a class="buy-tickets-btn buy-tickets-link"
                href="${event?.url}"
                target="_blank">BUY TICKETS</a>
            `;
      })
      .join(''));
  }

  return (typeOfTickets = `
                <div class="scan">
                    ${barcode}
                    <p class="info-text">No price to show</p>
                </div>
                <button class="buy-tickets-btn--disabled">BUY TICKETS</button>
            `);
}

function generateModalContent(event) {
  refs.modalContent.innerHTML = `
   <div class="modal-modal">
    <img src="${
      event.images.find(e => e.height >= 400 && e.height <= 600).url
    }" class="elipse-img" alt="img">
    <div class="info-modal">
        <img class="modal-img" src="${
          event.images.find(e => e.height >= 400 && e.height <= 600).url
        }" alt="img">
        <ul class="info-list ">
            <li class="info-list-element">
                <h2 class="info-title">INFO</h2>
                <p class="info-text">${
                  event?.info ? event.info : 'Secret Info'
                }</p>
            </li>
            <li class="info-list-element">
                <h2 class="info-title">WHEN</h2>
                <p class="info-text padding">${
                  event?.dates?.start?.localDate
                    ? event.dates.start.localDate
                    : 'Secret Time'
                }</p>
                <p class="info-text">${
                  event?.dates?.start?.localTime
                    ? event.dates.start.localTime
                    : 'Secret Time'
                } 
                (${
                  event?.dates?.timezone ? event.dates.timezone : 'Secret Place'
                })</p>
            </li>
            <li class="info-list-element">
                <h2 class="info-title">WHERE</h2>
                <p class="info-text padding">${
                  event?.dates?.timezone ? event.dates.timezone : 'Secret Place'
                }</p>
                <p class="info-text">${
                  event?._embedded?.venues[0]?.name
                    ? event._embedded.venues[0].name
                    : 'Secret Place'
                }</p>
            </li>
            <li class="info-list-element">
                <h2 class="info-title">WHO</h2>
                <p class="info-text">${
                  event?.name ? event.name : 'Secret Name'
                }</p>
            </li>
            <li>
                <h2 class="info-title tickets">PRICES</h2>
            ${typeOfTickets}
            </li>
        </ul>
    </div>
    <a target="_blank" class="info-btn" href="https://www.google.com/search?q=${
      event.name
    }">MORE FROM THIS AUTHOR</a>
    </div>
  `;
}

function toUpperCaseFirstLetter(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
