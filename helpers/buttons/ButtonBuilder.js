
export default class ButtonBuilder {
    constructor(_id, _parent_id, _cb) {
        this.parent_id = _parent_id
        this.id = _id
        this.cb = _cb
    }

    on_click() {
        // console.log(this.parent_id)
        // console.log(this.id)
        document.querySelector(`#${this.parent_id}`).querySelector(`#${this.id}`).addEventListener('click', () => {
            this.cb()
        })
    }

    /**
     * Enable or disable the select
     * @param _option {Boolean}
     */
    enabled(_option) {
        document.querySelector(`#${this.parent_id} button#${this.id}`).disabled = !_option
    }

    /**
     * Show or hide the button
     * @param _option {Boolean}
     */
    show_btn(_option) {
        let display = 'inline'
        if (_option === false) display = 'none'

        try {
            document.querySelector(`#${this.parent_id}`).querySelector(`#${this.id}`).style.display = display
        }
        catch (e) {
        }
    }

    // Remove button
    remove() {
        document.querySelector(`#${this.parent_id}`).querySelector(`#${this.id}`).remove()
    }
}
