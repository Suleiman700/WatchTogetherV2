import socket_c from '../Socket.js'
import AvatarPicker_C from '../AvatarPicker.js'
import username_c from '../Inputs/Username.js'
import roomNum_c from '../Inputs/RoomNum.js'
import '../SocketOn/actually_join_room.js'

class Join {
    constructor() {
        this._join_btn_id = 'join_room'
        this._joined = false
        this._joined_roomnum = null
        this.join_room()
        this._username = '' // Store username of current user
    }

    join_room() {
        document.getElementById(this._join_btn_id).addEventListener('click', (e) => {
            e.preventDefault()

            // Get username
            const username = username_c.get_username()

            // Get room number
            const room_num = roomNum_c.get_number()

            // Get avatar image name
            const avatar = AvatarPicker_C.get_picked_avatar()

            // Check username
            if (!username.length) {
                username_c.set_alert_text('Surely you have a name right? Enter it below 😒')
            } else {
                username_c.set_alert_text('')
            }

            // Check room number
            if (!room_num.length) {
                roomNum_c.set_alert_text('You forgot to enter room number 😅')
            } else {
                roomNum_c.set_alert_text('')
            }

            // If username and room number are valid
            if (username.length && room_num.length) {
                // Send join request
                socket_c._socket.emit('join_room', {room_num, username, avatar}, function(callback) {

                    // Check if callback contains error message
                    if (!callback['state']) {
                        if (callback['cause'] === 'username_is_taken') {
                            username_c.set_alert_text(callback['msg'])
                        }
                    }
                    console.log(callback)
                    // This should only call back if the client is the host
                    // console.log(callback)
                    // if (callback.state) {
                    //     // console.log('im the host')
                    //     if (callback.action === 'join') {
                    //         console.log('lets join')
                    //     }
                    // }
                })
            }
        })
    }
}
const Join_C = new Join()
export default Join_C
