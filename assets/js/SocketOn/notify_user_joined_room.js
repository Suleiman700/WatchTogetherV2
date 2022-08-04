import socket_class from '../Socket.js'
import Notify_C from '../Notify.js'
import Chat_C from '../Chat.js'

class NotifyUserJoinedRoom {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('notify_user_joined_room', (data) => {
            const user_username = data['user_username']
            Notify_C.notify_user_joined_room(user_username)

            // Add info message to chat
            Chat_C.add_info_message(`<span class="text-danger">${user_username}</span> Has <span class="text-success">Joined</span> The Room`)
        })
    }
}

const NotifyUserJoinedRoom_C = new NotifyUserJoinedRoom()
