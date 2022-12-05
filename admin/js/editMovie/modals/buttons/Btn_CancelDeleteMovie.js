import ButtonBuilder from '../../../../../helpers/buttons/ButtonBuilder.js';
import Modal_MovieDelete from '../Modal_MovieDelete.js'

const Callback = () => {
    // Hide modal
    Modal_MovieDelete.show_modal(false)
}

export default new ButtonBuilder('cancel_delete_movie', 'modal_delete_movie', Callback)
