class FileInputHandler {
    constructor() {
    }

    /**
     * Declare
     * @param _inputs {Array} > Example: [input1, input2, input3] (Array of inputs objects)
     */
    static declareChangeEvents(_inputs)
    {
        _inputs.map(input=> {
            input.on_change(input)
        })
    }
}

export default FileInputHandler
