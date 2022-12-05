const DB = require('../../DB/DB.js')
const {ObjectId} = require("mongodb");

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
            'active': true
        }, function (error, result) {
            if (error) inserted = false
        })

        return inserted
    }

    /**
     * Edit movie
     * @param _movie_data {object}
     * @returns {Promise<boolean>}
     */
    async edit_movie(_movie_data) {
        const dbo = DB._client.db(DB._db);

        let updated = true

        await dbo.collection('movie').update(
            {
                _id: ObjectId(_movie_data['movie_id'])
            },
            {
                $set:{
                    'movie_name': _movie_data['movie_name'],
                    'movie_year': _movie_data['movie_year'],
                    'movie_genre': _movie_data['movie_genre'],
                    'movie_desc': _movie_data['movie_desc'],
                    'movie_rating': _movie_data['movie_rating'],
                    'movie_poster': _movie_data['movie_poster'],
                    'movie_src': _movie_data['movie_src'],
                    'active': _movie_data['active'] === 'true'
                }
            }, function(error, result) {
                if (error) updated = false
            })

        return updated
    }

    /**
     * Get movies
     */
    async get_movies() {
        const dbo = DB._client.db(DB._db);

        const data = await dbo.collection('movie').find({
            // active: true
        }).project({
            movie_name: 1,
            movie_year: 1,
            movie_genre: 1,
            movie_desc: 1,
            movie_rating: 1,
        }).toArray();


        return data
    }

    /**
     * Check if movie exist
     * @param _movie_id {string}
     * @returns {Promise<object>}
     */
    async check_movie_exist(_movie_id) {
        const data = {
            found: true,
            movie_data: []
        }

        const dbo = DB._client.db(DB._db);

        const searched_movie = await dbo.collection('movie').find({
            _id: ObjectId(_movie_id)
        }).toArray();

        if (searched_movie.length) {
            data['found'] = true
            data['movie_data'] = searched_movie[0]
        }

        return data
    }
}

module.exports = new Movie()
