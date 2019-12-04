import React from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import Parent from '../Parent.js';
import Users from '../helpers/Api/Users';


let helpers = require('../helpers/functions.js');

class Login extends Parent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    onChangeHandler = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    onLoginHandler = () => {
        var { email, password } = this.state;

        Users.login({
            email: email,
            password: password
        }, (data) => {
            helpers.onLoginHandler(data.token);
        }, (code, error) => {
            console.warn('failed loigin', code);
        })
    }

    render() {
        var { email, password } = this.state;

        return (
            <div className={"col-md-6"}>
                <form>
                    <InputGroup className={'my-2'}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type={'text'}
                            label={"Email"}
                            value={email}
                            id="email"
                            onChange={this.onChangeHandler.bind(this)}
                            name={"email"}
                            className={"mt-0"}
                            margin={"normal"} />
                    </InputGroup>
                    <InputGroup className={'my-2'}>
                        <FormControl
                            type={'password'}
                            label={"Password"}
                            value={password}
                            id="password"
                            onChange={this.onChangeHandler.bind(this)}
                            name={"password"}
                            className={"mt-0"}
                            margin={"normal"} />
                    </InputGroup>


                    <Button
                        onClick={this.onLoginHandler}
                        className={"mb-3"}
                        variant="primary">
                        {'Login'}
                    </Button>
                </form>
            </div >
        );
    }
}

export default Login;