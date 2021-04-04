
console.log('client side javascript is loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data.location);
                messageOne.textContent = data.location;
                console.log(data.foreCast);
                messageTwo.textContent = data.foreCast;

            }
        })
    })

})