import YouTube_C from './YouTube.js'
import Plyr_C from './Plyr.js'
import socket_c from "../Socket.js";

class PlayersController {
    constructor() {
        this._current_player = 0
    }

    // Get current player name
    current_player_get_name() {
        switch (this._current_player) {
            case 0:
                return YouTube_C._player_name
            case 1:
                return Plyr_C._player_name
        }
    }

    // Set current player id
    set_current_player(player_id) {
        this._current_player = player_id
    }


    // Get current player time
    current_player_get_time() {
        switch (this._current_player) {
            case 0:
                return YouTube_C.get_time()
            case 1:
                return Plyr_C.get_time()
        }
    }

    // Set current player time
    current_player_set_time(time) {
        switch (this._current_player) {
            case 0:
                YouTube_C.set_time(time)
                break;
            case 1:
                Plyr_C.set_time(time)
                break;
        }
    }

    // Hide all players
    hide_all() {
        YouTube_C.hide()
        Plyr_C.hide()
    }

    // Pause all players
    pause_all() {
        YouTube_C.pause_socket()
        Plyr_C.pause_socket()
    }

    // Show current player
    show_current_player() {
        switch (this._current_player) {
            case 0:
                YouTube_C.show()
                break;
            case 1:
                Plyr_C.show()
                break;
        }
    }

    // Play current player
    play_current_player(player_id) {
        switch (player_id) {
            case 0:
                YouTube_C.play_client()
                break;
            case 1:
                Plyr_C.play_client()
                break;
        }
    }

    // Pause current player
    pause_current_player(player_id) {
        switch (player_id) {
            case 0:
                YouTube_C.pause_client()
                break;
            case 1:
                Plyr_C.pause_client()
                break;
        }
    }

    // Set socket player id
    set_socket_player() {
        socket_c._socket.emit('socket_set_player_id', {player_id: this._current_player}, function(callback) {})
    }

    // Set player source
    set_player_source(player_id, movie_source) {
        switch (player_id) {
            case 0:
                YouTube_C.set_source(movie_source)
                break;
            case 1:
                Plyr_C.set_source(movie_source)
                break;
        }
    }

    play() {
        console.log('here1')
        socket_c._socket.emit('movie_play', {}, function(callback) {})
    }

    pause() {
        socket_c._socket.emit('movie_pause', {}, function(callback) {})
    }

    sync() {
        socket_c._socket.emit('movie_sync', {}, function(callback) {})
    }


}

const CurrentPlayerClass = new PlayersController()
export default CurrentPlayerClass
