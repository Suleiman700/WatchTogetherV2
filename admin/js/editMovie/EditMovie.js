
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

// Loading
import Loading from '../../../helpers/loading/Loading.js';
import btn_EditMovie from './buttons/Btn_EditMovie.js';
import btn_DeleteMovie from './buttons/Btn_DeleteMovie.js';

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
        // Show loading
        Loading.show('Please Wait', 'Getting movie details...')

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

        // Hide loading
        Loading.hide()
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
            Input_MovieName.focus()
            valid = false
            return
        }

        const movie_year = Input_MovieYear.get_value()
        Input_MovieYear.mark_error(movie_year === undefined)
        if (movie_year === undefined) {
            Input_MovieYear.focus()
            valid = false
            return
        }

        const movie_genre = Select_MovieGenre.get_value()
        Select_MovieGenre.mark_error(movie_genre === undefined)
        if (movie_genre === undefined) {
            Select_MovieGenre.focus()
            valid = false
            return
        }

        const movie_desc = Input_MovieDesc.get_value()
        Input_MovieDesc.mark_error(movie_desc === undefined)
        if (movie_desc === undefined) {
            Input_MovieDesc.focus()
            valid = false
            return
        }

        const movie_rating = Select_MovieRating.get_value()
        Select_MovieRating.mark_error(movie_rating === undefined)
        if (movie_rating === undefined) {
            Select_MovieRating.focus()
            valid = false
            return
        }

        const movie_poster = Input_MoviePoster.get_value()
        Input_MoviePoster.mark_error(movie_poster === undefined)
        if (movie_poster === undefined) {
            Input_MoviePoster.focus()
            valid = false
            return
        }

        const movie_src = Input_MovieSrc.get_value()
        Input_MovieSrc.mark_error(movie_src === undefined)
        if (movie_src === undefined) {
            Input_MovieSrc.focus()
            valid = false
            return
        }

        if (valid) {
            // Disable buttons
            btn_EditMovie.enabled(false)
            btn_DeleteMovie.enabled(false)

            // Show alert
            Swal.fire({
                icon: 'info',
                title: 'Saving Changes',
                html: 'Please wait while we save your changes...',
                showConfirmButton: false,
                showDenyButton: false,
                allowOutsideClick: false,
            })

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

            // Hide alert
            Swal.close()

            if (response['state']) {
                // Show alert
                Swal.fire({
                    icon: 'success',
                    title: 'Great',
                    html: response['msg'],
                    showConfirmButton: true,
                    showDenyButton: false,
                    showCloseButton: true,
                    allowOutsideClick: true,
                })
            }
            else {
                // Show alert
                Swal.fire({
                    icon: 'error',
                    title: 'Ops!',
                    html: response['msg'],
                    showConfirmButton: true,
                    showDenyButton: false,
                    showCloseButton: true,
                    allowOutsideClick: true,
                })
            }

            // Enable buttons
            btn_EditMovie.enabled(true)
            btn_DeleteMovie.enabled(true)
        }
    }

}

export default new EditMovie()
