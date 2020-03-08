'use strict';


function handleErrors(response) {
    if (response.status === 404) {
        throw Error('Doggo not found for that breed :(');
        console.log("hi");
    }
    if (!response.ok) {
        throw Error(response.statusText);
    }
    
}

function getImage(link) {
    console.log(link);
    fetch(link, { 'Access-Control-Allow-Origin': true })
        .then(handleErrors)
        .then((response) => response.json())

        .then(responseJson => {
            createDoggo(responseJson);
            console.log('Success:', responseJson);
        })
        .catch(function(error) {
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