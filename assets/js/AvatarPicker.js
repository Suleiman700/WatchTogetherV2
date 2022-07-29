
class AvatarPicker {
    constructor() {
        this._avatars = [];
        this._area_id = 'avatar_pick'
        this._images_path = '../assets/images/avatars/'
        this._selected_avatar = ''
    }

    // Set avatars images
    set_avatars_images(avatars_images) {
        this._avatars = avatars_images
    }

    // Build avatar picker list
    build_avatar_picker() {
        // Clear
        document.getElementById(this._area_id).innerHTML = ''

        // Build list
        let html = ``
        for (const index in this._avatars) {
            html += `
                <img class="avatar_img list-group-item list-group-item-action mx-1 active ${index==='0'? 'avatar_picked':''}" src="${this._images_path}${this._avatars[index]}" data-key="${index}" alt="" style="width: 100px;">
            `
        }

        // Set default selected avatar
        this._selected_avatar = this._avatars[0]

        // Set HTML
        document.getElementById(this._area_id).innerHTML = html

        // Set on-click event listener
        this.set_click_event()
    }

    // Set on-click event listener
    set_click_event() {
        const avatars_images = document.getElementsByClassName('avatar_img')
        for (let i = 0, len = avatars_images.length; i < len; i++) {
            const avatar_img = avatars_images[i]
            avatar_img.addEventListener('click', (e) => {
                // Clear selected avatar
                this.clear_selected()

                // Set selected class
                e.target.classList.add('avatar_picked')

                // Get avatar image name by its data-key
                const avatar_key = e.target.attributes['data-key']['value']
                this._selected_avatar = this._avatars[avatar_key] // Example: avatar1.png
            })
        }
    }


    // Clear selected avatar
    clear_selected() {
        const avatars_images = document.getElementsByClassName('avatar_img')
        for (let i = 0, len = avatars_images.length; i < len; i++) {
            const avatar_img = avatars_images[i]
            // Remove selected class
            avatar_img.classList.remove('avatar_picked')
        }
    }

    // Return picked avatar image name
    get_picked_avatar() {
        return this._selected_avatar
    }
}

const AvatarPick_C = new AvatarPicker()
export default AvatarPick_C
