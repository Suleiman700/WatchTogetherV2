import Config from '../../../assets/js/Config.js';

class Footer {
    constructor() {}

    load() {
        const html = `
            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary rounded-top p-4">
                    <div class="row">
                        <div class="col-12 text-center">
                            &copy; <span class="text-danger">${Config.SITE_NAME}</span> All Right Reserved.
                        </div>
                    </div>
                </div>
            </div>
        `

        document.querySelector('#footer_area').innerHTML = html
    }
}

export default new Footer()
