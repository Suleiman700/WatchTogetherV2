// Load header
import Header from '../components/Header.js'
Header.load()

// Load sidebar
import Sidebar from '../components/Sidebar.js'
Sidebar.load()

// // Load footer
// import Footer from '../components/Footer.js'
// Footer.load()

// Buttons
import ButtonHandler from "../../../helpers/buttons/ButtonHandler.js";
import Btn_EditMovie from './buttons/Btn_EditMovie.js';
import Btn_DeleteMovie from './buttons/Btn_DeleteMovie.js';
import Btn_ConfirmDeleteMovie from './modals/buttons/Btn_ConfirmDeleteMovie.js';
import Btn_CloseAfterDeleting from './modals/buttons/Btn_CloseAfterDeleting.js';
import Btn_CancelDeleteMovie from './modals/buttons/Btn_CancelDeleteMovie.js';
const buttons = [Btn_EditMovie, Btn_DeleteMovie, Btn_ConfirmDeleteMovie, Btn_CloseAfterDeleting, Btn_CancelDeleteMovie]
ButtonHandler.declareClicksEvents(buttons)

// Initialize alert
import Alert from '../../../helpers/alert/Alert.js';
Alert.set_id('alert-msg')

// Check if movie exist
import EditMovie from './EditMovie.js';
EditMovie.get_movie_to_edit()

