import Socket_C from '../Socket.js'
import Reactions_C from '../Reactions.js';

class ShowEmoji {
    constructor() {
        this.event()
    }

    event() {
        Socket_C._socket.on('show_emoji', (data) => {
            const emoji_symbol = data['emoji_symbol']
            Reactions_C.show_emoji(emoji_symbol)
        })
    }
}

const ShowEmoji_C = new ShowEmoji();
export default ShowEmoji_C
