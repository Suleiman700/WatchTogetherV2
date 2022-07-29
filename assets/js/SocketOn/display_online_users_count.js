import Socket_C from '../Socket.js'

/*
    Display count of the online users
 */

class DisplayOnlineUsersCount {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('display_online_users_count', (data) => {
            console.log('here1')
            document.getElementById('watching_now_count').innerHTML = data['online_users_count']
        })
    }
}

const DisplayOnlineUsersCount_C = new DisplayOnlineUsersCount();
export default DisplayOnlineUsersCount_C
