import Socket_C from '../../Socket.js'
import RoomData_C from '../../Rooms/RoomData.js'

class Invite {
    constructor() {
        this.btn_id = 'invite' // Open invite modal button ID
        this.copy_btn_id = 'copy_room_link' // Copy button ID
        this.modal_id = 'modal_invite' // Modal ID

        this.on_show_modal()
        this.on_copy_click()
    }

    // When user click Invite button > Open modal
    on_show_modal() {
        document.getElementById(this.btn_id).addEventListener('click', () => {
            // Show modal
            $(`#${this.modal_id}`).modal('show')

            // Set room link
            this.set_room_link()
        })
    }

    set_room_link() {
        document.getElementById("room_link").value = `${Socket_C._path}/room=${RoomData_C.room_number}`
    }

    // When user clicks the copy button inside the modal
    on_copy_click() {
        document.getElementById(this.copy_btn_id).addEventListener('click', () => {
            /* Get the text field */
            const copyText = document.getElementById("room_link");

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            navigator.clipboard.writeText(copyText.value);

            // Tell user that room link has been copied
            document.getElementById(this.copy_btn_id).innerText = 'Copied!'
            setTimeout(() => {
                document.getElementById(this.copy_btn_id).innerText = 'Copy Link'
            }, 500)

            /* Alert the copied text */
            // alert("Copied the text: " + copyText.value);
        })
    }
}

const Invite_C = new Invite()
export default Invite_C
