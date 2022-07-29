import socket_c from './Socket.js';

class Reactions {
    constructor() {
        this._reactions_shown = false
        this._reactions_area = 'reactions_area'
        this._btn_toggle_reactions_area = 'toggle_reactions_area'

        this.click_event()
        this.click_reaction_icon_event()
    }

    click_event() {
        const btn = document.getElementById(this._btn_toggle_reactions_area)
        btn.addEventListener('click', () => {
            if (this._reactions_shown) {
                document.getElementById(this._reactions_area).style.display = 'none'
            }
            else {
                document.getElementById(this._reactions_area).style.display = 'block'
            }

            this._reactions_shown = !this._reactions_shown
        })
    }

    // Event on clicking emoji icon
    click_reaction_icon_event() {
        const emojis_buttons = document.querySelectorAll('.reaction-icon')
        for (const emoji_button of emojis_buttons) {
            emoji_button.addEventListener('click', (e) => {
                const emoji_symbol = e.target.id
                socket_c._socket.emit('show_emoji', {emoji_symbol}, function(callback) {})

            })
        }
    }

    // Show emoji
    show_emoji(emoji_symbol) {
        floating({
            content: emoji_symbol,
            number: 1,
            duration: 4,
            size: [0.1,5]
        });
    }

    // Show actual reactions button that used to open reactions section
    show_actual_reactions_btn() {
        $('.reactions-box').show()
    }
}

const Reactions_C = new Reactions()
export default Reactions_C
