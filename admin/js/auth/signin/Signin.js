// Inputs
import Input_Email from './inputs/Input_Email.js'
import Input_Password from './inputs/Input_Password.js';

// Request
import Requests from '../../../../helpers/requests/Requests.js';

// Config
import CONFIG from '../../../../assets/js/Config.js';

class Signin {
    constructor() {}

    /**
     * Perform signin action
     */
    async perform_signin() {
        // Get email and password
        const email = Input_Email.get_value()
        const password = Input_Password.get_value()

        // Check email and password
        Input_Email.mark_error(email === undefined)
        Input_Password.mark_error(password === undefined)

        // Stop if one of the inputs is invalid
        // if (Input_Email.has_error || Input_Password.has_error) return

        // Send request
        const request_data = {
            email,
            password,
        }
        const request = new Requests(CONFIG.SERVER_SIGNIN, 'POST', request_data, '')
        const response = await request.send_request()

        console.log(response)
    }
}

export default new Signin()