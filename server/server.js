const Rooms = require('./js/Rooms')
const AvatarsC = require('./js/Avatars')
const UsersRooms = require('./js/UsersRooms')
const Movies = require('./js/Movies')

// DB
const DB_C = require('./DB/DB')

// Players
const YouTubePlyr = require('./js/Players/YT_Player')
const DLPlayer = require('./js/Players/DL_Player')
const Users = require('./Classes/Users/Users')

const https = require('https');
const request = require('request');
const cors = require('cors')
const jwt = require("jsonwebtoken");
const auth = require("./auth/auth");
const formidable = require('formidable');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Movie = require('./Classes/movie/Movie')

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const express = require('express');
const fs = require("fs");
const {MongoClient} = require('mongodb');
const bodyParser = require("body-parser");
const http = require("http");
// const username = require("../assets/js/Inputs/Username");
let app = express();
// app = require('express')();
const server = require('http').createServer();
const io = require('socket.io')(server)

const links = [] // Store temp access to movies links

function create_temp_access(movie_name) {

}

// user_rooms = []

// Connect to MongoDB
DB_C.connect()


io.on('connection', (socket, test) => {
    // Get avatars
    const avatars_folder = '../assets/images/avatars';
    fs.readdir(avatars_folder, (err, files) => {
        const avatars_images = []
        files.forEach(image_name => {
            avatars_images.push(image_name)
        });
        socket.emit('set_avatar_picker_images', {
            'avatars_images': avatars_images,
        })
    });

    // Display count of online users
    let online_users_count = 0
    for (const room of Rooms._global) {
        // Get room data
        const room_data = io.sockets.adapter.rooms[`room-${room}`]
        // Count users in each room
        const room_users_count = Object.keys(room_data['users']).length
        // Sum
        online_users_count += room_users_count
    }
    io.emit('display_online_users_count', {online_users_count})

    console.log('connected')


    socket.on('event', data => { /* … */ });
    // socket.on('disconnect', () => { /* … */ });

    // Receive room number and return its host
    socket.on('get_room_host_name', (data, callback) => {
        callback({
            state: true,
            host_name: io.sockets.adapter.rooms[`room-${data.room_num}`].hostName
        })
    });

    // Set socket player id
    socket.on('socket_set_player_id', (data, callback) => {
        const player_id = data['player_id']

        console.log('socket_set_player_id', player_id)

        // Set socket player
        io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer = player_id

        // Update users player
        io.sockets.in(`room-${socket.roomnum}`).emit('set_current_player', {
            'player_id': player_id,
            'username_who_changed_player': socket.username
        })

    })

    // Play socket movie
    socket.on('movie_play', function () {
        const current_room_player = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer
        // socket.broadcast.to(`room-${socket.roomnum}`).emit('movie_play', {
        io.sockets.in(`room-${socket.roomnum}`).emit('movie_play', {
            'player_id': current_room_player
        })
    })

    // Pause socket movie
    socket.on('movie_pause', function () {
        const current_room_player = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer
        console.log('current_room_player', current_room_player)
        io.sockets.in(`room-${socket.roomnum}`).emit('movie_pause', {
            'player_id': current_room_player
        })
    })

    // // Sync socket movie
    // socket.on('movie_pause', function () {
    //     const current_room_player = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer
    //     console.log(current_room_player)
    //     io.sockets.in(`room-${socket.roomnum}`).emit('movie_pause', {
    //         'player_id': current_room_player
    //     })
    // })

    // Seek socket movie
    socket.on('movie_seek', function (data) {
        const current_time = data.current_time
        console.log('seek to: ' + current_time)
        socket.broadcast.to(`room-${socket.roomnum}`).emit('movie_seek', {current_time});
    })

    // Sync socket movie
    socket.on('movie_sync', function (data) {
        // Get room host data
        const room_host_name = io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName

        // Get room host socket id
        const users = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users
        const host_socket_id = users.find(user => user.username === room_host_name)['socket_id']

        // Get current room player id
        const current_room_player = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer

        // Ask the host to sync room users
        io.to(host_socket_id).emit('sync_users_with_host_time', {'player_id': current_room_player});
    })

    // Sync all users with host time
    socket.on('sync_users_with_host_time', function (data) {
        const host_time = data['host_time']
        io.sockets.in(`room-${socket.roomnum}`).emit('set_player_time', {'time': host_time})
    })

    // Set socket movie source
    socket.on('movie_set_source', function (data) {
        const movie_source = data['movie_source']

        // Set source
        const current_player = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer
        switch(current_player) {
            case 0:
                io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentVideo.yt = movie_source
                break;
            case 1:
                io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentVideo.dl = movie_source
                break;
        }

        // Change users source
        io.sockets.in(`room-${socket.roomnum}`).emit('set_player_source', {
            'player_id': current_player,
            'username_who_changed_source': socket.username,
            'movie_source': movie_source
        })
    })

    socket.on('join_room', function (data, callback) {
        let host = null
        let init = false
        let do_join = true

        // Store socket room number and username
        socket.avatar = data['avatar'] // Avatar image name, Example: avatar1.png
        socket.username = data['username']
        socket.roomnum = data['room_num']

        // Check if user already joined a room
        if (socket.id in UsersRooms._user_rooms) {
            callback({
                state: false,
                msg: 'You have already joined a room'
            })
            do_join = false
        }

        // Check if the room exists
        if (io.sockets.adapter.rooms[`room-${socket.roomnum}`] === undefined) {
            // Create room
            io.sockets.adapter.rooms[`room-${socket.roomnum}`] = []

            // Set user as host
            host = socket.id

            // Set initialize as true
            init = true

            // Save user room into object
            UsersRooms.set_user_room(socket.id, socket.roomnum)

            // socket.send('new room')
        }
        else {
            host = io.sockets.adapter.rooms[`room-${socket.roomnum}`].host

            // Check if username is taken
            if (io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.find(user => user.username === socket.username)) {
                callback({
                    state: false,
                    cause: 'username_is_taken',
                    msg: 'Please choose another username'
                })
                do_join = false
            } else {
                // Save user room into object
                UsersRooms.set_user_room(socket.id, socket.roomnum)
            }
        }


        // Adds the room to a global array
        if (!Rooms._global.includes(socket.roomnum)) {
            Rooms._global.push(socket.roomnum);
        }

        socket.join(`room-${socket.roomnum}`)

        if (init) {
            // Set host
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].host = host

            // Set host username
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName = socket.username

            // Set public status
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].public = false

            // Set room password
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].password = ''

            // Keep list of online users
            // io.sockets.adapter.rooms[`room-${socket.roomnum}`].users = [socket.username]
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].users = [{
                'username': socket.username,
                'avatar': socket.avatar,
                'socket_id': socket.id
            }]

            // Set Default Player
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer = 0

            // Set default players videos
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentVideo = {
                yt: YouTubePlyr._defaultVideo,
                dl: DLPlayer._defaultVideo
            }
        }


        if (do_join) {
            // Get current player
            const current_player = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer


            // Check if username already in room users
            // if (io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.indexOf(socket.username) === -1) {
            //     Push username into room users
                // io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.push(socket.username)
            // }
            if (!io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.find(user => user.username === socket.username)) {
                // Push username into room users
                io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.push({
                    'username': socket.username,
                    'avatar': socket.avatar,
                    'socket_id': socket.id
                })
            }

            // Get current video based on current player
            let current_video = ''
            switch (current_player) {
                case 0:
                    current_video = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentVideo.yt
                    break;
                case 1:
                    current_video = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentVideo.dl
                    break;
            }

            // Get room host name
            const room_host_name = io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName

            socket.emit('actually_join_room', {
                'room_host_name': room_host_name,
                'username': socket.username,
                'room_number': socket.roomnum,
                'current_player': current_player,
                'current_video': current_video
            })

            // Display count of online users
            let online_users_count = 0
            for (const room of Rooms._global) {
                // Get room data
                const room_data = io.sockets.adapter.rooms[`room-${room}`]
                // Count users in each room
                const room_users_count = Object.keys(room_data['users']).length
                // Sum
                online_users_count += room_users_count
            }
            io.emit('display_online_users_count', {online_users_count})

            // Show movies list
            io.sockets.in(`room-${socket.roomnum}`).emit('show_movies', {
                'movies_list': Movies._movies_list,
            })


            // ================================================================
            // Ask the host to sync room users - Used to sync users who have just joined the room [Maybe not working]

            // Get room host data
            // const room_host_name = io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName

            // Get room host socket id
            const users = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users
            if (users === undefined) return
            console.log(users)
            const host_socket_id = users.find(user => user.username === room_host_name)['socket_id']

            // Get current room player id
            const current_room_player = io.sockets.adapter.rooms[`room-${socket.roomnum}`].currentPlayer

            io.to(host_socket_id).emit('sync_users_with_host_time', {'player_id': current_room_player});
            // ================================================================
        }

        // console.log(io.sockets.adapter.rooms[`room-${socket.roomnum}`].users)

        // Set people watching section
        const people_watching = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users
        io.sockets.in(`room-${socket.roomnum}`).emit('set_people_watching', {
            'people_watching': people_watching,
            'room_host_name': io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName
        })

        // Notify users about user joined the room
        io.sockets.in(`room-${socket.roomnum}`).emit('notify_user_joined_room', {
            'user_username': socket.username,
        })


        // console.log(io.sockets.adapter.rooms[`room-${socket.roomnum}`].users)
    });

    socket.on('send_message', function (data) {
        const sender = socket.username
        const message = data['message']
        const avatar = socket.avatar
        if (message.length) {
            io.sockets.in(`room-${socket.roomnum}`).emit('send_message', {
                'sender': sender,
                'message': message,
                'avatar': avatar
            });
        }
    })

    // Know if user is loading or finished loading a movie
    socket.on('set_user_movie_state', function (data) {
        if (io.sockets.adapter.rooms[`room-${socket.roomnum}`]) {
            if (io.sockets.adapter.rooms[`room-${socket.roomnum}`].users) {
                io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.map((user) => {
                    if (user.username === socket.username) user['movie_state'] = data['state']
                })

                io.sockets.in(`room-${socket.roomnum}`).emit('set_users_movie_state', {
                    'users': io.sockets.adapter.rooms[`room-${socket.roomnum}`].users,
                });
            }
        }
    })

    // Kick user from room
    socket.on('kick_user_from_room', function (data) {
        const username_to_kick = data['username_to_kick']

        // Check if socket is the room host
        if (socket.username === io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName) {

            // Get socket id of the username that will be kicked
            const users = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users
            const username_to_kick_socket_id = users.find(user => user.username === username_to_kick)['socket_id']

            // Emit to username that will be kicked
            io.to(username_to_kick_socket_id).emit('kick_user', {});

            // Remove user from room
            const room_users = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users
            const users_updated = room_users.filter(user => {
                return user.username !== username_to_kick
            })
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].users = users_updated

            // Set people watching section
            io.sockets.in(`room-${socket.roomnum}`).emit('set_people_watching', {
                'people_watching': users_updated,
                'room_host_name': io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName
            })

            // Display count of online users
            let online_users_count = 0
            for (const room of Rooms._global) {
                // Get room data
                const room_data = io.sockets.adapter.rooms[`room-${room}`]
                // Count users in each room
                const room_users_count = Object.keys(room_data['users']).length
                // Sum
                online_users_count += room_users_count
            }
            io.emit('display_online_users_count', {online_users_count})
        }
    })

    // Show emoji
    socket.on('show_emoji', function (data) {
        const emoji_symbol = data['emoji_symbol']
        io.sockets.in(`room-${socket.roomnum}`).emit('show_emoji', {emoji_symbol})
    })

    // Search movies by filters
    socket.on('search_movies', async function (data) {
        // Check if user in a room
        // if (socket.roomnum === undefined) return

        const genre = data.genre
        const rating = data.rating
        const year = data.year
        const movie_name = data.movie_name

        function callBack(search_results) {
            // Slice object
            const sliced_results = search_results.slice(0, 30)
            // Send movies to user
            socket.emit('show_searched_movies', {'movies': sliced_results})
        }

        DB_C.search_movies(genre, rating, year, movie_name, callBack)
    })

    // Generate movie link by its unique id
    socket.on('generate_movie_link', async function (data, callback) {
        const movie_unique_id = data['movie_unique_id']

        // Check if movie link has been generated in the past 2 hours
        function callBack(search_results) {
            const timestamp_now = Math.floor(Date.now() / 1000)
            const last_generated = search_results[0]['last_generated']
            const movie_link = search_results[0]['link']

            // Check difference between two timestamps
            const sub = timestamp_now - last_generated

            // Last generated link is more than two hours, need to generate new link
            if (last_generated==='' || sub > 7200) {
                console.log('Movie link has been generated more than two hours ago, Generating new link')

                request(`https://akwam.to/download/${movie_unique_id}/movie`,
                    function (error, response, body){
                        if (!error && response.statusCode === 200){
                            console.log('request successful!');

                            const link = body.split('<p class="mt-5"><a href="')[1].split('.mp4')[0] + '.mp4' // returns 'two'

                            // Update generated movie link
                            DB_C.update_link_and_last_generated(movie_unique_id, link)

                            callback({
                                state: true,
                                link: link
                            })
                        }
                    });
            }
            // Movie link has been generated is the past two hours
            else {
                console.log('movie link has been generated in the past two hours')

                // No link, Need to generated new link
                if (movie_link==='') {
                    console.log('no movie link found!, generating link...')

                    request(`https://akwam.to/download/${movie_unique_id}/movie`,
                        function (error, response, body){
                            if (!error && response.statusCode === 200){
                                console.log('request successful!');

                                // var input = JSON.parse(body);
                                // console.log(body)
                                // Do something with the body here
                                // including calling assistant.ask()
                                const link = body.split('<p class="mt-5"><a href="')[1].split('.mp4')[0] + '.mp4' // returns 'two'
                                // console.log(test)

                                // Update generated movie link
                                DB_C.update_link_and_last_generated(movie_unique_id, link)

                                callback({
                                    state: true,
                                    link: link
                                })
                            }
                        });

                }
                // Return link to user
                else {
                    console.log('movie link found :)')
                    callback({
                        state: true,
                        link: movie_link
                    })
                }
            }
        }
        DB_C.check_last_generated(movie_unique_id, callBack)


    })

    // Disconnect
    socket.on('disconnect', function (data) {
        if (socket.username === undefined) return

        // Notify users about user left the room
        io.sockets.in(`room-${socket.roomnum}`).emit('notify_user_left_room', {
            'user_username': socket.username,
        })

        const room_users = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users

        // Check if the user who left is the room host > Set new room host
        const orig_room_host_name = io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName
        if (socket.username === orig_room_host_name) {
            // This will get the first found user in room users
            const new_host_data = room_users.find(user => user.username !== socket.username)

            // Prevent crash if not found
            if (new_host_data === undefined || !new_host_data.hasOwnProperty("username")) return

            // Set new host username
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName = new_host_data['username']

            // Update host username for users
            io.sockets.in(`room-${socket.roomnum}`).emit('set_new_host_username', {
                'new_host_username': new_host_data['username'],
            })
        }

        // Delete user room
        UsersRooms.delete_user_room(socket.id)

        // Check if username already in room users
        if (room_users.find(user => user.username === socket.username)) {
            // Delete user from room users
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].users = room_users.filter(user => user.username !== socket.username)
        }

        // // Check if username already in room users
        // if (io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.find(user => user.username === socket.username)) {
        //     // Delete user from room users
        //     io.sockets.adapter.rooms[`room-${socket.roomnum}`].users = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.filter(user => user.username !== socket.username)
        // }

        // Display count of online users
        let online_users_count = 0
        for (const room of Rooms._global) {
            // Get room data
            const room_data = io.sockets.adapter.rooms[`room-${room}`]
            // Count users in each room
            const room_users_count = Object.keys(room_data['users']).length
            // Sum
            online_users_count += room_users_count
        }
        io.emit('display_online_users_count', {online_users_count})

        // Set people watching section
        const people_watching = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users
        io.sockets.in(`room-${socket.roomnum}`).emit('set_people_watching', {
            'people_watching': people_watching,
            'room_host_name': io.sockets.adapter.rooms[`room-${socket.roomnum}`].hostName
        })
    });
});


app.use(cors({
    origin: '*'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }});


// app.use(cors({origin:true}))
app.use(express.json())
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true,limit:'50mb',parameterLimit:50000}));

app.get('/get_movies', function (req, res){
    let movies_source

    const genre = req.query.genre
    const rating = req.query.rating
    const year = req.query.year

    // Get movies based on genre
    if (genre === 'action') {
        movies_source = JSON.parse(fs.readFileSync('./MoviesSources/Action.js', 'utf8'))
    }

    console.log(genre, rating, year)

    // Slice data
    // const sliced_action_movies = action_movies.slice(start, limit);

    // res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials",true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
    // res.status(200).send({
    //     'action_movies': sliced_action_movies,
    //     'size': action_movies.length
    // });
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/auth-endpoint", auth, (request, response) => {
    response.json({
        isLogged: true,
        message: "You are authorized to access me"
    });
});

app.post('/auth/signin', async (req, res, next) => {

    const result = {
        state: true,
        msg: '',
    }

    // Check if username or password not set
    if (req.body.data === undefined || !Object.hasOwn(req.body.data, 'username') || !Object.hasOwn(req.body.data, 'password')) {
        result['state'] = false;
        result['msg'] = 'Please enter a valid username and password';
    }
    else {
        const username = req.body.data.username;
        const password = req.body.data.password;

        // Invalid data
        if (!username.trim().length || !password.trim().length) {
            result['state'] = false;
            result['msg'] = 'Please enter a valid username and password';
        }
        // Valid data
        else {
            // Check if user exists with that username
            const data = await Users.findByUsername(username)

            // User found
            if (data['data_found']) {
                // Verify user hashed password
                const valid_password = await Users.verifyUserPassword(password, data['data']['password'])
                if (valid_password) {

                    // create JWT token
                    const token = jwt.sign(
                        {
                            id: data['data']['_id'],
                            username: username,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "5h" }
                    );

                    result['state'] = true;
                    result['token'] = token;
                    result['username'] = username;
                    result['id'] = data['data']['_id'];

                }
                else {
                    result['state'] = false;
                    result['msg'] = 'Please enter a valid username and password';
                }
            }
            // User not found
            else {
                result['state'] = false;
                result['msg'] = 'Please enter a valid username and password';
            }
        }

        // res.send({'Role': 'Role', 'profile': 'profile'});
    }

    res.status(200).send(result)
})

// Get server stats
app.get("/stats/get-stats", auth, (request, response) => {
    // Count total users
    let total_users_count = 0
    Object.keys(io.sockets.adapter.rooms).forEach(roomnum => {
        total_users_count += io.sockets.adapter.rooms[roomnum].users.length
    })

    response.json({
        total_rooms_count: Object.keys(io.sockets.adapter.rooms).length,
        total_users_count: total_users_count
    });
});

// Add movie
app.post("/movies/add", auth, async (req, res) => {
    const {movie_name, movie_year, movie_genre, movie_desc, movie_rating, movie_poster, movie_src} = req.body.data

    let valid = true
    if (movie_name === undefined || movie_year === undefined || movie_genre === undefined || movie_desc === undefined || movie_rating === undefined || movie_poster === undefined || movie_src === undefined) {
        valid = false
    }



    if (valid) {
        const inserted = await Movie.add_movie(req.body.data)

        if (inserted) {
            res.status(200).send({
                state: true,
                msg: 'Movie has been added successfully'
            })
        }
        else {
            res.status(400).send({
                state: false,
                msg: 'An error occurred while adding movie'
            })
        }

    } else {
        res.status(400).send({
            state: false,
            msg: 'One or more fields are invalid'
        })
    }

});

// Edit movie
app.post("/movies/edit", auth, async (req, res) => {
    const {movie_name, movie_year, movie_genre, movie_desc, movie_rating, movie_poster, movie_src} = req.body.data

    let valid = true
    if (movie_name === undefined || movie_year === undefined || movie_genre === undefined || movie_desc === undefined || movie_rating === undefined || movie_poster === undefined || movie_src === undefined) {
        valid = false
    }

    if (valid) {
        // Check if movie exist before updating it
        const movie_exist = await Movie.check_movie_exist(req.body.data['movie_id'])

        // Movie found
        if (movie_exist['found']) {
            const updated = await Movie.edit_movie(req.body.data)
            if (updated) {
                res.status(200).send({
                    state: true,
                    msg: 'Movie has been updated successfully'
                })
            }
            else {
                res.status(400).send({
                    state: false,
                    msg: 'An error occurred while updating movie, Please try again later'
                })
            }
        }
        // Movie was not found
        else {
            res.status(404).send({
                state: false,
                msg: 'An error occurred while updating movie, movie was not found'
            })
        }
    }
    else {
        res.status(400).send({
            state: false,
            msg: 'One or more fields are invalid'
        })
    }

});

// Delete movie
app.delete("/movies/delete", auth, async (req, res) => {
    // Check if movie exist
    const movie_id = req.body.data.movie_id
    const movie_exist = await Movie.check_movie_exist(movie_id)

    const data = {
        movie_found: false,
        movie_deleted: false
    }

    // Movie exist
    if (movie_exist['found']) {
        data['movie_found'] = true

        // Try to delete movie
        const deleted = await Movie.delete_movie(movie_id)

        // Movie was deleted
        if (deleted) {
            data['movie_deleted'] = true
        }
    }

    res.status(200).send(data)
});

// Get movies list
app.get("/movies/get-movies", auth, async (req, res) => {
    const movies = await Movie.get_movies()

    res.status(200).send({
        state: movies.length > 0,
        movies: movies
    })
});

// Check if movie exist
app.get("/movies/check-movie-exist", auth, async (req, res) => {
    // const movies = await Movie.get_movies()
    const movie_id = req.query.data.movie_id
    const movie_exist = await Movie.check_movie_exist(movie_id)

    res.status(200).send({
        state: movie_exist['found'],
        movie_data: movie_exist['movie_data']
    })
});

// Get rooms list
app.get("/rooms/get-rooms", auth, async (req, res) => {
    // const rooms = await Rooms.get_rooms()

    const rooms_data = []

    // Count total users
    Object.keys(io.sockets.adapter.rooms).forEach(roomnum => {
        // Since rooms numbers starts with 'room-', will remove that word and stay with just the actual room number
        // const clean_room_number = roomnum.replace('room-', '')
        // rooms_data[clean_room_number] = io.sockets.adapter.rooms[roomnum].users.length
        rooms_data.push({
            room_number: roomnum,
            room_users_count: io.sockets.adapter.rooms[roomnum].users.length
        })
    })

    res.status(200).send({
        rooms_found: Object.keys(rooms_data).length > 0,
        rooms: rooms_data
    })
});


// server.listen(3000);
app.listen(3000);
io.listen(3001);
