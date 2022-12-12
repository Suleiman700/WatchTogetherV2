
export default class InputBuilder {
    constructor(_id, _parent_id, _validation={}) {
        this.parent_id = _parent_id
        this.id = _id
        this.has_error = false
    }

    /**
     * Enable or disable the select
     * @param _option {Boolean}
     */
    enabled(_option) {
        document.querySelector(`#${this.parent_id} input#${this.id}`).disabled = !_option
    }

    on_input() {
        document.querySelector(`#${this.parent_id} input#${this.id}`).addEventListener('change', () => {
            console.log('on input')
            this.mark_error(false)
        })
    }

    clear() {
        $(`#${this.parent_id} input#${this.id}`).val('').trigger('change')
    }

    /**
     * Get input value
     * @returns {String}
     */
    get_value() {
        const value = $(`#${this.parent_id} input#${this.id}`).val()
        if (value === '') {
            return undefined
        }
        return value
    }

    /**
     * Set input value
     * @param _value {string}
     */
    set_value(_value) {
        $(`#${this.parent_id} input#${this.id}`).val(_value).trigger('change')
    }

    /**
     * Mark input with error
     * @param _option {Boolean}
     */
    mark_error(_option) {
        if (_option) {
            document.querySelector(`#${this.parent_id} input#${this.id}`).style = 'border: 1px solid red'
            this.has_error = true
        }
        else {
            document.querySelector(`#${this.parent_id} input#${this.id}`).style = ''
            this.has_error = false
        }
    }

    /**
     * Focus on this element
     */
    focus() {
        document.querySelector(`#${this.parent_id} input#${this.id}`).focus()
    }


}
