
export default class FileInputBuilder {
    constructor(_id, _parent_id, _validation={}) {
        this.parent_id = _parent_id
        this.id = _id
        this.has_error = false
        this.fileData = undefined
        this.myFile = undefined
    }

    /**
     * Enable or disable the select
     * @param _option {Boolean}
     */
    enabled(_option) {
        document.querySelector(`#${this.parent_id} input#${this.id}`).disabled = !_option
    }

    on_change() {
        document.querySelector(`#${this.parent_id} input#${this.id}`).addEventListener('change', () => {
            this.mark_error(false)
            var filereader = new FileReader();
            filereader.onload = function(event){
                this.fileData  = event.target.result;
            };
            this.myFile = $(`#${this.parent_id} input#${this.id}`).prop('files')[0];
            console.log('myfile',this.myFile)
            filereader.readAsDataURL(this.myFile)
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
}
