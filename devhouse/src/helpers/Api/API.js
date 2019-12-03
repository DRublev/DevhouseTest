import Cookies from 'universal-cookie';

const cookies = new Cookies();

class API {
    constructor() {

    }

    getAuthToken(data) {
        let auth = data.auth || cookies.get('auth');
        delete data.auth;

        return auth;
    }


}

export default API;