import socket_class from '../Socket.js'
import PlayersController_C from "../Players/PlayersController.js";


class MoviePlay {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('movie_play', (data) => {
            console.log('socket on => movie_play')
            const player_id = data['player_id']
            PlayersController_C.play_current_player(player_id)
        })
    }
}

const MoviePlay_C = new MoviePlay()
