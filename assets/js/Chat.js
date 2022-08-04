import socket_c from './Socket.js';
import Join_C from './Rooms/Join.js';
import AvatarPicker_C from './AvatarPicker.js';
import Time_C from './Helpers/Time.js';

class Chat {
    constructor() {
        this._chat_area = 'chat_area' // Chat area div
        this._chat_btn = 'toggle_chat' // Button that toggles chat
        this._chat_opened = false
        this._close_chat_btn = 'close_chat' // Button to close chat
        this._close_chat_btn2 = 'close_chat2' // Button to close chat
        this._send_msg_btn = 'send_message' // Button to send message
        this._message_input = 'message' // Message input
        this._chat_messages = 'chat_messages' // Div that contains chat messages

        // Chat settings
        this._btn_open_chat_settings = 'open_chat_settings' // Button to open chat settings modal
        this._chat_settings_modal = 'modal_chat_settings' // Chat settings modal ID
        this._SELECT_ID_chat_sound_enabled = 'chat_sound_enabled'
        this._chat_sound_enabled = true // Boolean, Enable or Disable message notification sound
        this._notification_sound = './assets/audio/chat_notification_sound.mp3'

        // Set default settings in chat settings modal
        this.set_default_settings()

        this.click_event()
        this.change_event()
    }

    // Show chat
    show() {
        // Set chat opened
        this._chat_opened = true

        // Open chat
        document.getElementById(this._chat_area).style.display = 'block'

        // Scroll chat to bottom
        this.scroll_to_bottom()
    }

    // Hide chat
    hide() {
        // Set chat closed
        this._chat_opened = false

        // Close chat
        document.getElementById(this._chat_area).style.display = 'none'
    }

    click_event() {
        // On chat close button
        document.getElementById(this._close_chat_btn).addEventListener('click', () => {
            this.hide()
        })

        document.getElementById(this._close_chat_btn2).addEventListener('click', () => {
            // Show main chat open button
            document.getElementById(this._chat_btn).style.display = 'block'

            // Hide chat block
            this.hide()
        })

        // On chat toggle button
        document.getElementById(this._chat_btn).addEventListener('click', () => {
            // Hide main chat open button
            document.getElementById(this._chat_btn).style.display = 'none'

            // If chat is opened
            if (this._chat_opened) {
                this.hide()
            }
            else {
                this.show()
            }
        })

        // On chat send message button
        document.getElementById(this._send_msg_btn).addEventListener('click', () => {
            const message = document.getElementById(this._message_input).value
            if (message.length) {
                // Clear input
                document.getElementById(this._message_input).value = ''

                socket_c._socket.emit('send_message', {message}, function(callback) {})
            }
        })

        // Open chat settings modal
        document.getElementById(this._btn_open_chat_settings).addEventListener('click', () => {
            $(`#${this._chat_settings_modal}`).modal('show')
        })
    }

    // Elements on change event
    change_event() {
        // On chat sound change
        document.getElementById(this._SELECT_ID_chat_sound_enabled).addEventListener('change', (e) => {
            this._chat_sound_enabled = e.target.value
        })
    }

    // New message
    new_message(sender, message, avatar) {
        const time = Time_C.time_with_seconds()
        const avatar_images_path = AvatarPicker_C._images_path
        let html = ``

        // Check if received or sent message
        const user_username = Join_C._username
        if (user_username === sender) {
            html = `
                <div class="d-flex justify-content-end p-3">
                    <div class="message-sent mr-2 p-3"><strong><ins>${sender}</ins></strong> <span class="text-muted">${time}</span><br>${message}</div>
                    <img src="${avatar_images_path}${avatar}" width="30" height="30">
                </div>`
        } else {
            html = `
                <div class="d-flex flex-row p-3">
                    <img src="${avatar_images_path}${avatar}" width="30" height="30">
                    <div class="message-received p-3"><strong><ins>${sender}</ins></strong> <span class="text-muted">${time}</span><br>${message}</div>
                </div>`

            if (!this._chat_opened) {
                this.play_notification_sound()
            }
        }


        document.getElementById(this._chat_messages).innerHTML += html
    }

    /**
     * Add new info message to chat
     * Example: User Has Left The Room
     * @param _message {String}
     */
    add_info_message(_message) {
        const time = Time_C.time_with_seconds()
        let html = `
            <div class="d-flex justify-content-center p-3">
                <div class="message-received p-3 text-center">
                    ${_message}
                    <br>
                    ${time}
                </div>
            </div>
        `

        document.getElementById(this._chat_messages).innerHTML += html
    }

    // Scroll chat to bottom
    scroll_to_bottom() {
        const div = document.getElementById(this._chat_messages)
        div.scrollTop = div.scrollHeight;
    }

    // Play notification sound
    play_notification_sound() {
        if (this._chat_sound_enabled) {
            new Audio(this._notification_sound).play()
        }
    }

    // Set default settings in chat settings modal
    set_default_settings() {
        // Set chat sound
        document.getElementById(this._SELECT_ID_chat_sound_enabled).value = this._chat_sound_enabled
    }

    // Show actual chat button that uses to open the chat
    show_actual_chat_btn() {
        $('.chat-box').show()
    }

}

const Chat_C = new Chat();
export default Chat_C
