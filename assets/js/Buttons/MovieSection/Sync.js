import PlayersController_C from '../../Players/PlayersController.js'

class PlayClass {
    constructor() {
        this._btn_id = 'movie_sync'

        this.on_click()
    }

    on_click() {
        document.getElementById(this._btn_id).addEventListener('click', () => {
            PlayersController_C.sync()
        })
    }
}

const Play_C = new PlayClass()
export default Play_C
