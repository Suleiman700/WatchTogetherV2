import socket_class from '../Socket.js'
import Players_C from '../Players/PlayersController.js'
// import Plyr_C from '../Players/Plyr.js'


class MovieSeek {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('movie_seek', (data) => {
            const currTime = data.current_time
            const clientTime = Players_C.current_player_get_time()
            if (clientTime < currTime - .5 || clientTime > currTime + .5) {
                Players_C.current_player_set_time(data.current_time)
            }
        })
    }
}

const MovieSeek_C = new MovieSeek()
