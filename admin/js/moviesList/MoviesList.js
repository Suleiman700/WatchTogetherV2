
// Table
import Table from './Table.js'

// Request
import Requests from '../../../helpers/requests/Requests.js'

class MoviesList {
    constructor() {}

    // Get movies from database
    async get_movies() {
        const request = new Requests('/movies/get-movies', 'GET', {}, 'test')
        const response = await request.send_request()

        if (response['state']) {
            for (const movie of response['data']) {
                Table.add_row(movie)
            }
        }
    }
}

export default new MoviesList()
