import $ from 'jquery';
import API from './API.js';

const config = require('../../config.js');

class Shops extends API {
    constructor(url) {
        super();

        if (url[url.length - 1] !== '/') {
            url += '/';
        }


        this.add = (data, successCallback, errorCallback) => {
            data = data || {};
            let auth = super.getAuthToken(data);

            $.ajax({
                method: 'POST',
                url: url + 'shop/add',
                headers: {
                    'x-access-token': auth,
                },
                data: data,
                success: (response, jqXHR) => {
                    successCallback(response);
                }
            });
        }

        this.update = (data, successCallback, errorCallback) => {
            data = data || {};
            let auth = super.getAuthToken(data);

            $.ajax({
                method: 'POST',
                url: url + 'shop/update',
                headers: {
                    'x-access-token': auth,
                },
                success: (response, jqXHR) => {
                    successCallback(response);
                }
            });
        }

        this.list = (data, successCallback, errorCallback) => {
            data = data || {};
            $.ajax({
                method: 'GET',
                url: url + 'shop/',
                data: data,
                success: (response, jqXHR) => {
                    successCallback(response);
                }
            });
        }

    }
}

export default new Shops(config.Backend);