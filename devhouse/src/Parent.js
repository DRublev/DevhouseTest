import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Parent extends Component {
    constructor(props) {
        super(props);

        this.auth = cookies.get('auth');
    }

    Alert(text) {
        return (
            <a href='/'>alert</a>
        );
    }
}

export default Parent;