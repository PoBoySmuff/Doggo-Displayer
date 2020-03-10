'use strict';


function handleErrors(response) {
    //console.log(response);
    if (!response.ok) {
        
        throw Error('Dog breed not found');

    }
    return response;

}

function getImage(link) {
    console.log(link);
    fetch(link, { 'Access-Control-Allow-Origin': true })
        .then(handleErrors)
        .then(response => response.json())


        .then(responseJson => {
            createDoggo(responseJson);
            console.log('Success:', responseJson);
        })
        .catch(function (error) {
            console.log(error);
            alert(error)
        })

}
//.catch(error => alert(response.message));
function checkForm() {
    $('form').submit(event => {
        event.preventDefault();
        $('.doggo').empty();
        let dogType = $('#dog-type').val();
        if (!dogType) {
            dogType = 'beagle';
        }
        dogType = dogType.toLowerCase();
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