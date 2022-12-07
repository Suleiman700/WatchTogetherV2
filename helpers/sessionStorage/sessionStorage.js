export const set_session_storage = (_key, _data) => {
    switch (_key) {
        case 'data':
            return sessionStorage.setItem('SYNCWATCH_data', _data)
        case 'token':
            return sessionStorage.setItem('SYNCWATCH_token', _data)
    }
};

export const get_session_storage = (_key) => {
    switch (_key) {
        case 'data':
            return sessionStorage.getItem('SYNCWATCH_data')
        case 'token':
            return sessionStorage.getItem('SYNCWATCH_token')
    }
};

export const clear_session_storage = (_key) => {
    switch (_key) {
        case 'token':
            return sessionStorage.removeItem('SYNCWATCH_token')
    }
};
