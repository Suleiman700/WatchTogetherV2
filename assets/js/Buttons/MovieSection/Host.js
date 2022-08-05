
class Host {
    constructor() {
        this.btn_id = 'room_host_btn'
    }

    /**
     * Receive room host name and set name inside the span
     * @param _room_host_name {String}
     */
    set_host_name(_room_host_name) {
        $(`#${this.btn_id} span`).text(_room_host_name)
    }
}

const Host_C = new Host()
export default Host_C
