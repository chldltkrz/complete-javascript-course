'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

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

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.remove();
    message.parentElement.removeChild(message);
  });

// Styles
// to set a style to the element, note that style name is camelCase! not hypen-connected
// and set attibuted are applied directly to the tag
message.style.backgroundColor = '#123456';

// we only can get inline property but not stylesheet property
// height will return nothing, whereas backgroundColor will return #123456
console.log(message.style.height);
console.log(message.style.backgroundColor);

// to get a applied properties list, we use following code
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// set custom property of CSS variable, Check CSS line 3 - 15
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes of HTML
const logo = document.querySelector('.nav__logo');

// we can directly access to the attributes of the element
console.log(logo.alt, logo.src, logo.className);
// if attibutes are standard according to the MDN, we wont have access to the attributes
console.log(logo.designer); // this will be undefined, even if the element has property name designer
// but there is way to read off-standard value from the element
console.log(logo.getAttribute('designer'));

// there is a way to add attributes to the elements like following
logo.setAttribute('company', 'Bankist');

console.log(logo.src); //will return absolute path
console.log(logo.getAttribute('src')); // will return relative path

// Data Attributes
// if property name start with data, html line 18, data-version-number='3.0'
console.log(logo.dataset.versionNumber);

// 210830 add smooth scroll to 'Learn More ↓' button to scroll to section 1 class
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  //
  console.log('current Scroll (X/Y)', window.pageXOffset, pageYOffset);

  // viewport = visible part of web
  console.log(
    'height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // // scrolling1 -> hard scrolling with no effect
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // // scrolling2 -> pass the object with smooth effect,0 but it is still old way!
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // scrolling3 -> set target and set effect!, but works with only modern browser.
  section1.scrollIntoView({ behavior: 'smooth' });
});

// 210831 - Various Events
// consult with MDN Event reference page to know mmore events

const h1 = document.querySelector('h1');

const alertH1 = function () {
  alert('hi');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// another way to attach event to the element
// this is old school way!
h1.onmouseenter = function (e) {
  alert('hello');
};

// diff btw addEventListener and property setting method
// -> addEventListener
//    can add multiple eventListener to one event
//    can delete eventListener when needed

// Bubbling and Capturing phase
// Travel of Event - (https://ko.javascript.info/bubbling-and-capturing)
// Capturing Phase -> Target Phase -> Bubbling Phase
// Document ->        target       -> document
// but not ALL Event has capturing and bubbling event

// nav Coloring and add Functionality

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // to stop bubbling propagation(Not great idea in real world)
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('LINK', e.target, e.currentTarget);
    console.log(e.currentTarget === this);
  },
  // when third argument is set to true, it is capturing not bubbling
  true
);

// Event Delegation
// Assume implement smooth scroll to nav menus to the corresponding section

///////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (nav) {
//   nav.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('Link');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// what if we need to attach 10,000 eventhandler?? OMG< THERE IS Better solution, which is event delegation

// -> Event Delegation
// 1. add eventlistener to the common parent element
// 2. Determine what elements originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // e.target store the element originated the event
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// 210901 - DOM Traversing - selecting element based on other elements' position(relative position)
// Based on H1 element with 'When Banking meets minimalist' phrase
const h1Travel = document.querySelector('h1');

// Going down! -> selecting Child
// selecting all elements inside h1 element
console.log(h1.querySelectorAll('.highlight'));
// directly select children elements of h1 -> nodes can be anything even comments!
console.log(h1.childNodes);
// directly select HTML children elements of h1
console.log(h1.children);

// following elements selectings are possible
// h1.firstElementChild;
// h1.firstChild;
// h1.lastElementChild;
// h1.lastChild;

// Going Up! -> Selecting parent. note that it only returns one Node or element! because there couldnt be more than 1 parent
console.log(h1.parentNode);
console.log(h1.parentElement);

// received query string and select nearest element
// below will select the nearest element from h1 that has class name of header
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1'); // will be itself since it finds closest h1 tag from h1

// Going sideways: siblings
// will return element in the same depth ,if element is the first then NULL is returned for previousElementSibling method, so as last one with nextElemengSibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// 210901 - Tabbed Componenet
// start with selecting tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Below was old ways, not recommended way, for it makes numerous eventListeners!
// tabs.forEach(t => t.addEventListener('click', () => console.log('tag')));
// So Use Event Delegation(listening parent and capturing bubbling)
tabsContainer.addEventListener('click', function (e) {
  // below has critical drawback that returns span only if span inside button is clicked!
  // const clicked = e.target;
  const clicked = e.target.closest('.operations__tab');

  // Guard clause, if clicked container area, prevent error to happen
  if (!clicked) return;

  // clearing button height before adding height to clicked button
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.toggle('operations__tab--active');

  // remove active classes,
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate content area -- data-tab = "2" will be corresponded to dataset.tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// 210902 Passing Arguments to EventHandlers
// Menu fade animation including logo

// In order to add Menu fading menu, we set event delegation to 'nav' html tag! it works because of bubbling

// REFACTORED FUNCTION
const handleHover = function (e) {
  // no closest method because the button has only one string
  if (e.target.classList.contains('nav__link')) {
    // selecting mouseoverred element
    const link = e.target;
    // goto closest parent and from there select all siblings
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // same as for the logo, the img tag
    const logo = link.closest('.nav').querySelector('img');

    // simply make opacity to half
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// following is not working because it is passing value but not function,
// nav.addEventListener('mouseover', handlerHover(e, 0.5));

// following is working because it is passing 'callback function'!
// but there is better way!
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// Passing "argument" into handlerHover function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1.0));

// Sticky Navigation - Scrolling Event
// Scrollinging event is available in window not document
// Whenever scrolled even just a pixel, it will be triggered
// SO IN PERFORMANCE PERSPECTIVE, IT IS NoT GoOd!!!!!

// const initialCoord = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// -> better version (Intersection Observer API)
// const obsCallback = function (entires, observerObjectItself) {
//   entires.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOption = {
//   // root is the element the target is intersecting
//   root: null, // this null option will enable observing whole viewport
//   thresholdd: [0, 0.2], // percentage of intersection the callback function is called..?
// };

// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

// Selecting An Observee, (the header part)
const header = document.querySelector('.header');
// for dynamic calculating of root margin
const navHeight = nav.getBoundingClientRect().height;

// Trigerred callback Function, it will trigerred whenever condition of threshold is meet
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
// IntersectionObserver will take callback and option object
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
// DO Observing on header element
headerObserver.observe(header);

// 210903 Revealing elements on Scroll
// Effects itself are comming crom CSS, and adding them by adding class using JS

// THere is CSS class called '.section--hidden', which makes html tag invisible(opacity 0) and go down little bit(transform translateY(8rem))
/* HOw IT WORK
   1. By adding this class to each section, will be invisible
   2. as scroll reaches each section, IntersectionObserver will remove the hidden class 
*/

// Reveal Section
// select All sections in the page
const allSection = document.querySelectorAll('.section');

// callback Function that removes the 'section--hidden' class for each section
// then release the observing
const revealSection = function (entires, observer) {
  const [entry] = entires;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// for all viewport, if observing section takes 15% of viewport it will tigger callback function
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// add observer to each section
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// 210906 LazyLoading Image!
// Strategy is that load low resolution image when loading page and when meet the intersection, load the full image
// So need 2 images for each img tag
// We will use Dataset JS
// blur is the css effect fyi - filter: blur(20px)

// select tag that has certain CSS property
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // If intersecting, then replace image with the data-src
  entry.target.src = entry.target.dataset.src;
  // Need to remove the filter out
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // let user not notice the lazy loading
  rootMargin: ' 200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
