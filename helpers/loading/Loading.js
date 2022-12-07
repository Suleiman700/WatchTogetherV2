
class Loading {
    constructor() {}

    show(_title='Please Wait', _html='', _icon='', _show_close_btn=false, _show_spinner=true) {

        Swal.fire({
            title: `<strong>${_title}</strong>`,
            html: `
                ${_html}<br><br>
                ${(_show_spinner===true)?'<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>':''}
            `,
            icon: _icon,
            showCloseButton: _show_close_btn? true:false,
            showConfirmButton: false,
            showCancelButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
        })
    }

    hide() {
        Swal.close()
    }
}

export default new Loading()