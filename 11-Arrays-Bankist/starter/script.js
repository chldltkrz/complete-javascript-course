'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//array has some methods like
// arr.slice(2)
// arr.splice will mutate the array! etc
//08/18  adding sorting functionality
// add sort parameter and set it to false, then activate when sort button is clicked
const displayMovements = function (movement, sort = false) {
  containerMovements.innerHTML = '';

  //slice method will make copy of original array!
  const movs = sort ? movement.slice().sort((a, b) => a - b) : movement;

  movs.forEach(function (mov, i, _) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i} ${type}</div>
      <div class="movements__value">${mov}$</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// //acc is like a snowball
// //second argment of reduce is init value for acc;
// const balance = movements.reduce(function (acc, cur) {
//   return acc + cur;
// }, 0);
// console.log(balance);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acco, mov) => acco + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov > 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = interest;
};

// return username for each user in account arr
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(val => val[0])
      .join('');
  });
};

createUsername(accounts);
console.log(accounts);

//refactoring UI refresh
const updateUI = function (account) {
  //display movement
  displayMovements(account.movements);
  //display balance
  calcDisplayBalance(account);
  //display summary
  calcDisplaySummary(account);
};

//EventHander for login function
let curAccount;
btnLogin.addEventListener('click', function (e) {
  // following method will prevent form to stop submitting
  e.preventDefault();
  curAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (curAccount?.pin === Number(inputLoginPin.value)) {
    //displayUI and welcome Message
    labelWelcome.textContent = `Welcome Back! ${
      curAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //to release focus on this object
    inputLoginPin.blur();

    updateUI(curAccount);
  }
});

// implementing transfer function
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    curAccount.balance >= amount &&
    receiverAcc?.username !== curAccount.username &&
    receiverAcc
  ) {
    //add negative movement to sending user
    curAccount.movements.push(-amount);
    //add positive movement to receiving user
    receiverAcc.movements.push(amount);

    updateUI(curAccount);
  }
});

// //find method only return first condition-met value as a value! not an array!
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && curAccount.movements.some(mov => mov > amount / 10)) {
    // add the movement to the curAccount
    curAccount.movements.push(amount);
    updateUI(curAccount);
  }
  inputLoanAmount.value = '';
});

// findIndex method will return index of first matching element!
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === curAccount.username &&
    Number(inputClosePin.value) === curAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === curAccount.username
    );
    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

// this variable will keep track of sorted state
// if button is clicked the value is fliped!
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(curAccount.movements, !sorted);
  sorted = !sorted;
});
// some && every method!
// EQUALITY following line will check if only specific value is in iterable!
console.log(movements.includes(-130));
// how to pick deposit movements?
// CONDITION    return true if there is anyvalue matching along callback function
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY Method will return true only when every element meet the condition

// flat && flatMap method!
// flat nested array to n depth deep!
const arr = [[1, 2, 3], [5, 6, 7], 4, 8];
console.log(arr.flat());
// console.log(arr.flat(n))); will flat n depth deep array into flat array

const owner = ['j', 'z', 'a', 'm'];
// sort will mutate the original array! be Careful to use
// sort inside value along to alphabetical order
console.log(owner.sort());

// assumethere is movement arrays
console.log(movements);
// sort the array in ascending order with bubble sorting algorithm(i guess)
// takes callback function, but don know how it works, need to search
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});

//creating filling array in various way
//traditional way
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//this will create an array of size of 7 with empty contents
const x = new Array(7);
//array made by above method can call only one function that is "FILL",
//following map method wont work on the array
x.map(() => 5);
//following call will fill empty array with value of 1
x.fill(1);
//fill(value, start index, end index)
//this fill method can fill not only empty array but also already filled array

//but we have Array.from method to create new array with mapping function
const y = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(y);

//how much deposit is took in place across the bank?
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

//how many deposit that is at least 1000?
const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposit1000);

const numDeposit1000reduce = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, cur) => {
    if (cur >= 1000) return ++acc;
    else return acc;
  }, 0);
console.log(numDeposit1000reduce);

// how to count deposit and withdrawal at the same time?
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposit += cur) : (sums.withdrawal += cur);
      return sums;
    },
    {
      deposit: 0,
      withdrawal: 0,
    }
  );
console.log(sums);

//this is a nice title -> This Is a Nice title
//function to convert prev to later
const convertTitlecase = function (title) {
  const expected = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      !expected.includes(word) ? word[0].toUpperCase() + word.slice(1) : word
    );
  console.log(titleCase);
};
convertTitlecase('this is a nice title');
convertTitlecase('this is a LONG title but not too long');
convertTitlecase('and here is another title with an EXAMPlE');
//      !expected.includes(word);
