import ButtonBuilder from '../../../../helpers/buttons/ButtonBuilder.js';
import Modal_MovieDelete from '../modals/Modal_MovieDelete.js';

const Callback = () => {
    Modal_MovieDelete.show_modal(true)
}

export default new ButtonBuilder('delete_movie', 'form', Callback)
