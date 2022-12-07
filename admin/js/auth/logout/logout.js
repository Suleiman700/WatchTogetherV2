
// Delete client token
import {clear_session_storage} from "../../../../helpers/sessionStorage/sessionStorage.js";
clear_session_storage('token')

// Redirect to login page
window.location.href = "./signin.html";