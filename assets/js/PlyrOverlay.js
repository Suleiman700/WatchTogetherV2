
class PlyrOverlay {
    constructor() {
        this._elm_id = 'plyr_overlay'
    }

    show() {
        $(`#${this._elm_id}`).show()
    }

    hide() {
        $(`#${this._elm_id}`).hide()
    }

    set_text(_text) {
        $(`#${this._elm_id}`).text(_text)
    }
}

const PlyrOverlay_C = new PlyrOverlay()
export default PlyrOverlay_C
