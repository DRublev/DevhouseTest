import $ from 'jquery';
import API from './API.js';
var config = require('../../config.js');

class Users extends API {
    constructor(url) {
        super();

        if (url[url.length - 1] !== '/') {
            url += '/';
        }

        this.login = (data, successCallback, errorCallback) => {
            data = data || {};

            $.ajax({
                method: 'POST',
                url: url + 'user/login',
                data: {
                    email: data.email,
                    password: data.password,
                    auth: data.auth
                },
                success: (response, jqXHR) => {
                    successCallback(response);
                    console.log('success login', response);
                }
            })
        }
    }
}

export default new Users(config.Backend);