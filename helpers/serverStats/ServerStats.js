// Request
import Requests from '../../helpers/requests/Requests.js';

class ServerStats {
    constructor() {}

    // Get total rooms count
    async get_stats() {
        const request = new Requests('/stats/get-stats', 'GET', {}, '')
        return await request.send_request()
    }
}

export default new ServerStats()
