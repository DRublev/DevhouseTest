import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Parent from '../Parent.js';
import { isImport } from '@babel/types';
import Users from '../helpers/Api/Users.js';


let helpers = require('../helpers/functions.js');

class Login extends Parent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onLoginHandler = () => {
        var { email, password } = this.state;

        Users.login({
            email: email,
            password: password
        }, (data) => {
            helpers.login(data.auth)
        }, (code, error) => {
            console.warn('failed loigin', code);
        })
    }

    render() {
        var { email, password } = this.state;

        return (
            <div class={"md-10"}>
                <form>
                    <TextField
                        label={"Email"}
                        fullWidth
                        value={email}
                        onChange={this.onChangeHandler}
                        name={"email"} n
                        className={"mt-0"}
                        margin={"normal"} />
                    <TextField
                        label={"Password"}
                        fullWidth
                        value={password}
                        onChange={this.onChangeHandler}
                        name={"password"}
                        className={"mt-0"}
                        margin={"normal"} />

                    <Button
                        onClick={this.onLoginHandler}
                        className={"mb-3"}
                        variant="contained"
                        fullWidth>
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;