
class MovieControls {
    constructor() {
        this._controls_id = 'controls'
        this._fullscreen_controls_enabled = false

        this.toggle_fullscreen_controls_click()
    }

    // Set controls style for fullscreen
    set_fullscreen_controls_style(bool) {
        this._fullscreen_controls_enabled = bool
        const controls_area = document.getElementById(this._controls_id)

        const icon = document.getElementById('toggle_fullscreen_controls')
        icon.classList.remove(['fa-chevron-up'], ['fa-chevron-down'])
        icon.classList.add('fa-chevron-up')

        if (bool) {
            controls_area.classList.add('fullscreen-movie-controls')
            controls_area.classList.remove('fullscreen-movie-controls-shown')
            controls_area.classList.add('fullscreen-movie-controls-hidden')
            icon.style.display = 'block'
        }
        else {
            controls_area.classList.remove('fullscreen-movie-controls')
            icon.style.display = 'none'
        }
    }

    // On chevron-up click
    toggle_fullscreen_controls_click() {
        const icon = document.getElementById('toggle_fullscreen_controls')
        const controls_area = document.getElementById(this._controls_id)

        // On chevron click
        icon.addEventListener('click', () => {
            // Show
            if (this._fullscreen_controls_enabled) {
                controls_area.classList.remove('fullscreen-movie-controls-hidden')
                controls_area.classList.add('fullscreen-movie-controls-shown')

                icon.classList.remove(['fa-chevron-up'], ['fa-chevron-down'])
                icon.classList.add('fa-chevron-down')

                this._fullscreen_controls_enabled = false
            }
            // Hide
            else {
                controls_area.classList.remove('fullscreen-movie-controls-shown')
                controls_area.classList.add('fullscreen-movie-controls-hidden')

                icon.classList.remove(['fa-chevron-up'], ['fa-chevron-down'])
                icon.classList.add('fa-chevron-up')

                this._fullscreen_controls_enabled = true
            }
        })
    }

}

const MovieControls_C = new MovieControls
export default MovieControls_C
