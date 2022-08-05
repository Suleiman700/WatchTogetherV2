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
        document.getElementById("room_link").value = `${Socket_C._path}?room=${RoomData_C.room_number}`
    }

    // When user clicks the copy button inside the modal
    on_copy_click() {
        document.getElementById(this.copy_btn_id).addEventListener('click', () => {
            /* Get the text field */
            var copyText = document.getElementById("room_link");


            // return a promise
            function copyToClipboard(textToCopy) {
                // navigator clipboard api needs a secure context (https)
                if (navigator.clipboard && window.isSecureContext) {
                    // navigator clipboard api method'
                    return navigator.clipboard.writeText(textToCopy);
                } else {
                    // text area method
                    let textArea = document.createElement("textarea");
                    textArea.value = textToCopy;
                    // make the textarea out of viewport
                    textArea.style.position = "fixed";
                    textArea.style.left = "-999999px";
                    textArea.style.top = "-999999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    return new Promise((res, rej) => {
                        // here the magic happens
                        document.execCommand('copy') ? res() : rej();
                        textArea.remove();
                    });
                }
            }

            copyToClipboard(`${Socket_C._path}?room=${RoomData_C.room_number}`)
                .then(() => {
                    document.getElementById(this.copy_btn_id).innerText = 'Copied!'
                    setTimeout(() => {
                        document.getElementById(this.copy_btn_id).innerText = 'Copy Link'
                    }, 500)
                })
                .catch(() => console.log('error'));

            // Tell user that room link has been copied
            /* Alert the copied text */
            // alert("Room link has been copied!");
        })
    }
}

const Invite_C = new Invite()
export default Invite_C
