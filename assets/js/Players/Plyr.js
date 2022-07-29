import socket_c from "../Socket.js";
import Players_C from "./PlayersController.js";
import UsersMovieState_C from '../UsersMovieState.js';

class PlyrClass {
    constructor() {
        this._id = 1
        this._area_id = 'DirectLinkArea'
        this._player = null
        this._player_name = 'Direct Link'

        this._player = new Plyr('#html5src', {
            controls: ['progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay']
        });
        this.on_seek()
        this.on_play()
        this.on_pause()
        this.on_choose()
        this.on_fullscreen()
        this.on_load_finished_load_movie()
    }

    // Show player
    on_choose() {
        const btn = document.getElementById('movie_player_direct')
        btn.addEventListener('click', () => {
            // Pause all players
            Players_C.pause_all()

            // Set current player id
            Players_C.set_current_player(this._id)

            // Set socket current player id
            Players_C.set_socket_player()
        })
    }

    // Play client movie
    play_client() {
        console.log('played Plyr')
        if (!this._player.playing) this._player.play()
        // this._player.play()
    }

    // Play socket movie
    play_socket() {
        socket_c._socket.emit('movie_play', {}, function(callback) {})
    }

    // Pause client movie
    pause_client() {
        this._player.pause()
    }

    // Pause socket movie
    pause_socket() {
        socket_c._socket.emit('movie_pause', {}, function(callback) {})
    }

    // On seek
    on_seek() {
        this._player.on('seeked', (event) => {
            const instance = event.detail.plyr;
            const current_time = instance.currentTime
            socket_c._socket.emit('movie_seek', {current_time}, function(callback) {})
        });
    }

    // On play
    on_play() {
        // this._player.on('play', (event) => {
        //     this._player.fullscreen.exit()
        //     Players_C.play()
        //     UsersMovieState_C.set_movie_state('Watching')
        // });
        if (!this._player.playing) {
            this._player.on('play', (event) => {
                // this._player.fullscreen.exit()
                // Players_C.play()
                UsersMovieState_C.set_movie_state('Watching')
            });
        } else {
            console.log('already playing')
        }
    }

    // On pause
    on_pause() {
        // this._player.on('pause', (event) => {
        //     Players_C.pause()
        //     UsersMovieState_C.set_movie_state('Paused')
        // });

        if (!this._player.paused) {
            this._player.on('pause', (event) => {
                // this._player.fullscreen.exit()
                // Players_C.pause()
                UsersMovieState_C.set_movie_state('Paused')

            });
        } else {
            console.log('already paused')
        }
    }

    // Set client time
    set_time(seconds) {
        this._player.currentTime = seconds
    }

    // Get client time
    get_time() {
        return this._player.currentTime
    }

    // Hide player
    hide() {
        document.getElementById(this._area_id).style.display = 'none'
    }

    // Show player
    show() {
        document.getElementById(this._area_id).style.display = 'block'
    }

    // Pause player
    pause() {
        this._player.pause()
    }

    // Set client source
    set_source(movie_source) {
        this._player.source = {
            type: 'video',
            title: 'Example title',
            sources: [
                {
                    src: movie_source,
                    type: 'video/mp4',
                    size: 720,
                }
            ],
            poster: '/path/to/poster.jpg'
        };
    }

    on_fullscreen() {
        this._player.on('enterfullscreen', (event) => {
            this._player.fullscreen.exit()
        });
    }

    // Events triggered when loading or finished loading movie
    on_load_finished_load_movie() {
        this._player.on('canplaythrough', (event) => {
            UsersMovieState_C.set_movie_state('Watching')
        })

        this._player.on('waiting', (event) => {
            UsersMovieState_C.set_movie_state('Loading')
        })
    }
}

const plyr_class = new PlyrClass()
export default plyr_class
