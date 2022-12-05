// Request
import Requests from '../../helpers/requests/Requests.js';

// Config
import CONFIG from '../../assets/js/Config.js';

class Auth {
    constructor() {}

    // Check if the user is logged
    async check_logged_state() {
        try {
            const request = new Requests(CONFIG.SERVER_AUTHENDPOINT, 'GET', {}, '')
            const response = await request.send_request()
            return !!response['isLogged'];
        }
        catch (e) {
            return false
        }
    }

    // Redirect user to login page
    redirect_to_login() {
        window.location.href = "./signin.html";
    }

    // Redirect non logged in users to the login page
    async redirect_non_logged() {
        const isLogged = await this.check_logged_state()
        if (!isLogged) this.redirect_to_login()
    }
}

export default new Auth()
