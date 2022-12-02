// Auth
import Auth from '../../../helpers/auth/Auth.js'


// Redirect non logged in user to the login page
await Auth.redirect_non_logged()
