'use strict'

$(document).ready(() => {

    console.log('im listening');

    $('#players').keyup(() => {
        let numberOfPlayers = $('#players').val()
        console.log(numberOfPlayers);


    })
})
