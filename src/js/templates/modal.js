(() => {
  const refs = {
    openModalBtn: document.querySelector("[info-modal-open]"),
    closeModalBtn: document.querySelector("[info-modal-close]"),
    modal: document.querySelector("[info-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hide");
  }
}
)();

 