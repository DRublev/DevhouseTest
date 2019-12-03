import React, { Component } from 'react';
import Parent from '../Parent.js';

class ShopList extends Parent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class={"md-10"}>
                Shops List
            </div>
        );
    }
}

export default ShopList;