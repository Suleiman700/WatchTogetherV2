import Socket_C from '../Socket.js'

class KickUser {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('kick_user', (data) => {
            // Remove all page HTML
            document.body.innerHTML = ''

            // Show alert
            Swal.fire({
                title: 'Information',
                text: "You've been kicked from the room!",
                icon: "warning",
                dangerMode: false,
            }).then(function() {
                location.reload()
            });

        })
    }
}

const KickUser_C = new KickUser();
export default KickUser_C
