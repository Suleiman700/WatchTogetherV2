
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

    }
}

export default new RoomsList()