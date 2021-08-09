'use strict';
// const booking = [];

// const createBooking = function (flightNum, numPassenger = 1, price = 199) {
//   const bookingObj = {
//     flightNum,
//     numPassenger,
//     price,
//   };
//   console.log(bookingObj);
//   booking.push(bookingObj);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
//____________________________________________

// const flight = 'LH234';
// const issac = {
//   name: 'issac Choi',
//   passport: 111,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'HF123';
//   passenger.name = 'MR.' + passenger.name;
//   if (passenger.passport === 111) {
//     alert('Checked in');
//   } else {
//     alert('wrong passport');
//   }
// };

// checkIn(flight, issac);
// console.log(flight);
// console.log(issac);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000);
// };

// newPassport(issac);
// checkIn(flight, issac);
// console.log(flight);
// console.log(issac);
//____________________________________________

// // CALLBACK && HIger Order Function Example
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// //Higher-order Function because it takes other function as argument
// const transformer = function (str, fn) {
//   console.log(`Transformed. string : ${fn(str)}`);
//   console.log(`Transformed by ${fn.name}`);
// };

// //invoking value
// transformer('JavaScript is the best ', upperFirstWord);
// transformer('JavaScript is the best ', oneWord);
//____________________________________________

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} : ${name}`);
//   };
// };

// const greeterHey = greet('HEY');
// greet('hi')('ahdd');

// //using arrow function
// const hey = hello => name => console.log(`${hello} : ${name}`);
// hey('hwiwiwiwiw')('wueh');
//____________________________________________
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push([`flight: ${this.iataCode}${flightNum}`]);
  },
};

lufthansa.book(1234, 'ahriri');
console.log(lufthansa);
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: new Array(),
};

const book = lufthansa.book;

//below will occur an error because it is pointing undefined
//book(23, 'issac choi');
//call apply bind!
//call takes first target point(target this object) and rest of arguments
book.call(eurowings, 23, 'issac choi');

console.log(eurowings);

//apply -> diff is apply does not take parameter but an array of paramaters
