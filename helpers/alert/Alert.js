
class Alert {

    id = undefined

    constructor() {}

    /**
     * Show or hide alert spinner
     * @param _option {Boolean}
     */
    show_alert(_option) {
        console.log('here')
        document.querySelector(`#${this.id}`).style.display = _option ? 'block' : 'none'
    }

    /**
     * Set alert text
     * @param _text {String}
     * @param _show_spinner {Boolean}
     */
    set_text(_text, _show_spinner=false) {
        this.show_alert(true)
        document.querySelector(`#${this.id} #spinner`).style.display = _show_spinner ? 'inline-block' : 'none'
        document.querySelector(`#${this.id} #text`).innerText = _text
    }

    /**
     * Set alert class name
     * @param _class_name {String} > Example: success|danger
     */
    set_class(_class_name) {
        const alert = document.querySelector(`#${this.id}`)
        alert.classList.remove('alert-primary')
        alert.classList.remove('alert-secondary')
        alert.classList.remove('alert-danger')
        alert.classList.remove('alert-info')
        alert.classList.remove('alert-warning')

        alert.classList.add(`alert-${_class_name}`)
    }

    set_id(_id) {
        this.id = _id
    }
}

export default new Alert()
