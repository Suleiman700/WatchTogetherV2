const DB = require('../../DB/DB.js')

class Movie {
    constructor() {}

    /**
     * Add movie
     * @param _movie_data {object}
     */
    async add_movie(_movie_data) {
        const dbo = DB._client.db(DB._db);

        let inserted = true

        await dbo.collection('movie').insertOne({
            'movie_name': _movie_data['movie_name'],
            'movie_year': _movie_data['movie_year'],
            'movie_genre': _movie_data['movie_genre'],
            'movie_desc': _movie_data['movie_desc'],
            'movie_rating': _movie_data['movie_rating'],
            'movie_poster': _movie_data['movie_poster'],
            'movie_src': _movie_data['movie_src'],
        }, function (error, result) {
            if (error) inserted = false
        })

        return inserted
    }
}

module.exports = new Movie()
