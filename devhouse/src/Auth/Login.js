import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Parent from '../Parent.js';
import Users from '../helpers/Api/Users.js';


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
            window.location.href = window.location.origin + '/';
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
                        id="email"
                        onChange={this.onChangeHandler.bind(this)}
                        name={"email"}
                        className={"mt-0"}
                        margin={"normal"} />
                    <TextField
                        label={"Password"}
                        fullWidth
                        value={password}
                        id="password"
                        onChange={this.onChangeHandler.bind(this)}
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