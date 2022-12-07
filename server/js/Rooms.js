
class RoomsClass {
    constructor() {
        this._global = []
    }

    get_rooms() {
        return this._global
    }
}
const rooms_class = new RoomsClass();
module.exports = rooms_class
