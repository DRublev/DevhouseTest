import $ from 'jquery';
import API from './API.js';

const config = require('../../config.js');

class Shops extends API {
    constructor(url) {
        super();

        if (url[url.length - 1] !== '/') {
            url += '/';
        }

        this.list = (data, successCallback, errorCallback) => {
            data = data || {};
            let auth = super.getAuthToken(data);
            console.log(url);
            $.ajax({
                method: 'GET',
                url: url + 'shop/',
                headers: {
                    'Authorization': 'JWT ' + auth,
                    'x-access-token': auth,
                },
                data: data,
                success: (response, jqXHR) => {
                    successCallback(response);
                }
            })
        }
    }
}

export default new Shops(config.Backend);