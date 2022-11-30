import CONFIG from '../../assets/js/Config.js'

export default class Requests {

    constructor(_path, _type, _data, _model) {
        this._server = CONFIG.SERVER
        this.path = _path
        this.type = _type
        this.data = _data
        this.model = _model
    }

    async send_request() {
        let res

        // fetch(this._server + this.path).then(req => req.text()).then(console.log)
        // return
        // Send request
        await $.ajax(this._server + this.path, {
            xhrFields: {cors: false},
            type: this.type,  // http method
            crossDomain: true,
            dataType: "json",
            data: {
                data: this.data,
                model: this.model
            },
            "headers": {
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*"
            },
            success: function (data, status, xhr) {
                // res = JSON.parse(data)
                res = data
            },
            error: function (jqXhr, textStatus, errorMessage) {
                $('p').append('Error' + errorMessage);
            }
        });

        return res
    }

}
