// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

// core components
/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { auth } from "../actions";
import { connect } from 'react-redux';
import github_logo from "../assets/img/icons/common/github.svg";
import google_logo from "../assets/img/icons/common/google.svg";

class Login extends React.Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }

    state = {
        email: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <main ref="main">
                <section className="section section-shaped section">
                    <Container className="pt-lg-7">
                        <Row className="justify-content-center">
                            <Col lg="5">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-grey pb-5">
                                        <div className="text-muted text-center mb-3">
                                            <small>Sign in with</small>
                                        </div>
                                        <div className="btn-wrapper text-center">
                                            <Button
                                                className="btn-neutral btn-icon"
                                                color="default"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <span className="btn-inner--icon mr-1">
                                                    <img
                                                        alt="..."
                                                        src={github_logo}
                                                    />
                                                </span>
                                                <span className="btn-inner--text">Github</span>
                                            </Button>
                                            <Button
                                                className="btn-neutral btn-icon ml-1"
                                                color="default"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                                                <span className="btn-inner--icon mr-1">
                                                    <img
                                                        alt="..."
                                                        src={google_logo}
                                                    />
                                                </span>
                                                <span className="btn-inner--text">Google</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>Or sign in with credentials</small>
                                        </div>
                                        <Form role="form" onSubmit={this.onSubmit}>
                                            {this.props.errors.length > 0 && (
                                                <ul>
                                                    {this.props.errors.map(error => (
                                                        <li key={error.field}>{error.message}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Email"
                                                        id="email"
                                                        type="email"
                                                        onChange={e => this.setState({ email: e.target.value })} />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-lock-circle-open" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder="Password"
                                                        type="password"
                                                        autoComplete="off"
                                                        id="password"
                                                        onChange={e => this.setState({ password: e.target.value })}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="custom-control custom-control-alternative custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    id=" customCheckLogin"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor=" customCheckLogin"
                                                >
                                                    <span>Remember me</span>
                                                </label>
                                            </div>
                                            <div className="text-center">
                                                <Button
                                                    className="btn-neutral btn-icon"
                                                    color="default"
                                                    type="submit"
                                                >
                                                    Sign in
                          </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Row className="mt-3">
                                    <Col xs="6">
                                        <a
                                            className="text-light"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <small>Forgot password?</small>
                                        </a>
                                    </Col>
                                    <Col className="text-right" xs="6">
                                        <a
                                            className="text-light"
                                            href="/register"
                                        >
                                            <small>Create new account</small>
                                        </a>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        );
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return { field, message: state.auth.errors[field] };
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => {
            return dispatch(auth.login(email, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);