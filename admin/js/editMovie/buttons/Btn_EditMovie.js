import ButtonBuilder from '../../../../helpers/buttons/ButtonBuilder.js';
import EditMovie from '../EditMovie.js';

const Callback = () => {
    EditMovie.edit_movie()
}

export default new ButtonBuilder('edit_movie', 'form', Callback)
