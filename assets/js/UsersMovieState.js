import socket_c from './Socket.js';

/*
    Function used to set the user movie states like (Loading, Watching, Paused...etc)
 */

class UsersMovieState {
    constructor() {
        this._states = [
            {
                name: 'Watching',
                color: 'text-success',
            },
            {
                name: 'Loading',
                color: 'text-warning',
            },
            {
                name: 'Paused',
                color: 'text-warning',
            },
        ]
    }

    // Get state data based on state name
    get_state_data(state_name) {
        return this._states.find(state => {
            return state.name === state_name
        })
    }

    // Set user movie state
    set_movie_state(state_name) {
        const state_data = this.get_state_data(state_name)
        let state_text = state_data['name']

        socket_c._socket.emit('set_user_movie_state', {'state': state_text,}, function(callback) {})
    }
}

const UsersMovieState_C = new UsersMovieState()
export default UsersMovieState_C
