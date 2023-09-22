import base from '../base'
export function fetchUserInfo(data) {
    return base.get('/permission', data)
}