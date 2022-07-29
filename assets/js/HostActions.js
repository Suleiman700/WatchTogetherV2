import socket_c from './Socket.js';

class HostActions {
    constructor() {
        this.kick_user()
    }

    // Kick user
    kick_user() {
        $(document.body).on('click', '.kick-user', function(e) {
            // Get parent li
            const parent_li = e.target.closest('li')
            const username_to_kick = parent_li.id

            if (username_to_kick.length) {
                socket_c._socket.emit('kick_user_from_room', {username_to_kick}, function(callback) {})
            }
        });
    }
}

const HostActions_C = new HostActions()
export default HostActions_C
