import Socket_C from '../Socket.js'
import MoviesList_C from '../MoviesList.js'

/*
    Receive movies object and display it for user
 */

class ShowMovies {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('show_movies', (data) => {
            // Set movies list
            // MoviesList_C._movies_list = data['movies_list']

            // Generate movies list for the user
            // MoviesList_C.generate_movies_list()
        })
    }
}

const ShowMovies_C = new ShowMovies();
export default ShowMovies_C
