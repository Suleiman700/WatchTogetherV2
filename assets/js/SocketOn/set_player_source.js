import socket_class from '../Socket.js'
import PlayersController_C from "../Players/PlayersController.js";
import PlayersController from "../Players/PlayersController.js";
import Notify_C from '../Notify.js';
// import Plyr_C from '../Players/Plyr.js'


class SetPlayerSource {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('set_player_source', (data) => {
            const player_id = data['player_id']
            const movie_source = data['movie_source']

            // Show notify
            const username_who_changed_source = data['username_who_changed_source']
            Notify_C.notify_source_change(username_who_changed_source)

            // Set current player source
            PlayersController_C.set_player_source(player_id, movie_source)
        })
    }
}

const SetPlayerSource_C = new SetPlayerSource()
