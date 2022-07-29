import EnterFullscreen_C from './Buttons/MovieSection/EnterFullscreen.js'

class Orientation {
    constructor() {
        this._angle = null // Store orientation angle | 0 or 90
        this.on_orientation_change()
    }

    on_orientation_change() {
        window.addEventListener("orientationchange", function(event) {
            const screen_angle = event.target.screen.orientation.angle;
            this._angle = screen_angle

            // Exit fullscreen mode
            document.exitFullscreen();

            // Exit fullscreen movie
            EnterFullscreen_C._is_fullscreen = true // Set fullscreen on to click the "Exit Fullscreen" button
            document.getElementById(EnterFullscreen_C._fullscreen_btn).click()
        });
    }
}

const Orientation_C = new Orientation
