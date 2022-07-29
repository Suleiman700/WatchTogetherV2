import SearchTable_C from './MovieSearch.js'

class MoviesTable {
    constructor() {
        this._start = 0
        this._index = 0
        this._limit = 12
        this._size = 0

        this._movies_tbl = 'moviesSection'
        this._pagination_section = 'sectionPagination' // Pagination section id

        this.next_page()
        this.on_movie_story_click()
    }

    // On next page click
    next_page() {
        $("body").on("click", ".movies_next_page", (e) => {
            $.ajax({
                url: "http://localhost:3000/get_action",
                type: "GET",
                data: {
                    'start': MoviesTable_C._start,
                    'limit': MoviesTable_C._limit,
                },
                success: (data) => {
                    // Set movies source
                    this._movies_list = data['action_movies']

                    // Set movies length
                    MoviesTable_C._size = data['size']
                    this.generate_movies_list()
                    this.show_spinner(false)
                    this.show_movies_section(true)

                    // Build pagination
                    MoviesTable_C.build_pagination()
                }
            });
        });
    }

    // Build movie pagination
    build_pagination() {
        this.clear_pagination()

        $('<nav>').attr({'class': 'text-center mt-3', 'aria-label': 'Page navigation example'})
            .append(
                $('<ul>').attr({'class': 'pagination justify-content-center'})
                    .append(
                        $('<li>').attr({'class': 'page-item'})
                            .append(
                                $('<a>').attr({'class': 'page-link movies_previous_page', 'href': 'javascript:void(0)', 'tabindex': '-1'}).text('Previous Page')
                            ),
                        $('<li>').attr({'class': 'page-item'})
                            .append(
                                $('<a>').attr({'class': 'page-link movies_next_page', 'href': 'javascript:void(0)'}).text('Next Page')
                            ),
                    )
            ).appendTo(`#${this._pagination_section}`)
    }

    // Clear pagination section
    clear_pagination() {
        document.getElementById(this._pagination_section).innerHTML = ''
    }

    // Build movies table
    build_table() {
        const section = document.getElementById('moviesSection')

        // Clear all movies
        section.innerHTML = ''
        for (const movie of SearchTable_C._search_results) {
            const movie_name = movie['name']
            const movie_poster = movie['poster']
            const movie_year = movie['year']
            const movie_language = movie['language']
            const movie_length = movie['length']
            const movie_link = movie['link']
            const movie_unique_id = movie['unique_id']
            const movie_rating = movie['rating']
            const movie_story = movie['story']

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
                            <li><a href="javascript:void(0)" class="popup-video btn btn-outline btn-danger text-danger movie_watch_now" data-uniqueid="${movie_unique_id}">Watch Now</a></li>
                            ${(movie_story.length > 0)? '<li><a href="javascript:void(0)" class="popup-video btn btn-outline btn-danger text-danger show_movie_story" data-movie-name="${movie_name}">Read Story</a></li>':''}
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
     * Build movies table when the user uses the search input
     * @param _search_string => String
     */
    build_table_with_search(_search_string) {
        // const movies_bk = SearchTable_C._search_results
        const section = document.getElementById('moviesSection')
        const no_results = document.getElementById('no_results')


        // Search in movies object
        const searched_movies = SearchTable_C._search_results.filter(movie => {
            return (movie.name).toLowerCase().includes(_search_string)
        })

        // console.log(searched_movies.length)

        // if (!searched_movies.length) {
        //     // Show no results label
        //     no_results.style.display = 'block'
        // }
        // else {
        //     no_results.style.display = 'none'
        // }

        // Clear all movies
        section.innerHTML = ''
        for (const movie of searched_movies) {
            const movie_name = movie['name']
            const movie_poster = movie['poster']
            const movie_year = movie['year']
            const movie_language = movie['language']
            const movie_length = movie['length']
            const movie_link = movie['link']
            const movie_unique_id = movie['unique_id']
            const movie_rating = movie['rating']
            const movie_story = movie['story']

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
                            <li><a href="javascript:void(0)" class="popup-video btn btn-outline btn-danger text-danger movie_watch_now" data-uniqueid="${movie_unique_id}">Watch Now</a></li>
                            ${(movie_story.length > 0)? '<li><a href="javascript:void(0)" class="popup-video btn btn-outline btn-danger text-danger show_movie_story" data-movie-name="${movie_name}">Read Story</a></li>':''}
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

    // When a user click on "Movie Story" button
    on_movie_story_click() {
        const movies_stories = document.querySelectorAll('.show_movie_story')

        $("body").on("click", ".show_movie_story", (e) => {
            // Get movie name from data
            const movie_name = $(e.target).data('movie-name')

            // Get movie story from object based on movie name
            const movie_story = SearchTable_C._search_results.find(movie => movie.name === movie_name)['story']

            // Show movie story modal
            $('#modal_movie_story').modal('show')
            $('#modal_movie_story #movie_story').text(movie_story)
        });
    }

    /**
     * Show or hide movies table
     * @param _option => Boolean
     * @param _use_animation => Boolean
     */
    show_table(_option, _use_animation=false) {
        if (_option) {
            if (_use_animation) $(`#${this._movies_tbl}`).slideDown()
            else $(`#${this._movies_tbl}`).show()
        }
        else {
            if (_use_animation) $(`#${this._movies_tbl}`).slideUp()
            else $(`#${this._movies_tbl}`).hide()
        }
    }

    /**
     * Show or hide spinner
     * @param _option => Boolean
     */
    show_spinner(_option) {
        if (_option) {
            $('#movies_loading').show()
        }
        else {
            $('#movies_loading').hide()
        }
    }
}

const MoviesTable_C = new MoviesTable
export default MoviesTable_C
