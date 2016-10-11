'use strict'

$(document).ready(() => {
    console.log('im listening');

    $('#players_form').hide()

    $('#players').keyup(() => {
        let numberOfPlayers = $('#players').val()
        console.log(numberOfPlayers);

        $('#players_form').show()

        //maybe harcode the first form so that we can pre populate the first player with the username of the user creating the game. then loop through the rest of the # of players entered. the loop would be something like i < numberOfPlayers-1, or i starts at 1 not 0 (i=1)

        for (var i = 1; i < numberOfPlayers; i++) {

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
