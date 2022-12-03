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
const buttons = [Btn_EditMovie]
ButtonHandler.declareClicksEvents(buttons)

// Initialize alert
import Alert from '../../../helpers/alert/Alert.js';
Alert.set_id('alert-msg')

// Check if movie exist
import EditMovie from './EditMovie.js';
EditMovie.get_movie_to_edit()

