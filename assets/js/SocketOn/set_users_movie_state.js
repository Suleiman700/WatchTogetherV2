import socket_class from '../Socket.js'
import UsersMovieState_C from '../UsersMovieState.js';

/*
    A function that gets the [is_loading_movie] | [boolean] from server and displays an icon
    next to users cards.

    This helps to know exactly who is still loading movie and who done loading the movie.
 */

class SetUsersMovieLoadingState {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('set_users_movie_state', (data) => {
            const users = data['users']
            for (const user of users) {
                const state_name = user['movie_state']
                const state_data = UsersMovieState_C.get_state_data(state_name)
                const text_area = document.getElementById(`${user['username']}_movie_state`)

                // Clear class list
                text_area.classList.remove(['text-success'], ['text-warning'], ['text-danger'])

                // Set state text
                text_area.innerHTML = state_name

                // Set state color
                text_area.classList.add(state_data['color'])
            }
        })
    }
}

const SetUsersMovieLoadingState_C = new SetUsersMovieLoadingState()
