const mongoose = require("mongoose");

const schemaUser = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
});

// export model user with UserSchema
module.exports = mongoose.model("users", schemaUser);