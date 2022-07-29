import socket_class from '../Socket.js'
import PlayersController_C from "../Players/PlayersController.js";
import PlayersController from "../Players/PlayersController.js";
import Notify_C from '../Notify.js';
// import Plyr_C from '../Players/Plyr.js'


class SetCurrentPlayer {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('set_current_player', (data) => {
            const player_id = data['player_id']

            // Set current player
            PlayersController_C.set_current_player(player_id)

            // Hide all players
            PlayersController_C.hide_all()

            // Show current player
            PlayersController_C.show_current_player()

            // Play current player
            PlayersController_C.play_current_player()

            // Show notify
            const username_who_changed_player = data['username_who_changed_player']
            const player_name = PlayersController_C.current_player_get_name()
            Notify_C.notify_player_change(username_who_changed_player, player_name)
        })
    }
}

const SetCurrentPlayer_C = new SetCurrentPlayer()
