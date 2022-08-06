
class Brightness {
    constructor() {
        this.btn_id = 'movie_brightness'
        this.brightness_box = 'brightness_box'
        this.brightness_slider = 'brightness-slider'
        this.brightness_restore_btn = 'restore-brightness'
        this.brightness = '100' // Default brightness

        this.on_click()
        this.on_click_restore()
        this.on_brightness_change()
        this.on_brightness_box_close()
    }

    // When user click brightness button > show brightness slider
    on_click() {
        document.getElementById(this.btn_id).addEventListener('click', () => {
            this.show_brightness_box(true)
        })
    }

    /**
     * Show or hide brightness box
     * @param _option {Boolean}
     */
    show_brightness_box(_option) {
        if (_option) {
            document.getElementById(this.brightness_box).style.display = 'flex'
        }
        else {
            document.getElementById(this.brightness_box).style.display = 'none'
        }
    }

    on_brightness_change() {
        document.getElementById(this.brightness_slider).addEventListener('input', (e) => {
            e.preventDefault()
            const brightness = e.target.value
            this.set_brightness(brightness)
        })
    }

    /**
     * Set body brightness
     * @param _value {String}
     */
    set_brightness(_value) {
        // $("header").css("filter", `brightness(${_value}%)`);
        $("#players").css("filter", `brightness(${_value}%)`);
        $(".space").css("filter", `brightness(${_value}%)`);
    }

    on_brightness_box_close() {
        document.getElementById('close-brightness-box').addEventListener('click', () => {
            this.show_brightness_box(false)
        })
    }

    on_click_restore() {
        document.getElementById(this.brightness_restore_btn).addEventListener('click', () => {
            this.set_brightness('100')
            document.getElementById(this.brightness_slider).value = '100'
        })
    }
}

const Brightness_C = new Brightness()
export default Brightness
