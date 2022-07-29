import Socket_C from '../Socket.js';
import MoviesTable_C from './MoviesTable.js';

class MovieSearch {
    constructor() {
        this._selected_genre = 'all' // Temporary store selected genre
        this._selected_rating = '0.0' // Temporary store selected rating
        this._selected_year = 'all' // Temporary store selected year
        this._search_results = [] // Store movies search results
        this._movie_search_field = 'movie_search_field' // ID of search input
        this._movie_search_field_shown = false // Show or hide search input

        this.on_genre_select()
        this.on_rating_select()
        this.on_year_select()
        this.on_search()
        // this.on_input_search()
    }

    // On select movie genre
    on_genre_select() {
        document.getElementById('movie_genre_select').addEventListener('change', (e) => {
            // Get selected movie genre
            const value = e.target.value

            // Store selected movie genre
            this._selected_genre = value

            // this._selected_genre = 'action'
            // this.show_movies_section(false)
            // this.show_spinner(true)
            // $.ajax({
            //     url: "http://localhost:3000/get_action",
            //     type: "GET",
            //     data: {
            //         'start': MoviesTable_C._start,
            //         'limit': MoviesTable_C._limit,
            //     },
            //     success: (data) => {
            //         // Set movies source
            //         this._movies_list = data['action_movies']
            //
            //         // Set movies length
            //         MoviesTable_C._size = data['size']
            //         this.generate_movies_list()
            //         this.show_spinner(false)
            //         this.show_movies_section(true)
            //
            //         // Build pagination
            //         MoviesTable_C.build_pagination()
            //     }
            // });
        })
    }

    on_rating_select() {
        document.getElementById('movie_rating_select').addEventListener('change', (e) => {
            // Get selected movie rating
            const value = e.target.value

            // Store selected movie rating
            this._selected_rating = value
        })
    }

    on_year_select() {
        document.getElementById('movie_year_select').addEventListener('change', (e) => {
            // Get selected movie rating
            const value = e.target.value

            // Store selected movie rating
            this._selected_year = value
        })
    }

    /**
     * Show or hide search input
     * @param _option => Boolean
     */
    toggle_search_input(_option) {
        this._movie_search_field_shown = _option
        const elm = document.getElementById(this._movie_search_field)

        if (_option) {
            elm.style.display = 'block'
        }
        else {
            elm.style.display = 'none'
        }
    }

    on_search() {
        document.getElementById('movies_search').addEventListener('click', (e) => {
            // Show loading spinner
            MoviesTable_C.show_spinner(true)

            // Get search string
            const movie_name_search_string = document.getElementById(this._movie_search_field).value

            // Clear search input
            document.getElementById(this._movie_search_field).value = ''


            Socket_C._socket.emit('search_movies', {
                genre: this._selected_genre,
                rating: this._selected_rating,
                year: this._selected_year,
                movie_name: movie_name_search_string
            }, function(callback) {})

            // $.ajax({
            //     url: "http://localhost:3000/get_movies",
            //     type: "GET",
            //     data: {
            //         'genre': this._selected_genre,
            //         'rating': this._selected_rating,
            //         'year': this._selected_year,
            //     },
            //     success: (data) => {
            //         // Set movies source
            //         this._movies_list = data['action_movies']
            //
            //         // Set movies length
            //         MoviesTable_C._size = data['size']
            //         this.generate_movies_list()
            //         this.show_spinner(false)
            //         this.show_movies_section(true)
            //
            //         // Build pagination
            //         MoviesTable_C.build_pagination()
            //     }
            // });
        })
    }

    // When a user search for a movie by name in the input field
    on_input_search() {
        document.getElementById(this._movie_search_field).addEventListener('keyup', (e) => {
            const search_string = e.target.value
            MoviesTable_C.build_table_with_search(search_string)
        })
    }
}

const MovieSearch_C = new MovieSearch
export default MovieSearch_C
