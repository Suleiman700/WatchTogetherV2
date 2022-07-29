import MovieControls_C from '../../MovieControls.js';

class EnterFullscreen {
    constructor() {
        this._is_fullscreen = false
        this._fullscreen_btn = 'movie_toggle_fullscreen'
        this._fullscreen_btn_text = 'movie_toggle_fullscreen_text'
        this._fullscreen_btn_icon = 'movie_toggle_fullscreen_icon'

        this.click_event()
    }

    // Clear icon
    clear_icon() {
        const icon = document.getElementById(this._fullscreen_btn_icon)
        icon.classList.remove(['fa-expand'], ['fa-compress'])
    }

    // On click event
    click_event() {
        const btn = document.getElementById(this._fullscreen_btn)
        const btn_text = document.getElementById(this._fullscreen_btn_text)
        const icon = document.getElementById(this._fullscreen_btn_icon)
        btn.addEventListener('click', () => {
            // Clear icon
            this.clear_icon()

            // Set icon
            if (this._is_fullscreen) {
                // In normal mode
                icon.classList.add('fa-expand')
                btn_text.innerText = 'ENTER FULLSCREEN'

                // Show header
                $('header').show()

                // Hide black background
                $('#black_background').hide()

                // Exit fullscreen
                document.exitFullscreen();
            }
            else {
                // In fullscreen mode
                icon.classList.add('fa-compress')
                btn_text.innerText = 'EXIT FULLSCREEN'

                // Hide header
                $('header').hide()

                // Show black background
                $('#black_background').show()

                // Enter fullscreen
                document.documentElement.requestFullscreen();
            }

            this._is_fullscreen = !this._is_fullscreen
            this.set_body_bg()
            this.set_movie_controls_style()
            // this.scroll_to_player()
        })
    }

    // Set body background
    set_body_bg() {
        if (this._is_fullscreen) {
            document.body.style.background = "black";
            this.disable_scroll()
            this.scroll_to_player()
        }
        else {
            document.body.style.background = "";
            this.enable_scroll()
        }
    }

    // Scroll view to players section
    scroll_to_player() {
        // $('html, body').animate({
        //     scrollTop: $("#section_movie").offset().top - 10
        // }, 500);

        setTimeout(function () {
            $(window).scrollTop($('#players').offset().top - 10);
        }, 100)
    }

    // Enable scroll
    enable_scroll() {
        $('html, body').removeClass('no-scroll')
        this.scroll_to_player()
    }

    // Disable scroll
    disable_scroll() {
        $('html, body').addClass('no-scroll')
    }

    // Set movie controls
    set_movie_controls_style() {
        console.log('here')
        MovieControls_C.set_fullscreen_controls_style(this._is_fullscreen)
    }
}

const EnterFullscreen_C = new EnterFullscreen()
export default EnterFullscreen_C
