// Initialize buttons
import ButtonHandler from "../../../../helpers/buttons/ButtonHandler.js";
import Btn_Signin from './buttons/Btn_Signin.js';
const buttons = [Btn_Signin]
ButtonHandler.declareClicksEvents(buttons)

// Initialize inputs
import Input_Username from './inputs/Input_Username.js';
import Input_Password from './inputs/Input_Password.js';

// Initialize alert
import Alert from '../../../../helpers/alert/Alert.js';
Alert.set_id('alert-msg')
