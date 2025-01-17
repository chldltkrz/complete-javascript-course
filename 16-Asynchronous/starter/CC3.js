
///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imgContainer2 = document.querySelector('.images');

const createImage2 = function(imgPath){
    return new Promise(
        function(resolve, reject){
            const img = document.createElement('img');
            img.src = imgPath;

            img.addEventListener('load',function(){
                imgContainer2.append(img);
                resolve(img);
            });

            img.addEventListener('error', function(){
                reject(new Error('Image nor FoUnD'));
            })
        }
    );
}
let currentImg;
const wait3 = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds*1000)
    })
}

const loadPause = async function(){
    try{
        const img1 = await createImage2('img/img-1.jpg');
        await wait3(2);
        img1.style.display = 'none';

        const img2 = await createImage2('img/img-2.jpg');
        await wait3(2);
        img2.style.display = 'none';
    }catch(err){
        console.log(err); 
    }
}
// loadPause();

const loadAll = async function(imgArr){
    try{
        const imgs = imgArr.map(async img => await createImage2(img));

        const imgsEL = await Promise.all(imgs);
        imgsEL.forEach(img => img.classList.add('parallel'));
    }catch(err) {
        console.log(err);
    }
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);