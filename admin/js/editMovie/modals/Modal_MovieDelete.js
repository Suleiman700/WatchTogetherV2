
// Request
import Requests from '../../../../helpers/requests/Requests.js'
import Btn_ConfirmDeleteMovie from './buttons/Btn_ConfirmDeleteMovie.js';
import Btn_CancelDeleteMovie from './buttons/Btn_CancelDeleteMovie.js';
import Btn_CloseAfterDeleting from './buttons/Btn_CloseAfterDeleting.js'

class Modal_MovieDelete {
    constructor() {
    }

    /**
     * Show or hide the modal
     * @param _option {boolean}
     */
    show_modal(_option) {
        $('#modal_delete_movie').modal(_option? 'show': 'hide');
        this.set_body_text('Do you really want to delete this movie ?');
    }

    /**
     * Set modal body text
     * @param _text {string}
     */
    set_body_text(_text) {
        $('#modal_delete_movie #modal_body_text').text(_text);
    }


    /**
     * Delete movie
     * @param _movie_id {string}
     */
    async delete_movie(_movie_id) {
        const request = new Requests('/movies/delete', 'DELETE', {movie_id: _movie_id})
        const response = await request.send_request()

        // No response
        if (response === undefined) {
            this.set_body_text('Ops, An error occurred :/')
        }

        // Movie was not found
        if (!response['movie_found']) {
            this.set_body_text('Movie not found')
        }
        // Movie was deleted
        else if (response['movie_deleted']) {
            this.set_body_text('Movie deleted successfully')

            // Hide action buttons
            Btn_ConfirmDeleteMovie.show_btn(false)
            Btn_CancelDeleteMovie.show_btn(false)

            // Show button
            Btn_CloseAfterDeleting.show_btn(true)

            // Set timeout after deleting
            setTimeout(() => {
                // Redirect to movies list
                window.location.href = "./movies-list.html";
            }, 1000)

        }
        // Movie was not deleted
        else if (!response['movie_deleted']) {
            this.set_body_text('An error occurred while deleting the movie')
        }
    }
}

export default new Modal_MovieDelete()