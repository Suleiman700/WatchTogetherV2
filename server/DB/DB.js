const {MongoClient} = require("mongodb");

class DB {
    constructor() {
        this._connect_string = 'mongodb+srv://mongodb:mongodb@cluster0.ymwoo.mongodb.net/test?authSource=admin&replicaSet=atlas-lyl1kj-shard-0&readPreference=primary&ssl=true'
        this._db = 'watch_together'
        this._movies_tbl = 'movies'
        this._client = ''

        this.connect()
    }

    // Connect to MongoDB
    async connect() {
        this._client = new MongoClient(this._connect_string)

        try {
            await this._client.connect();
            console.log('connected to MongoDB')
        } catch (e) {
            console.error(e);
        }
    }

    // Search movies
    search_movies(genre, rating, year, movie_name, callBack) {
        const dbo = this._client.db(this._db);

        // Prepare genre
        let genre_col
        const valid_genres = ['action', 'sci-fi', 'anime', 'ramadan', 'translated', 'netflix', 'comedy', 'thriller', 'mystery', 'family', 'kids', 'war', 'sport', 'short', 'fantasy', 'music', 'biography', 'documentary', 'romantic', 'historic', 'drama', 'horror', 'crime', 'adventure', 'western']
        if (valid_genres.includes(genre)) {
            genre_col = {$in: [genre]}
        }
        else {
            genre_col = {$exists: true}
        }

        // Prepare rating
        let rating_col
        if (!isNaN(rating)) {
            rating_col = {$gte: rating}
        }
        else {
            rating_col = {$exists: true}
        }

        // Prepare year
        let year_col
        if (!isNaN(year)) {
            year_col = year
        }
        else {
            // Get any year
            year_col = {$exists: true}
        }

        // Prepare name
        let name_col
        if (movie_name.length > 0) {
            name_col = {'$regex': movie_name, '$options': 'i'}
        } else {
            name_col = {$exists: true}
        }

        dbo.collection(this._movies_tbl).find({
            'genre': genre_col,
            'rating': rating_col,
            'year': year_col,
            'name': name_col
        }).project({
            name: 1,
            genre: 1,
            year: 1,
            length: 1,
            rating: 1,
            poster: 1,
            story: 1,
            link: 1,
            unique_id: 1
        }).toArray(function(err, result) {
            if (err) throw err;
            return callBack(result);
            // console.log(result);
            // db.close();
        });
    }

    // Check movie last generated
    check_last_generated(movie_unique_id, callBack) {
        const dbo = this._client.db(this._db);

        dbo.collection(this._movies_tbl).find({
            'unique_id': String(movie_unique_id),
        }).project({
            last_generated: 1,
            link: 1
        }).toArray(function(err, result) {
            if (err) throw err;
            return callBack(result);
        });
    }

    // Update movie link and last generated
    update_link_and_last_generated(movie_unique_id, movie_link) {
        const dbo = this._client.db(this._db);

        dbo.collection(this._movies_tbl).update({
            'unique_id': String(movie_unique_id)
        }, {
            $set: {
                link: movie_link,
                last_generated: Math.floor(Date.now() / 1000)
            }
        }, false, true)

    }
}

module.exports = new DB();
