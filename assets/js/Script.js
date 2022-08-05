import socket_class from './Socket.js'
import './Rooms/Join.js'
import RoomNum_C from './Inputs/RoomNum.js'

import './PlyrOverlay.js'

// General
import './AvatarPicker.js'
import './Chat.js'
import './FullScreen.js'
import './HostActions.js'
import './Reactions.js'

// Socket Events
import './SocketOn/actually_join_room.js'
import './SocketOn/movie_play.js'
import './SocketOn/movie_pause.js'
import './SocketOn/movie_seek.js'
import './SocketOn/set_current_player.js'
import './SocketOn/set_player_source.js'
import './SocketOn/set_people_watching.js'
import './SocketOn/set_avatar_picker_images.js'
import './SocketOn/send_message.js'
import './SocketOn/set_users_movie_state.js'
import './SocketOn/kick_user.js'
import './SocketOn/display_online_users_count.js'
import './SocketOn/show_emoji.js'
import './SocketOn/sync_users_with_host_time.js'
import './SocketOn/set_player_time.js'
import './SocketOn/show_movies.js'
import './SocketOn/show_searched_movies.js'
import './SocketOn/notify_user_joined_room.js'
import './SocketOn/notify_user_left_room.js'
import './SocketOn/set_new_host_username.js'

// Welcome Section Buttons
import './Buttons/WelcomeSection.js'

// Movie Section Buttons
import './Buttons/MovieSection/Play.js'
import './Buttons/MovieSection/Pause.js'
import './Buttons/MovieSection/Sync.js'
import './Buttons/MovieSection/SetSource.js'
import './Buttons/MovieSection/EnterFullscreen.js'
import './Buttons/MovieSection/Invite.js'

// Players
import PlayerControllerClass from './Players/PlayersController.js'
import PlyrClass from './Players/Plyr.js'
import YouTubeClass from './Players/YouTube.js'

// Movie search
import './MoviesList/MovieSearch.js'

import './Orientation.js'


// socket_class._socket.emit('send message', 'hello there');

// socket_class._socket.on('message', function(data) {
//     console.log(data)
// })

console.log('here')

function check_socket_connection() {
    socket_class.check_if_connected()
}

// Check if url has room parameter
$(document).ready(function() {
    if (window.location.href.indexOf("room") > -1) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const room_number = urlParams.get('room')

        RoomNum_C.set_value(room_number)
    }
});
