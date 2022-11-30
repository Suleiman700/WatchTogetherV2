
import ButtonBuilder from '../../../../../helpers/buttons/ButtonBuilder.js';
import Signin from '../Signin.js'

const Callback = () => {
    console.log('clicked')
    Signin.perform_signin()
}

export default new ButtonBuilder('signin', 'login_area', Callback)
