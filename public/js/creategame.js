'use strict'

$(document).ready(() => {

    console.log('im listening');

    $('#players').keypress(() => {
        let numberOfPlayers = $('#players').val()
        console.log(numberOfPlayers);



    })
})
