
import Table from './Table.js'

// Request
import Requests from '../../../helpers/requests/Requests.js'

class RoomsList {
    constructor() {}

    /**
     * Get rooms from server
     */
    async get_rooms() {
        Table.show_info_row(true, 'Getting rooms list...')

        const request = new Requests('/rooms/get-rooms', 'GET', {})
        const response = await request.send_request()

        if (response['rooms_found']) {
            // Hide info row
            Table.show_info_row(false)

            const rooms = response['rooms']
            for (const room of rooms) {
                Table.add_row(room)
            }
        }
        else {
            Table.show_info_row(true, 'No rooms have been found.')
        }

    }
}

export default new RoomsList()
