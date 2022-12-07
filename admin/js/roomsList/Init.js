// Redirect non logged in user to the login page
import Auth from '../../../helpers/auth/Auth.js'
await Auth.redirect_non_logged()

// Load header
import Header from '../components/Header.js'
Header.load()

// Load sidebar
import Sidebar from '../components/Sidebar.js'
Sidebar.load()

// Load footer
import Footer from '../components/Footer.js'
Footer.load()

// Get rooms from server
import RoomsList from './RoomsList.js'
RoomsList.get_rooms()
