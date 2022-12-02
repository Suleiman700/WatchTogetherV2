import ButtonBuilder from '../../../../helpers/buttons/ButtonBuilder.js';
import AddMovie from '../AddMovie.js';

const Callback = () => {
    AddMovie.add_movie()
}

export default new ButtonBuilder('add_movie', 'form', Callback)
