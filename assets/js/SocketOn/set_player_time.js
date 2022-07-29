import Socket_C from '../Socket.js'
import Players_C from '../Players/PlayersController.js'

/*
    Users receive a request to set their player time
 */

class SetPlayerTime {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('set_player_time', (data) => {
            const time = data['time']
            Players_C.current_player_set_time(time)
        })
    }
}

const SetPlayerTime_c = new SetPlayerTime();
export default SetPlayerTime_c
