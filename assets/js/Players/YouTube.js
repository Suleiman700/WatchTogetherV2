import socket_c from "../Socket.js";
import Players_C from './PlayersController.js'
import UsersMovieState_C from '../UsersMovieState.js';

class YouTubePlyrClass {
    constructor() {
        this._id = 0
        this._area_id = 'YouTubeArea'
        this._player = null
        this._player_name = 'YouTube'

        this._player = new Plyr('#youtubesrc', {
            controls: ['progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay']
        });
        this.on_choose()
        this.on_seek()
        this.on_play()
        this.on_pause()
        this.on_fullscreen()
        this.on_load_finished_load_movie()
    }

    // Show player
    on_choose() {
        const btn = document.getElementById('movie_player_youtube')
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
        if (!this._player.playing) {
            console.log('not playing, playing it')
            this._player.play()
        } else {
            console.log('already playing')
        }
    }

    // Play socket movie
    play_socket() {
        socket_c._socket.emit('movie_play', {}, function(callback) {})
    }

    // Pause client movie
    pause_client() {
        if (!this._player.paused) {
            console.log('not paused, pausing it')
            this._player.pause()
        } else {
            console.log('already paused')
        }
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
        if (!this._player.playing) {
            this._player.on('play', (event) => {
                // Players_C.play()
                UsersMovieState_C.set_movie_state('Watching')
                // this._player.fullscreen.exit()
            });
        } else {
            console.log('already playing')
        }
    }

    // On pause
    on_pause() {


        if (!this._player.paused) {
            this._player.on('pause', (event) => {
                // this._player.fullscreen.exit()
                // this.pause_socket()
                // Players_C.pause()
                UsersMovieState_C.set_movie_state('Paused')
            });
        } else {
            console.log('already paused')
        }
    }

    // Set client source
    set_source(movie_source) {
        this._player.source = {
            type: 'video',
            sources: [
                {
                    src: movie_source,
                    provider: 'youtube',
                },
            ],
        };
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

const YouTubePlyr_class = new YouTubePlyrClass()
export default YouTubePlyr_class
