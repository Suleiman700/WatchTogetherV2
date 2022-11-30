
class ButtonHandler {
    constructor() {
    }

    /**
     * Declare
     * @param _buttons {Array} > Example: [btn1, btn2, btn3] (Array of buttons objects)
     */
    static declareClicksEvents(_buttons)
    {
        _buttons.map(button=> {
            button.on_click(button)
            // button.enabled(false)
        })
    }
}

export default ButtonHandler