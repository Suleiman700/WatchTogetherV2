import Socket_C from '../Socket.js'
import Host_C from '../Buttons/MovieSection/Host.js'

/*
    Function called whenever a room host username has been changed and display the new host username
 */

class DisplayOnlineUsersCount {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('set_new_host_username', (data) => {
            const new_host_username = data['new_host_username']

            // Update host username
            Host_C.set_host_name(new_host_username)
        })
    }
}

const DisplayOnlineUsersCount_C = new DisplayOnlineUsersCount();
export default DisplayOnlineUsersCount_C
