import React from 'react';
import { InputGroup, Button, FormControl, Container } from 'react-bootstrap';
import Parent from '../Parent.js';
import Users from '../helpers/Api/Users';


let helpers = require('../helpers/functions.js');

class Login extends Parent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            regEmail: '',
            regPassword: '',
            regConfirmPassword: ''
        };
    }

    onChangeHandler = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    onLoginHandler = () => {
        const { email, password } = this.state;

        Users.login({
            email: email,
            password: password
        }, (data) => {
            helpers.onLoginHandler(data.token);
        }, (code, error) => {
            console.warn('failed loigin', code);
        })
    }

    onRegisterHandler = () => {
        const { regEmail, regPassword, regConfirmPassword } = this.state;

        if (regPassword !== regConfirmPassword) {
            alert('Passwords must match');
            return;
        }

        Users.register({
            email: regEmail,
            password: regPassword
        }, (data) => {
            helpers.onLoginHandler(data.token);
        }, (code, error) => {
            console.warn('failed register', code);
        });
    }

    render() {
        var { email, password, regEmail, regPassword, regConfirmPassword } = this.state;

        return (
            <div className={'col-md-12 d-flex flex-row'}>
                <Container>
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
                </Container>
                <Container>
                    <form>
                        <InputGroup className={'my-2'}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type={'text'}
                                label={"Email"}
                                value={regEmail}
                                id="regEmail"
                                onChange={this.onChangeHandler.bind(this)}
                                name={"regEmail"}
                                className={"mt-0"}
                                margin={"normal"} />
                        </InputGroup>
                        <InputGroup className={'my-2'}>
                            <FormControl
                                type={'password'}
                                label={"Password"}
                                value={regPassword}
                                id="regPassword"
                                onChange={this.onChangeHandler.bind(this)}
                                name={"regPassword"}
                                className={"mt-0"}
                                margin={"normal"} />
                        </InputGroup>
                        <InputGroup className={'my-2'}>
                            <FormControl
                                type={'password'}
                                label={"Password"}
                                value={password}
                                id="regConfirmPassword"
                                onChange={this.onChangeHandler.bind(this)}
                                name={"password"}
                                className={"mt-0"}
                                margin={"normal"} />
                        </InputGroup>

                        <Button
                            onClick={this.onRegisterHandler}
                            className={"mb-3"}
                            variant="primary">
                            {'Register'}
                        </Button>
                    </form>
                </Container>
            </div >
        );
    }
}

export default Login;