'use strict';


document.querySelector('.check').addEventListener(
    'click', function () {
        document.querySelector('.score').textContent = Number(document.querySelector('.score').textContent) - 1;
    }
);
