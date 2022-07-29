
class Username {
    constructor() {
        this._alert_id = 'alert_username'
        this._input_id = 'username'
    }

    get_username() {
        return document.getElementById(this._input_id).value
    }

    set_alert_text(text) {
        document.getElementById(this._alert_id).innerText = text
    }
}

const Username_c = new Username();
export default Username_c;
