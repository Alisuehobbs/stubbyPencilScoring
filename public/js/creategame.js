'use strict'

$(document).ready(() => {
    console.log('im listening');

    $('#players_form').hide()

    $('#players').keyup(() => {
      let numberOfPlayers = $('#players').val()
      console.log(numberOfPlayers);

      $('#players_form').show()

    })
})
