import React from 'react';
import Parent from '../Parent.js';
import { Container } from 'react-bootstrap';

import ShopCard from './ShopCard';

import Shops from '../helpers/Api/Shops.js';
import Users from '../helpers/Api/Users.js';

class ShopList extends Parent {
    constructor(props) {
        super(props);

        this.state = {
            shops: [],
            me: {}
        };
    }

    loadShops = () => {
        Shops.list({}, (data) => {
            this.setState({
                shops: data.data.shops
            }, (code, err) => {
                console.warn(code);
            });
        });
    }

    componentWillMount() {
        this.loadShops();

        Users.me({}, (data) => {
            this.setState({
                me: data
            });

        });
    }

    render() {
        let { shops, me } = this.state;

        return (
            <Container className={'mt-3 col-md-10 d-flex flex-column'}>

                {shops.map((shop, index) =>
                    <ShopCard key={shop._id}
                        index={index}
                        editable={shop.owner === me._id}
                        shop={shop} />
                )}
            </Container >
        );
    }
}

export default ShopList;