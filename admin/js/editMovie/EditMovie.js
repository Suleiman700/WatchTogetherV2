
// Inputs
import Input_MovieName from './inputs/Input_MovieName.js';
import Input_MovieYear from './inputs/Input_MovieYear.js';
import Select_MovieGenre from './selects/Select_MovieGenre.js';
import Input_MovieDesc from './inputs/Input_MovieDesc.js';
import Select_MovieRating from './selects/Select_MovieRating.js';
import Input_MoviePoster from './inputs/Input_MoviePoster.js';
import Input_MovieSrc from './inputs/Input_MovieSrc.js';
import Select_MovieActive from './selects/Select_MovieActive.js';

// Request
import Requests from '../../../helpers/requests/Requests.js'

// Alert
import Alert from '../../../helpers/alert/Alert.js';

class EditMovie {
    constructor() {}

    /**
     * Get url parameter (it is the movie id that user wants to edit)
     */
    get_url_param() {
        return location.search.split('id=')[1]
    }

    /**
     * Fill movie data into fields
     * @param _movie_data
     */
    fill_movie_data_fields(_movie_data) {
        Input_MovieName.set_value(_movie_data['movie_name'])
        Input_MovieYear.set_value(_movie_data['movie_year'])
        Select_MovieGenre.set_selected(_movie_data['movie_genre'])
        Input_MovieDesc.set_value(_movie_data['movie_desc'])
        Select_MovieRating.set_selected(_movie_data['movie_rating'])
        Input_MoviePoster.set_value(_movie_data['movie_poster'])
        Input_MovieSrc.set_value(_movie_data['movie_src'])
        Select_MovieActive.set_selected(_movie_data['active'].toString())
    }

    /**
     * Get movie to edit
     */
    async get_movie_to_edit() {
        const movie_id = this.get_url_param()

        const request = new Requests('/movies/check-movie-exist', 'GET', {movie_id: movie_id})
        const response = await request.send_request()

        // Movie exist
        if (response['state']) {
            this.fill_movie_data_fields(response['movie_data'])
        }
        // Movie does not exist
        else {
            // Redirect to movies list
            window.location.href = "./movies-list.html";
        }
    }

    /**
     * Edit movie
     * @returns {Promise<void>}
     */
    async edit_movie() {
        let valid = true

        const movie_name = Input_MovieName.get_value()
        Input_MovieName.mark_error(movie_name === undefined)
        if (movie_name === undefined) {
            valid = false
            return
        }

        const movie_year = Input_MovieYear.get_value()
        Input_MovieYear.mark_error(movie_year === undefined)
        if (movie_year === undefined) {
            valid = false
            return
        }

        const movie_genre = Select_MovieGenre.get_value()
        Select_MovieGenre.mark_error(movie_genre === undefined)
        if (movie_genre === undefined) {
            valid = false
            return
        }

        const movie_desc = Input_MovieDesc.get_value()
        Input_MovieDesc.mark_error(movie_desc === undefined)
        if (movie_desc === undefined) {
            valid = false
            return
        }

        const movie_rating = Select_MovieRating.get_value()
        Select_MovieRating.mark_error(movie_rating === undefined)
        if (movie_rating === undefined) {
            valid = false
            return
        }

        const movie_poster = Input_MoviePoster.get_value()
        Input_MoviePoster.mark_error(movie_poster === undefined)
        if (movie_poster === undefined) {
            valid = false
            return
        }

        const movie_src = Input_MovieSrc.get_value()
        Input_MovieSrc.mark_error(movie_src === undefined)
        if (movie_src === undefined) {
            valid = false
            return
        }

        if (valid) {
            // Show alert
            Alert.set_class('info')
            Alert.set_text('Please wait...', true)
            Alert.show_alert(true)

            const test = {
                'movie_id': this.get_url_param(),
                'movie_name': movie_name,
                'movie_year': movie_year,
                'movie_genre': movie_genre,
                'movie_desc': movie_desc,
                'movie_rating': movie_rating,
                'movie_poster': movie_poster,
                'movie_src': movie_src,
            }


            const request = new Requests('/movies/edit', 'POST', test)
            const response = await request.send_request()

            if (response['state']) {
                // Show alert
                Alert.set_class('success')
                Alert.set_text(response['msg'], false)
                Alert.show_alert(true)
            }
            else {
                // Show alert
                Alert.set_class('danger')
                Alert.set_text(response['msg'], false)
                Alert.show_alert(true)
            }
        }
    }

}

export default new EditMovie()
