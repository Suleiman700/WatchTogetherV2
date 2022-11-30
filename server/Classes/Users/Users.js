const DB = require("../../DB/DB")
const bcrypt = require("bcrypt")

class Users {
    constructor() {}


    /**
     * Find user by username
     * @param _username {string}
     * @returns {Promise<{data: {}, data_found: boolean}>}
     */
    async findByUsername(_username) {
        const dbo = DB._client.db(DB._db);

        const response = {
            data_found: false,
            data: {}
        }

        const data = await dbo.collection("users").find({username: _username}).toArray()

        if (data.length) {
            response['data_found'] = true
            response['data'] = data[0]
        }

        return response
    }

    /**
     * Verify user hashed password
     * @param _enteredPassword {string}
     * @param _dbHashedPassword {string}
     * @returns {boolean}
     */
    async verifyUserPassword(_enteredPassword, _dbHashedPassword) {

        // Simple code to hash a password
        // bcrypt.hash(_plainTextPasswordYouWantToHash, 10, (err, hashedPassword) => {
        //     // store hash in the database
        //     console.log(hashedPassword)
        // });

        const result = await bcrypt.compare(_enteredPassword, _dbHashedPassword);
        return result;
    }
}

module.exports = new Users();