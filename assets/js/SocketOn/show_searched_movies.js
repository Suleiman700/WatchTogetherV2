import Socket_C from '../Socket.js'
import MoviesSearch_C from '../MoviesList/MovieSearch.js'
import MoviesTable_C from '../MoviesList/MoviesTable.js'

/*
    User receives movies object from server after clicking search button
 */

class ShowSearchedMovies {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('show_searched_movies', (data) => {
            const movies = data['movies']

            // Store search results
            MoviesSearch_C._search_results = movies

            if (movies.length > 0) {
                // Show search input
                // MoviesSearch_C.toggle_search_input(true)
            } else {
                // Show no result section
                MoviesSearch_C.show_no_results(true)
                // Hide search input
                // MoviesSearch_C.toggle_search_input(false)
            }

            // Hide loading spinner
            MoviesTable_C.show_spinner(false)

            // Build movies table
            MoviesTable_C.build_table()
        })
    }
}

const ShowSearchedMovies_C = new ShowSearchedMovies();
export default ShowSearchedMovies_C
