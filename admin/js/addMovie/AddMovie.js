// Inputs
import Input_MovieName from './inputs/Input_MovieName.js';
import Input_MovieYear from './inputs/Input_MovieYear.js';
import Select_MovieGenre from './selects/Select_MovieGenre.js';
import Input_MovieDesc from './inputs/Input_MovieDesc.js';
import Select_MovieRating from './selects/Select_MovieRating.js';
import Input_MoviePoster from './inputs/Input_MoviePoster.js';
import Input_MovieSrc from './inputs/Input_MovieSrc.js';

// Request
import Requests from '../../../helpers/requests/Requests.js'

// Alert
import Alert from '../../../helpers/alert/Alert.js';

class AddMovie {
    constructor() {}

    async add_movie() {
        // Show alert
        Alert.set_class('info')
        Alert.set_text('Please wait...', true)
        Alert.show_alert(true)

        let valid = true

        const movie_name = Input_MovieName.get_value()
        Input_MovieName.mark_error(movie_name === undefined)
        // if (movie_name === undefined) {
        //     valid = false
        //     return
        // }

        const movie_year = Input_MovieYear.get_value()
        Input_MovieYear.mark_error(movie_year === undefined)
        // if (movie_year === undefined) {
        //     valid = false
        //     return
        // }

        const movie_genre = Select_MovieGenre.get_value()
        Select_MovieGenre.mark_error(movie_genre === undefined)
        if (movie_genre === undefined) {
            valid = false
            return
        }

        const movie_desc = Input_MovieDesc.get_value()
        Input_MovieDesc.mark_error(movie_desc === undefined)
        // if (movie_desc === undefined) {
        //     valid = false
        //     return
        // }

        const movie_rating = Select_MovieRating.get_value()
        Select_MovieRating.mark_error(movie_rating === undefined)
        // if (movie_rating === undefined) {
        //     valid = false
        //     return
        // }

        const movie_poster = Input_MoviePoster.get_value()
        Input_MoviePoster.mark_error(movie_poster === undefined)
        // if (movie_poster === undefined) {
        //     valid = false
        //     return
        // }

        const movie_src = Input_MovieSrc.get_value()
        Input_MovieSrc.mark_error(movie_src === undefined)
        // if (movie_src === undefined) {
        //     valid = false
        //     return
        // }

        if (valid) {
            const test = {
                'movie_name': movie_name,
                'movie_year': movie_year,
                'movie_genre': movie_genre,
                'movie_desc': movie_desc,
                'movie_rating': movie_rating,
                'movie_poster': movie_poster,
                'movie_src': movie_src,
            }


            const request = new Requests('/movies/add', 'POST', test, 'test')
            const response = await request.send_request()

            if (response['state']) {
                // Show alert
                Alert.set_class('success')
                Alert.set_text(response['msg'], false)
                Alert.show_alert(true)

                // Clear fields
                Input_MovieName.clear()
                Input_MovieYear.clear()
                Input_MovieDesc.clear()
                Input_MoviePoster.clear()
                Input_MovieSrc.clear()
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

export default new AddMovie()
