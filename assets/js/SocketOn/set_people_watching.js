import socket_class from '../Socket.js'
import PeopleWatching_C from '../PeopleWatching.js';


class SetPeopleWatchingClass {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('set_people_watching', (data) => {
            const people_watching = data['people_watching']
            const room_host_name = data['room_host_name']
            PeopleWatching_C.generate_list(people_watching, room_host_name)
        })
    }
}

const SetPeopleWatching_C = new SetPeopleWatchingClass()
