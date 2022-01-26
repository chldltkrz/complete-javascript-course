'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//https://restcountries.com/v2/

const renderCountry = function(data, className = ''){
    const html = `
            <article class="country ${className}">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} MILLION</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
            </article>
        `;
        countriesContainer.insertAdjacentHTML('beforebegin',html);
        countriesContainer.style.opacity = 1;
}

// // old school way! -> now its "promise"!
// const getCountryAndNeighbour = function(country){
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();

//     // on completed loading event, execute the following callback function
//     request.addEventListener('load', function(){
//         console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText); 
//         console.log(data);
//         renderCountry(data);  
//         //Get Neighbour country
//         const [neighbour] = data.borders;
        
//         if(!neighbour) return;
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load',function(){
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');
//         })  
//     })    
// }

// getCountryAndNeighbour('Germany');


const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
}

// PROMISE way
const request = fetch(`https://restcountries.com/v2/name/portugal`);
console.log(request);

const getJSON = function(url, errorMsg = 'something went wrong'){
    return fetch(url).then(response => {
        if(!response.ok){
            throw new Error(`${errorMsg} (${response.status})`);
        }
        return response.json();
    });
}

// const getCountryData = function(country){
//    fetch(`https://restcountries.com/v2/name/${country}`)
//    .then(function(response){
//        console.log(response);
//        if(!response.ok){
//            throw new Error(`Country not found (${response.status})`);
//        }
//        return response.json();
//    })
//    .then(function(data){
//        console.log(data);
//        renderCountry(data[0]);

//        //country 2 border
//        const neighbour = data[0].borders[0];
//        if(!neighbour) return;
//        return fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then();
//    })
//    .then(response => response.json())
//    .then(data => renderCountry(data, 'neighbour'))
//    .catch(err => {
//        renderError(err.message);
//        alert(err)}
//     )
//     .finally(() => {
//         console.log('will called always');
//     });
// };

// btn.addEventListener('click',function(){
//     getCountryData('asfasd');
// })

const getCountryData = function(country){
    //country1
    getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found')
    .then(
        data => {
            renderCountry(data[0]);
    
            //country 2 border
            const neighbour = data[0].borders[0];
            if(!neighbour) throw new Error('No neighbbour found!');
            return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, `COuntry not found`);
    })
    .then(data => renderCountry(data,`neighbour`))
    .catch(err => {
        renderError(`Something went wrone ${err.message}`);
    })
    .finally(() => countriesContainer.style.opacity = 1);
}

btn.addEventListener('click',function(){
    getCountryData('Australia');
})


//----------------------------------------------------------------------------

console.log('Test Start');
setTimeout(() => console.log(` 0sec timer`),0);
Promise.resolve('RESOLVED Promise 1').then(res => console.log(res));
Promise.resolve('RESOLVED Promise 2').then(res => {
    console.log(res);
    for( let i =0; i < 1999998; i ++){}
});
console.log('Test end');



//________________Buiile Promise_____________________________________

const lottery = new Promise(function(resolve, reject){
    console.log('Lottery is executing');
    setTimeout(function(){
        if(Math.random() >= 0.5){
            resolve('You Win');
        }else{
            reject(new Error("you lost!"));
        }
    },2000)
});

lottery.then(res => console.log(res))
        .catch(res => console.log(res));

const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds*1000)
    })
}
wait(2).then(() => {
    console.log('i waited for 2 sec');
    return wait(1);
}).then(() => console.log('i waited for 1 sec'));

Promise.resolve('hey').then(x => console.log(x));
Promise.reject('heyyy').catch(x => console.log(x));

//________________Promisify Geolocation APi__________________________________________
 

navigator.geolocation.getCurrentPosition(
    position => console.log(position),
    err => console.error(err)
);

const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve,reject);
    }); 
}

getPosition().then(pos => console.log(pos))
//________________Async Await__________________________________________

const whereami = async function(country){ 
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
}
whereami('portugal');
console.log('First');


//________________try catch__________________________________________

try{
    let y = 1;
    const x = 2;
}catch{
    throw new Error("error!!!!");
}
//_____________________async in parallel __________________________________________
const get3Countries = async function(c1, c2, c3){
    try{
        // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    const data = await Promise.all([ getJSON(`https://restcountries.com/v2/name/${c1}`),
                                      getJSON(`https://restcountries.com/v2/name/${c2}`),
                                      getJSON(`https://restcountries.com/v2/name/${c3}`)]);
    //Promise.all will print all the value of the promises
    //Promise.race will print only the fastest arrived value of the promises
    //Promise.  
        console.log(data);
    }catch(err){
        console.error(err);
    }
}
const timeout = function(sec){
    return new Promise(function(_,reject){
        setTimeout(function(){
            reject(newError('request took too long'), sec*1000);
        })
    })
}
get3Countries('portugal','canada','usa');