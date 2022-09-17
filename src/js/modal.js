const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('[modal-info]');

const openModalWindow = () => {
  modal.style.display = 'flex';
};
openModal.addEventListener('click', openModalWindow);

const closeModalWindow = () => {
  modal.style.display = 'none';
};
closeModal.addEventListener('click', closeModalWindow);
