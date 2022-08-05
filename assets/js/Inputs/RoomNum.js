
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

    /**
     * Receive string and set it as input's value (Used to set room id if room number is found in url as parameter)
     * @param _value {String}
     */
    set_value(_value) {
        document.getElementById(this._input_id).value = _value
    }
}

const roomNum_c = new RoomNum();
export default roomNum_c;
