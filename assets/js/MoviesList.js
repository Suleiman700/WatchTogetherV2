import SetSource_C from './Buttons/MovieSection/SetSource.js'
import Play_C from './Buttons/MovieSection/Play.js'
import Players_C from './Players/PlayersController.js'
import Plyr_C from './Players/Plyr.js'
import MoviesTable_C from './MoviesList/MoviesTable.js'
import Socket_C from './Socket.js'

class MoviesList {
    constructor() {
        this._movies_list = []
        this._selected_genre = '' // Temporary store selected movies genre
        this._spinner_id = 'movies_loading' // Movies section spinner id
        this._movies_section = 'moviesSection' // Movies section div id
        this._temp_movie_story = '' // Store movie story when user clicks "Read Story"

        // this.on_movie_story_click()
        // this.on_movie_search()
        this.on_movie_pick()
        this.generate_movies_list()
    }

    on_movie_search() {
        const input = document.getElementById('movie_search_field')
        input.addEventListener('keyup', (e) => {
            this.show_spinner(true)
            const search_string = e.target.value

            // Filter movies list
            this.filter_movies_list(search_string)
            this.show_spinner(false)
        })
    }

    on_movie_pick() {
        const movies = document.querySelectorAll('.movie_watch_now')

        $("body").on("click", ".movie_watch_now", function(e){
            const movie_unique_id = $(this).data('uniqueid')

            // Switch player to direct link if not set to direct link
            if (Players_C._current_player !== Plyr_C._id) {
                // Pause all players
                Players_C.pause_all()

                // Set current player id
                Players_C.set_current_player(Plyr_C._id)

                // Set socket current player id
                Players_C.set_socket_player()
            }

            Swal.fire({
                icon: 'info',
                title: 'Loading Movie',
                text: 'Please Wait!',
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
                customClass: {
                    popup: 'bg-dark',
                    title: 'text-white',
                    htmlContainer: 'text-white'
                }
            })

            // Ask server to generate movie link
            Socket_C._socket.emit('generate_movie_link', {
                movie_unique_id,
            }, function(callback) {
                if (callback['state']) {
                    const movie_link = callback['link']

                    // Set movie source link in the input
                    document.getElementById(SetSource_C._source_input).value = movie_link
                    document.getElementById(SetSource_C._btn_id).click()
                }
                // console.log(callback)
            })

            setTimeout(function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Movie Loaded',
                    text: 'You can now watch the movie :)',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Start Watching',
                    cancelButtonText: `Continue Browsing`,
                    customClass: {
                        popup: 'bg-dark',
                        title: 'text-white',
                        htmlContainer: 'text-white'
                    }
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        document.getElementById(Play_C._btn_id).click()
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                    } else if (result.isCanceled) {
                        Swal.close()
                    }
                })

            }, 1000)

            // Click play
            // document.getElementById(Play_C._btn_id).click()
        });
    }



    // Filter movies list based on search string
    filter_movies_list(search_string) {
        // Convert search string into lowercase
        search_string = search_string.toLowerCase()

        const section = document.getElementById('moviesSection')

        // Clear all movies
        section.innerHTML = ''

        // Search in movies object
        const searched_movies = this._movies_list.filter(movie => {
            return (movie.name).toLowerCase().includes(search_string)
        })

        const no_results = document.getElementById('no_results')
        if (!searched_movies.length) {
            // Show no results label
            no_results.style.display = 'block'
        }
        else {
            no_results.style.display = 'none'
        }

        for (const movie of searched_movies) {
            const movie_name = movie['name']
            const movie_poster = movie['poster']
            const movie_year = movie['year']
            const movie_language = movie['language']
            const movie_length = movie['length']
            const movie_link = movie['link']
            const movie_rating = movie['rating']

            $(section).append(`
                <div class="col-xl-3 col-lg-4 col-sm-4 col-12 grid-item grid-sizer cat-two mt-3">
                <div class="movie-item movie-item-three mb-50">
                    <div class="movie-poster">
                        <img src="${movie_poster}" alt="" width="300" height="447">
                        <ul class="overlay-btn">
                            <li class="rating" hidden="">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </li>
                            <li><a href="javascript:void(0)" class="popup-video btn btn-outline-danger text-danger movie_watch_now" data-link="${movie_link}">Watch Now</a></li>
                            <li><a href="javascript:void(0)" class="popup-video btn btn-outline-danger text-danger show_movie_story" data-movie-name="${movie_name}">Read Story</a></li>
                        </ul>
                    </div>
                    <div class="movie-content">
                        <div class="top">
                            <h5 class="title text-center"><a href="movie-details.html" class="text-danger">${movie_name}</a></h5>
                        </div>
                        <div class="bottom">
                            <ul>
                                <li><span class="quality">${movie_year}</span></li>
                                <li>
                                    <span class="duration"><i class="fa fa-clock"></i> ${movie_length}</span>
                                    <span class="rating"><i class="fas fa-star"></i> ${movie_rating}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `)
        }
    }


    generate_movies_list() {
        const section = document.getElementById('moviesSection')

        // Clear all movies
        section.innerHTML = ''
        for (const movie of this._movies_list) {
            const movie_name = movie['name']
            const movie_poster = movie['poster']
            const movie_year = movie['year']
            const movie_language = movie['language']
            const movie_length = movie['length']
            const movie_link = movie['link']
            const movie_rating = movie['rating']

            $(section).append(`
                <div class="col-xl-3 col-lg-4 col-sm-4 col-12 grid-item grid-sizer cat-two mt-3">
                <div class="movie-item movie-item-three mb-50">
                    <div class="movie-poster">
                        <img src="${movie_poster}" alt="" width="300" height="447">
                        <ul class="overlay-btn">
                            <li class="rating" hidden="">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </li>
                            <li><a href="javascript:void(0)" class="popup-video btn btn-outline-danger text-danger movie_watch_now" data-link="${movie_link}">Watch Now</a></li>
                            <li><a href="javascript:void(0)" class="popup-video btn btn-outline-danger text-danger show_movie_story" data-movie-name="${movie_name}">Read Story</a></li>
                        </ul>
                    </div>
                    <div class="movie-content">
                        <div class="top">
                            <h5 class="title text-center"><a href="movie-details.html" class="text-danger">${movie_name}</a></h5>
                        </div>
                        <div class="bottom">
                            <ul>
                                <li><span class="quality">${movie_year}</span></li>
                                <li>
                                    <span class="duration"><i class="fa fa-clock"></i> ${movie_length}</span>
                                    <span class="rating"><i class="fas fa-star"></i> ${movie_rating}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `)
        }
    }

    /**
     * Show or hide movies section
     * @param _option => Boolean
     */
    show_movies_section(_option) {
        if (_option) {
            $(`#${this._movies_section}`).slideDown()
        }
        else {
            $(`#${this._movies_section}`).slideUp()
        }
    }

    /**
     * Show or hide spinner
     * @param _option => Boolean
     */
    show_spinner(_option) {
        if (_option) {
            $(`#${this._spinner_id}`).show()
        }
        else {
            $(`#${this._spinner_id}`).hide()
        }
    }
}

const MoviesList_C = new MoviesList()
export default MoviesList_C
