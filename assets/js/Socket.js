
class SocketClass {
    constructor() {
        this._path = 'http://localhost'
        this._port = 3001

        // Connect to socket
        this._socket = io(`${this._path}:${this._port}`, { transports: ['websocket', 'polling', 'flashsocket'] });
    }
}

const socket_c = new SocketClass();
export default socket_c
