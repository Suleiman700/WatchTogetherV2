import PlayersController_C from '../../Players/PlayersController.js'

class PauseClass {
    constructor() {
        this._btn_id = 'movie_pause'

        this.on_click()
    }

    on_click() {
        document.getElementById(this._btn_id).addEventListener('click', () => {
            PlayersController_C.pause()
        })
    }
}

const Pause_C = new PauseClass()
export default Pause_C
