
class SocketClass {
    constructor() {
        this._path = 'http://localhost'
        // this._path = 'http://watch-together.online'
        this._port = 3001

        // Connect to socket
        this._socket = io(`${this._path}:${this._port}`, { transports: ['websocket', 'polling', 'flashsocket'] });
    }

    check_if_connected() {
        console.log('check 1', this._socket.connected);
    }
}

const socket_c = new SocketClass();
export default socket_c
