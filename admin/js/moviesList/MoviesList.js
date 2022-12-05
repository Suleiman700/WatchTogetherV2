
// Table
import Table from './Table.js'

// Request
import Requests from '../../../helpers/requests/Requests.js'

class MoviesList {
    constructor() {}

    // Get movies from database
    async get_movies() {
        Table.show_info_row(true, 'Getting movies from database...')

        const request = new Requests('/movies/get-movies', 'GET', {}, 'test')
        const response = await request.send_request()

        const movies_count = response['movies'].length

        // Movies found
        if (response['state']) {
            Table.show_info_row(false, '')
            for (const movie of response['movies']) {
                Table.add_row(movie)
            }
        }
        // No movies were found
        else {
            Table.show_info_row(true, 'No movies were found')
        }
    }
}

export default new MoviesList()
