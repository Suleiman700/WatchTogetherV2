// Inputs
import Input_MovieName from './inputs/Input_MovieName.js';
import Input_MovieYear from './inputs/Input_MovieYear.js';
import Select_MovieGenre from './selects/Select_MovieGenre.js';
import Input_MovieDesc from './inputs/Input_MovieDesc.js';
import Select_MovieRating from './selects/Select_MovieRating.js';
import Input_MoviePoster from './inputs/Input_MoviePoster.js';
import Input_MovieFile from './inputs/Input_MovieFile.js';

// Request
import Requests from '../../../helpers/requests/Requests.js'

class AddMovie {
    constructor() {}

    async add_movie() {
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

        const movie_file = Input_MovieFile.get_value()
        Input_MovieFile.mark_error(movie_file === undefined)
        // if (movie_file === undefined) {
        //     valid = false
        //     return
        // }

        if (valid) {
            let formData = new FormData();

            formData.append("movie_poster[]", document.getElementById("movie_poster").files[0]);


            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    return reader.result
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }

            const base64 = window.URL.createObjectURL(document.getElementById("movie_poster").files[0]);
            console.log(base64)

            const test = {
                'movie_name': movie_name,
                'movie_year': movie_year,
                'movie_genre': movie_genre,
                'movie_desc': movie_desc,
                'movie_rating': movie_rating,
                // 'movie_poster': movie_poster,
                'movie_poster': document.getElementById("movie_poster").files[0].file,
                'movie_poster2': base64,
                'movie_file': movie_file,
            }

            const request = new Requests('/test', 'POST', test, 'test')
            const response = await request.send_request()
        }

    }
}

export default new AddMovie()
