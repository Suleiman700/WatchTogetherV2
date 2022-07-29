import Socket_C from '../Socket.js'
import Players_C from '../Players/PlayersController.js'

/*
 Room host receives a request to sync all room users with his time
 */

class SyncUsersWithHostTime {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('sync_users_with_host_time', (data) => {
            const player_id = data['player_id']

            // Set current player id (By default its already set, but no worries if set it again)
            Players_C.set_current_player(player_id)

            // Get host time
            const host_time = Players_C.current_player_get_time()

            // Sync room users with host time
            Socket_C._socket.emit('sync_users_with_host_time', {host_time}, function(callback) {})
        })
    }
}

const SyncUsersWithHostTime_C = new SyncUsersWithHostTime();
export default SyncUsersWithHostTime_C
