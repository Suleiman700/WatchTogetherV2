// Redirect non-logged-in user to the login page
import Auth from '../../../helpers/auth/Auth.js'
await Auth.redirect_non_logged()

// Load header
import Header from '../components/Header.js'
Header.load()

// Load sidebar
import Sidebar from '../components/Sidebar.js'
Sidebar.load()

// // Load footer
// import Footer from '../components/Footer.js'
// Footer.load()

// Initialize alert
import Alert from '../../../helpers/alert/Alert.js';
Alert.set_id('alert-msg')

// Buttons
import ButtonHandler from "../../../helpers/buttons/ButtonHandler.js";
import Btn_AddMovie from './buttons/Btn_AddMovie.js';
const buttons = [Btn_AddMovie]
ButtonHandler.declareClicksEvents(buttons)

// Inputs
import FileInputHandler from '../../../helpers/files/FileInputHandler.js';
import FileInput_MoviePoster from './fileInput/FileInput_MoviePoster.js';
const filesinputs = [FileInput_MoviePoster]
FileInputHandler.declareChangeEvents(filesinputs)
