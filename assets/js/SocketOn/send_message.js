import socket_class from '../Socket.js'
import Chat_C from '../Chat.js'


class SendMessageClass {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('send_message', (data) => {
            const sender = data['sender']
            const message = data['message']
            const avatar = data['avatar']
            Chat_C.new_message(sender, message, avatar)
            Chat_C.scroll_to_bottom()
        })
    }
}

const SendMessage_C = new SendMessageClass()
