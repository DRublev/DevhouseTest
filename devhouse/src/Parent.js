import { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Parent extends Component {
    constructor(props) {
        super(props);

        this.auth = cookies.get('auth');
    }
}

export default Parent;