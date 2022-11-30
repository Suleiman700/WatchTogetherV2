
export default class InputBuilder {
    constructor(_id, _parent_id, _validation={}) {
        this.parent_id = _parent_id
        this.id = _id
        this.validation = _validation
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

    validate() {
        const res = {
            valid: true,
            errors: [],
            value: this.get_value(),
            target_input: this.id,
            target_parent: this.parent_id
        }

        // Check if validations are set for this input
        if (!Object.keys(this.validation).length) {
            // res['valid'] = false
            // throw `[Validation settings not set for input #${this.id}]`

            res['valid'] = true
            return res
        }

        // Check required
        if (this.validation['required']) {
            if (!this.get_value().trim().length) {
                res['valid'] = false
                res['errors'].push("This field is required")
            }
        }

        // Check minimum length
        if (this.validation['min_len']['active']) {
            if (this.get_value().trim().length < this.validation['min_len']['value']) {
                res['valid'] = false
                res['errors'].push(`Minimum length should be at least ${this.validation['min_len']['value']}`)
            }
        }

        // Check maximum length
        if (this.validation['max_len']['active']) {
            if (this.get_value().trim().length > this.validation['max_len']['value']) {
                res['valid'] = false
                res['errors'].push(`The maximum length should be ${this.validation['max_len']['value']}`)
            }
        }

        // Check type
        if (this.validation['type'] === 'number') {
            if (isNaN(this.get_value())) {
                res['valid'] = false
                res['errors'].push(`This field accepts numbers only`)
            }
        }

        return res
    }

}
