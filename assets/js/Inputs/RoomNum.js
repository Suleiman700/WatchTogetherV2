
class RoomNum {

    constructor() {
        this._alert_id = 'alert_roomnum'
        this._input_id = 'room_number'
    }

    // Get room number
    get_number() {
        return document.getElementById(this._input_id).value
    }

    set_alert_text(text) {
        document.getElementById(this._alert_id).innerText = text
    }
}

const roomNum_c = new RoomNum();
export default roomNum_c;
