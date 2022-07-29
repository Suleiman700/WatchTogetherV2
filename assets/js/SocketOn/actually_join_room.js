import socket_class from '../Socket.js'
import Join_C from '../Rooms/Join.js'
import RoomData_C from '../Rooms/RoomData.js'
import Players_C from '../Players/PlayersController.js'
import Chat_C from '../Chat.js';
import Reactions_C from '../Reactions.js';

/*
    Event that happens after the user sends a room join request, Then the server emits [actually_join_room]
 */

class ActuallyJoinRoom {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('actually_join_room', (data) => {
            const avatar = data['avatar']
            const username = data['username']
            const room_number = data['room_number']
            const player_id = data['current_player']
            const movie_source = data['current_video']

            // If not joined yet
            if (!Join_C._joined) {
                // Set client current player
                Players_C.set_current_player(player_id)
                Players_C.hide_all()
                Players_C.show_current_player()

                // Set client current player source
                Players_C.set_player_source(player_id, movie_source)

                console.log('You have joined the room:', room_number)
                Join_C._joined = true
                Join_C._joined_roomnum = room_number
                Join_C._username = username

                document.getElementById('section_welcome').style.display = 'none'
                document.getElementById('section_movie').style.display = 'block'

                // Scroll to top
                $(window).scrollTop(0);

                RoomData_C.get_host_name()

                // Show actual chat button
                Chat_C.show_actual_chat_btn()

                // Show actual reactions button
                Reactions_C.show_actual_reactions_btn()
            }
        })
    }
}

const actually_join_room = new ActuallyJoinRoom()
