import ButtonBuilder from '../../../../../helpers/buttons/ButtonBuilder.js';
import Modal_MovieDelete from '../Modal_MovieDelete.js';
import EditMovie from '../../EditMovie.js';

const Callback = () => {
    Modal_MovieDelete.set_body_text('Deleting movie, please wait...');

    // Delete movie
    const movie_id = EditMovie.get_url_param()
    Modal_MovieDelete.delete_movie(movie_id)
}

export default new ButtonBuilder('confirm_delete_movie', 'modal_delete_movie', Callback)
