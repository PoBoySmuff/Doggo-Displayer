'use strict';

function getDogImage(numDoggos) {
    let link = 'https://dog.ceo/api/breeds/image/random/'
    link += numDoggos;
    fetch(link, {'Access-Control-Allow-Credentials': true})
        .then(response => (response.json())
        .then(responseJson => displayDoggos(responseJson))
        
        .catch(error => alert('no doggo pictures :( something went wrong')));
        
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        $('.pictures').empty();
        let numToGrab = 3
        if($('#num-dogs').val()){
        numToGrab = $('#num-dogs').val();
    }
        
        getDogImage(numToGrab);
    });
}

function displayDoggos(responseJson) {
    let responseMessage = responseJson.message;
    let result = [];
    for (let i=0; i<responseMessage.length; i++) {       
        makeDoggo(responseMessage[i]);
    }
    $('.results').removeClass('hidden');
    
}

function makeDoggo(src) {
    console.log(src);
    let newDoggo = `<li>
    <img class='result-doggo' src=${src}
    alt='Another happy doggo'>
    </li>`
    $('.pictures').append(newDoggo);
    console.log(newDoggo);
}

$(function() {
    console.log('App loaded, waiting for submit');
    watchForm();
});