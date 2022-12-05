import ButtonBuilder from '../../../../../helpers/buttons/ButtonBuilder.js';
import Btn_ConfirmDeleteMovie from './Btn_ConfirmDeleteMovie.js';
import Btn_CancelDeleteMovie from './Btn_CancelDeleteMovie.js';

const Callback = () => {
    // Hide action buttons
    Btn_ConfirmDeleteMovie.show_btn(false)
    Btn_CancelDeleteMovie.show_btn(false)

    // Redirect to movies list
    window.location.href = "./movies-list.html";
}

export default new ButtonBuilder('close_after_deleting', 'modal_delete_movie', Callback)
