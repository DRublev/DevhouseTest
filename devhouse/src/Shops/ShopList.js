import React from 'react';
import Parent from '../Parent.js';
import { Container, ButtonGroup, Button } from 'react-bootstrap';

import ShopCard from './ShopCard';

import Shops from '../helpers/Api/Shops.js';
import Users from '../helpers/Api/Users.js';

import helpers from '../helpers/functions.js';

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

    onAddShopHandler = () => {
        window.location.href = window.location.origin + '/shop/add/';
    }

    onLogoutHandler = (event) => {
        helpers.onLogoutHandler(event);
    }

    render() {
        let { shops, me } = this.state;

        return (
            <Container className={'mt-3 col-md-10 d-flex flex-column'}>
                <ButtonGroup className={'col-md-3 ml-0 px-1'}>
                    <Button onClick={this.onAddShopHandler}>
                        {'Add shop'}
                    </Button>
                    <Button onClick={this.onLogoutHandler.bind(this)}>
                        {'Logout'}
                    </Button>
                </ButtonGroup>
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