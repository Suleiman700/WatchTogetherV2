
class InputHandler {
    constructor() {
    }

    /**
     * Declare
     * @param _inputs {Array} > Example: [input1, input2, input3] (Array of inputs objects)
     */
    static declareInputsEvents(_inputs)
    {
        _inputs.map(input=> {
            input.on_input(input)
        })
    }
}

export default InputHandler