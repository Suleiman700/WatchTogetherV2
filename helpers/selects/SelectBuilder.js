export default class SelectBuilder {
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
        document.querySelector(`#${this.parent_id} select#${this.id}`).disabled = !_option
    }

    on_input() {
        document.querySelector(`#${this.parent_id} select#${this.id}`).addEventListener('change', () => {
            this.mark_error(false)
        })
    }

    clear() {
        $(`#${this.parent_id} select#${this.id}`).val('').trigger('change')
    }

    /**
     * Get input value
     * @returns {String}
     */
    get_value() {
        const value = $(`#${this.parent_id} select#${this.id}`).val()
        if (value === '') {
            return undefined
        }
        return value
    }

    /**
     * Set select selected value
     * @param _value
     */
    set_selected(_value) {
        $(`#${this.parent_id} select#${this.id}`).val(_value).trigger('change')
    }

    /**
     * Mark input with error
     * @param _option {Boolean}
     */
    mark_error(_option) {
        if (_option) {
            document.querySelector(`#${this.parent_id} select#${this.id}`).style = 'border: 1px solid red'
            this.has_error = true
        }
        else {
            document.querySelector(`#${this.parent_id} select#${this.id}`).style = ''
            this.has_error = false
        }
    }

    /**
     * Focus on this element
     */
    focus() {
        document.querySelector(`#${this.parent_id} select#${this.id}`).focus()
    }


}
