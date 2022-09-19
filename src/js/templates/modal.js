import { events } from '../getEvents';

const refs = {
  openModalBtn: document.querySelector("[info-modal-open]"),
  closeModalBtn: document.querySelector("[info-modal-close]"),
  modal: document.querySelector("[info-modal]"),
  events: document.querySelector('.events__cards'),
  modalContent: document.querySelector('.modal-content'),
  modalContainer: document.querySelector('.modal-container')
};
refs.events.addEventListener('click', (e) => {
  const target = e.path[2];
  if (target.tagName === 'LI') {
    generateModalContent(events[target.id]);
    toggleModal();
  };
});

refs.closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  refs.modal.classList.toggle("is-hide");
}
refs.modalContainer.addEventListener('click', ((e)=>{
  if(!e.target.closest(".modal")){
   toggleModal()
  }console.log(e)})

)
function generateModalContent(event) {
  refs.modalContent.innerHTML = `
   <div class="modal-modal">
    <img src="${event.images.find(e => e.height >= 400 && e.height <= 600).url}" class="elipse-img" alt="img">
    <div class="info-modal">
        <img class="modal-img" src="${event.images.find(e => e.height >= 400 && e.height <= 600).url}" alt="img">
        <ul class="info-list ">
            <li class="info-list-element">
                <h2 class="info-title">INFO</h2>
                <p class="info-text">${event?.info ? event.info : 'Secret Info'}</p>
            </li>
            <li class="info-list-element">
                <h2 class="info-title">WHEN</h2>
                <p class="info-text padding">${event?.dates?.start?.localDate ? event.dates.start.localDate : 'Secret Time'}</p>
                <p class="info-text">${event?.dates?.start?.localTime ? event.dates.start.localTime : 'Secret Time'} 
                (${event?.dates?.timezone ? event.dates.timezone : 'Secret Place'})</p>
            </li>
            <li class="info-list-element">
                <h2 class="info-title">WHERE</h2>
                <p class="info-text padding">${event?.dates?.timezone ? event.dates.timezone : 'Secret Place'}</p>
                <p class="info-text">${event?._embedded?.venues[0]?.name ? event._embedded.venues[0].name : 'Secret Place'}</p>
            </li>
            <li class="info-list-element">
                <h2 class="info-title">WHO</h2>
                <p class="info-text">${event?.name ? event.name : 'Secret Name' }</p>
            </li>

            <li>
                <h2 class="info-title tickets">PRICES</h2>
                <div class="scan">
                    <svg class="bar-code" width="24" height="16">
                        <use href="./images/sprite.svg#bar_code"></use>
                    </svg>
                    <p class="info-text">Standart 300-500 UAH</p>
                </div>
                <button class="buy-tickets-btn">BUY TICKETS</button>
            </li>
            <li>
                <div class="scan">
                    <svg class="bar-code" width="24" height="16">
                        <use href="./images/sprite.svg#bar_code"></use>
                    </svg>
                    <p class="info-text">VIP 1000-1500 UAH</p>
                </div>
                <button class="buy-tickets-btn">BUY TICKETS</button>
            </li>

        </ul>
    </div>
    <a target="_blank" class="info-btn" href="https://www.google.com/search?q=${event.name}">MORE FROM THIS AUTHOR</a>
    </div>
  `
};