'use strict';

function getImage(link) {
    console.log(link);
    fetch(link, { 'Access-Control-Allow-Origin': true })
        .then(response => response.json())
        .then(responseJson =>
            createDoggo(responseJson))

       // .catch(error => alert('no doggo pictures :( something went wrong'));
}

function checkForm() {
    $('form').submit(event => {
        event.preventDefault();
        $('.doggo').empty();
        let dogType = $('#dog-type').val();
        if (!dogType) {
            dogType='beagle';
        }
        $('#dog-type').val('');
        let link = createLink(dogType);
        getImage(link);
    })
}

function createLink(dogType) {
    let link = `https://dog.ceo/api/breed/${dogType}/images/random`;
    return link;
}



function createDoggo(responseJson) {
    console.log(responseJson);
    let insert = `<img class='result-doggo' src=${responseJson.message}
    alt='Another happy doggo'>`;
    console.log(insert);
    $('.doggo').append(insert);
    $('.doggo').removeClass('hidden');
}

$(function () {
    console.log('App loaded, waiting for submit');
    checkForm();
})