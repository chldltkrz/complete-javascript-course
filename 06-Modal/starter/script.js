'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// this querySelectorAll will select all elements matching in the name
const btnsShowModal = document.querySelectorAll('.show-modal');

const removeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//add eventlistener to buttons to display modal window
for (let i = 0; i < btnsShowModal.length; i++) {
  btnsShowModal[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

//add eventlistener to 'x' button and overlay to hide modal window
btnCloseModal.addEventListener('click', removeModal);
overlay.addEventListener('click', removeModal);

//add global eventlistener to 'Esc' key to hide modal window
document.addEventListener('keydown', function (E) {
  if (E.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      removeModal();
    }
  }
});
