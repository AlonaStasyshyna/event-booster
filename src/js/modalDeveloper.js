const openModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modal = document.querySelector('[data-modal]');
const body = document.querySelector('[data-body]');
const modalDev = document.querySelector('[data-modal]');

openModalBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

export function toggleModal() {
  modal.classList.toggle('is-hidden');
  body.classList.toggle('no-scroll');
  closeByKeybord(modal);
}

export function closeByKeybord(value) {
  document.addEventListener(
    'keydown',
    e => {
      if (e.code == 'Escape') {
        value.classList.add('is-hidden');
        body.classList.remove('no-scroll');
      }
    },
    { once: true }
  );
}
