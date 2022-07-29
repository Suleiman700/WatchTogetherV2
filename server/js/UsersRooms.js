
class UsersRooms {
    constructor() {
        this._user_rooms = []
    }

    // Receive a socket.id (user) and set its room number
    set_user_room(socket_id, room_number) {
        this._user_rooms[socket_id] = room_number
    }

    // Receive a socket.id (user) and delete it
    delete_user_room(socket_id) {
        delete this._user_rooms[socket_id]
    }
}

const users_rooms_c = new UsersRooms();
module.exports = users_rooms_c
