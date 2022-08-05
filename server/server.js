const Rooms = require('./js/Rooms')
const AvatarsC = require('./js/Avatars')
const UsersRooms = require('./js/UsersRooms')
const Movies = require('./js/Movies')

// DB
const DB_C = require('./DB/DB')

// Players
const YouTubePlyr = require('./js/Players/YT_Player')
const DLPlayer = require('./js/Players/DL_Player')

const https = require('https');
const request = require('request');

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


// function db_find_get() {
//     const dbo = client.db("watch_together");
//     dbo.collection("movies").findOne({}, function(err, result) {
//         if (err) throw err;
//         console.log(result.name);
//         client.close();
//     });}



// request('https://akwam.to/download/6945/movie',
//     function (error, response, body){
//         if (!error && response.statusCode == 200){
//             console.log('request successful!');
//
//             // var input = JSON.parse(body);
//             // console.log(body)
//             // Do something with the body here
//             // including calling assistant.ask()
//             var test = body.split('<p class="mt-5"><a href="')[1].split('.mp4')[0] + '.mp4' // returns 'two'
//             console.log(test)
//         }
//     });



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
    socket.on('disconnect', () => { /* … */ });

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

            socket.emit('actually_join_room', {
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
        if (socket.roomnum === undefined) return

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

        // Delete user room
        UsersRooms.delete_user_room(socket.id)

        // Check if username already in room users
        if (io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.find(user => user.username === socket.username)) {
            // Delete user from room users
            io.sockets.adapter.rooms[`room-${socket.roomnum}`].users = io.sockets.adapter.rooms[`room-${socket.roomnum}`].users.filter(user => user.username !== socket.username)
        }

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


app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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



// server.listen(3000);
app.listen(3000);
io.listen(3001);
