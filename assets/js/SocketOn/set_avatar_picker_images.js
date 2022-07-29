import socket_class from '../Socket.js'
import AvatarPicker_C from '../AvatarPicker.js';


class SetAvatarPickerImages {
    constructor() {
        this.event()
    }

    event() {
        socket_class._socket.on('set_avatar_picker_images', (data) => {
            const avatars_images = data['avatars_images']
            AvatarPicker_C.set_avatars_images(avatars_images)
            AvatarPicker_C.build_avatar_picker()
        })
    }
}

const SetAvatarPickerImages_C = new SetAvatarPickerImages()
