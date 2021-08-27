'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// 210827 for -> forEach
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SELECTOR
// print all html structure of the page
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// select first meeting element
document.querySelector('.header');
// select all the element and return as array of Nodes
console.log(document.querySelectorAll('.section'));

document.getElementById('section--1');
console.log(document.getElementsByTagName('button'));
console.log(document.getElementsByClassName('btn'));

// Creating and inserting Elements
// .insertAdjacentHTML method,

// create tag to the html
const message = document.createElement('div');
// add class to the tag! like <div class='cookie-message'></div>
message.classList.add('cookie-message');
// message.textcontent = 'we use cookie delicious cookie';
message.innerHTML =
  'we use cookie delicious cookie <button class="btn btn--close-cookie"> got it </button>';
document.querySelector('.header').prepend(message);
document.querySelector('.header').append(message);
// duplicate the element!!
document.querySelector('.header').append(message.cloneNode(true));

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.remove();
    message.parentElement.removeChild(message);
  });
