// Inputs
import Input_Username from './inputs/Input_Username.js'
import Input_Password from './inputs/Input_Password.js';

// Request
import Requests from '../../../../helpers/requests/Requests.js';

// Alert
import Alert from '../../../../helpers/alert/Alert.js';


// Config
import CONFIG from '../../../../assets/js/Config.js';

import Auth from '../../../../helpers/auth/Auth.js';

class Signin {
    constructor() {}

    /**
     * Perform signin action
     */
    async perform_signin() {
        // await Auth.check_logged_state()
        // return
        // Get session data
        const session_token = sessionStorage.getItem('SYNCWATCH_token')

        // Show alert
        Alert.set_class('info')
        Alert.set_text('Please Wait...', true)
        Alert.show_alert(true)

        // Get email and password
        const username = Input_Username.get_value()
        const password = Input_Password.get_value()

        // Check email and password
        Input_Username.mark_error(username === undefined)
        Input_Password.mark_error(password === undefined)

        // Stop if one of the inputs is invalid
        // if (Input_Email.has_error || Input_Password.has_error) return

        // Send request
        const request_data = {
            username,
            password,
        }
        const request = new Requests(CONFIG.SERVER_SIGNIN, 'POST', request_data, '')
        const response = await request.send_request()

        console.log(response)

        if (response === undefined) {
            // Show alert
            Alert.set_class('danger')
            Alert.set_text('An error occurred during signing process', false)
        }

        if (response['state']) {
            // Show alert
            Alert.set_class('success')
            Alert.set_text('Logged in', false)

            // Save token into sessionStorage
            sessionStorage.setItem('SYNCWATCH_token', response['token']);

            // Redirect to dashboard
            window.location.href = "./index.html";
        }
        else {
            // Show alert
            Alert.set_class('danger')
            Alert.set_text(response['msg'], false)
        }
    }
}

export default new Signin()
