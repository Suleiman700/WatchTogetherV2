import ButtonBuilder from '../../../../helpers/buttons/ButtonBuilder.js';

const Callback = () => {
    console.log('clicked')
    $('#modal_important_notes').modal('show');
}

export default new ButtonBuilder('open_important_notes', 'start', Callback)
