import PlayersController_C from '../../Players/PlayersController.js'
import Plyr_C from '../../Players/Plyr.js'
import socket_c from '../../Socket.js';

class SetSourceClass {
    constructor() {
        this._btn_id = 'movie_set_source'
        this._source_input = 'movie_source_input'
        this.on_click()
    }

    on_click() {
        document.getElementById(this._btn_id).addEventListener('click', () => {
            const movie_source = document.getElementById(this._source_input).value
            socket_c._socket.emit('movie_set_source', {movie_source}, function(callback) {})
        })
    }
}

const SetSource_C = new SetSourceClass()
export default SetSource_C
