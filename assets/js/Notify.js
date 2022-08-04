
class Notify {
    constructor() {}

    // Notify users about source change
    notify_source_change(username) {
        notify({
            type: "alert", //alert | success | error | warning | info
            title: "Notify",
            message: `<span class="text-danger">[${username}]</span> Has Changed Player Source`,
            position: {
                x: "right", //right | left | center
                y: "top" //top | bottom | center
            },
            size: "normal", //normal | full | small
            overlay: false, //true | false
            closeBtn: true, //true | false
            overflowHide: false, //true | false
            spacing: 20, //number px
            theme: "dark-theme", //default | dark-theme
            autoHide: true, //true | false
            delay: 2500, //number ms
            onShow: null, //function
            onClick: null, //function
            onHide: null, //function
            template: '<div class="notify"><div class="notify-text"></div></div>'
        });
    }

    // Notify users about player change
    notify_player_change(username, player_name) {
        notify({
            type: "alert", //alert | success | error | warning | info
            title: "Notify",
            message: `<span class="text-danger">[${username}]</span> Has Changed Player To: <span class="text-primary">${player_name}</span>`,
            position: {
                x: "right", //right | left | center
                y: "top" //top | bottom | center
            },
            size: "normal", //normal | full | small
            overlay: false, //true | false
            closeBtn: true, //true | false
            overflowHide: false, //true | false
            spacing: 20, //number px
            theme: "dark-theme", //default | dark-theme
            autoHide: true, //true | false
            delay: 2500, //number ms
            onShow: null, //function
            onClick: null, //function
            onHide: null, //function
            template: '<div class="notify"><div class="notify-text"></div></div>'
        });
    }

    /**
     * Notify users about user joined the room
     * @param _username {String}
     */
    notify_user_joined_room(_username) {
        notify({
            type: "alert", //alert | success | error | warning | info
            title: "Info",
            message: `<span class="text-danger">${_username}</span> Has Joined The Room`,
            position: {
                x: "right", //right | left | center
                y: "top" //top | bottom | center
            },
            size: "normal", //normal | full | small
            overlay: false, //true | false
            closeBtn: true, //true | false
            overflowHide: false, //true | false
            spacing: 20, //number px
            theme: "dark-theme", //default | dark-theme
            autoHide: true, //true | false
            delay: 2500, //number ms
            onShow: null, //function
            onClick: null, //function
            onHide: null, //function
            template: '<div class="notify"><div class="notify-text"></div></div>'
        });
    }

    /**
     * Notify users about user left the room
     * @param _username {String}
     */
    notify_user_left_room(_username) {
        notify({
            type: "alert", //alert | success | error | warning | info
            title: "Info",
            message: `<span class="text-danger">${_username}</span> Has Left The Room`,
            position: {
                x: "right", //right | left | center
                y: "top" //top | bottom | center
            },
            size: "normal", //normal | full | small
            overlay: false, //true | false
            closeBtn: true, //true | false
            overflowHide: false, //true | false
            spacing: 20, //number px
            theme: "dark-theme", //default | dark-theme
            autoHide: true, //true | false
            delay: 2500, //number ms
            onShow: null, //function
            onClick: null, //function
            onHide: null, //function
            template: '<div class="notify"><div class="notify-text"></div></div>'
        });
    }
}

const Notify_C = new Notify()
export default Notify_C
