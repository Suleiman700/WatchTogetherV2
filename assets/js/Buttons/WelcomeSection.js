import Generator_C from '../Helpers/Generator.js'
import RoomNum_C from '../Inputs/RoomNum.js'
import RoomNum_c from "../Inputs/RoomNum.js";

class WelcomeSectionButtons {
    constructor() {
        this._random_btn_id = 'random_room_number'

        this.random_room_number()
        this.scroll_to_join_section()
    }

    // Generate random room number
    random_room_number() {
        const button = document.getElementById(this._random_btn_id)
        button.addEventListener('click', () => {
            // Set input value
            document.getElementById(RoomNum_C._input_id).value = Generator_C.random_room_number(10)

            // Remove room number alert
            RoomNum_c.set_alert_text('')
        })
    }

    scroll_to_join_section() {
        document.getElementById('scroll_to_join_section').addEventListener('click', () => {
            document.getElementById('section_join').scrollIntoView();
            // $(window).scrollTop($('#section_join').offset().top - 10);
        })
    }
}

const WelcomeSectionButtonsClass = new WelcomeSectionButtons()
export default WelcomeSectionButtonsClass
