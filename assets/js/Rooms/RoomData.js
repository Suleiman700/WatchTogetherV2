import socket_c from "../Socket.js";
import Join_C from '../Rooms/Join.js'

class RoomData {
    constructor() {}

    // Get room host name
    get_host_name() {
        const name = socket_c._socket.emit('get_room_host_name', {room_num: Join_C._joined_roomnum}, function(callback) {
            if (callback.state) {
                console.log(callback.host_name)
                // console.log(callback)
                // Update host name label
                // document.getElementById('data_host_name').innerText = callback.host_name
            }
        })
    }
}

const RoomDataClass = new RoomData()
export default RoomDataClass
