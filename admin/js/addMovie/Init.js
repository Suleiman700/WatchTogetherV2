// Load header
import Header from '../components/Header.js'
Header.load()

// Load sidebar
import Sidebar from '../components/Sidebar.js'
Sidebar.load()

// Load footer
import Footer from '../components/Footer.js'
Footer.load()

// Buttons
import ButtonHandler from "../../../helpers/buttons/ButtonHandler.js";
import Btn_AddMovie from './buttons/Btn_AddMovie.js';
const buttons = [Btn_AddMovie]
ButtonHandler.declareClicksEvents(buttons)
