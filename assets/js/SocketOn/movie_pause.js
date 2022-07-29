import socket_class from '../Socket.js'
import PlayersController_C from "../Players/PlayersController.js";


class MoviePause {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('movie_pause', (data) => {
            const player_id = data['player_id']
            PlayersController_C.pause_current_player(player_id)
        })
    }
}

const MoviePause_C = new MoviePause()
