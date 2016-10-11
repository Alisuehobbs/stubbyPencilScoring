'use strict'

$(document).ready(() => {
    console.log('im listening');

    $('#players_form').hide()

    $('#players').keyup(() => {
        let numberOfPlayers = $('#players').val()
        console.log(numberOfPlayers);

        $('#players_form').show()

        for (var i = 0; i < numberOfPlayers; i++) {

            let playerForm = `
                    <div class="row">
                    <div class="input-field col s12 m6 l6">
                    <input id="game_name" type="text" class="validate" name="user_name">
                    <label for="user_name">UserName</label>
                    </div>
                    </div>
                    `

            $('#players_form').append(playerForm)
        }

    })

})
