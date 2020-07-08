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

// reactstrap components
import {
    Alert,
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
    Label,
    Row
} from "reactstrap";
import { AvField, AvForm } from 'availity-reactstrap-validation';

import React from "react";
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchOrgs from "../../actions/orgs";
// import github_logo from "../../assets/img/icons/common/github.svg";
// import google_logo from "../../assets/img/icons/common/google.svg";
import { register } from '../../actions/auth';

// core components
class Register extends React.Component {
    componentDidMount() {
        this.props.fetchOrgs();
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }

    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: "",
        organization: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            organization: this.state.organization,
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }
        return (
            <main ref="main">
                <section className="section section-shaped section">
                    <Container className="pt-lg-7">
                        <Row className="justify-content-center">
                            <Col lg="5">
                                <Card className="bg-secondary shadow border-0">
                                    {/* <CardHeader className="bg-grey pb-5"> */}
                                    {/* <div className="text-muted text-center mb-3">
                                            <small>Sign up with</small>
                                        </div>
                                        <div className="text-center">
                                            <Button
                                                className="btn-neutral btn-icon mr-4"
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
                                    </CardHeader> */}
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>Sign up with credentials</small>
                                        </div>
                                        <AvForm role="form" onSubmit={this.onSubmit}>
                                            {this.props.errors.length > 0 && (
                                                <p>
                                                    {this.props.errors.map(error => (
                                                        <Alert color="danger" key={error.field}>{error.field}:{error.message}</Alert>
                                                    ))}
                                                </p>
                                            )}
                                            <FormGroup>
                                                <AvField
                                                    placeholder="First Name"
                                                    name='first_name'
                                                    type="text"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Please enter a name' },
                                                        pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' },
                                                        minLength: { value: 2, errorMessage: 'Your name must be between 2 and 16 characters' },
                                                        maxLength: { value: 16, errorMessage: 'Your name must be between 2 and 16 characters' }
                                                    }}
                                                    onChange={e => this.setState({ first_name: e.target.value })}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <AvField
                                                    placeholder="Last Name"
                                                    name='last_name'
                                                    type="text"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Please enter a name' },
                                                        pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' },
                                                        minLength: { value: 2, errorMessage: 'Your name must be between 2 and 16 characters' },
                                                        maxLength: { value: 16, errorMessage: 'Your name must be between 2 and 16 characters' }
                                                    }}
                                                    onChange={e => this.setState({ last_name: e.target.value })}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <AvField
                                                    placeholder="Email"
                                                    name='email'
                                                    type="email"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Please enter your email' },
                                                        email: { value: true, errorMessage: 'Please enter a valid email' }
                                                    }}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <AvField
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    autoComplete="off"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Please enter a password' },
                                                        minLength: { value: 8, errorMessage: 'Your password must be at least 8 characters' },
                                                    }}
                                                    onChange={e => this.setState({ password: e.target.value })}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <AvField
                                                    placeholder="Confirm Password"
                                                    name="password2"
                                                    type="password"
                                                    autoComplete="off"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Please enter a password' },
                                                        minLength: { value: 8, errorMessage: 'Your password must be at least 8 characters' },
                                                        match: { value: "password", errorMessage: 'Passwords do not match' }
                                                    }}
                                                    onChange={e => this.setState({ password2: e.target.value })}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="organization">Organization</Label>
                                                <AvField
                                                    value='1'
                                                    type="select"
                                                    name="organization"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Please make a selection' }
                                                    }}
                                                    onChange={e => this.setState({ organization: e.target.value })}
                                                >
                                                    <option value='1' disabled>Select</option>
                                                    {this.props.orgs.map((org) => <option key={org.org_url} value={org.name}>{org.name}</option>)}
                                                </AvField>
                                            </FormGroup>
                                            {/* <div className="text-muted font-italic">
                                                <small>
                                                    password strength:{" "}
                                                    <span className="text-success font-weight-700">
                                                        strong
                                                    </span>
                                                </small>
                                            </div> */}
                                            {/* <Row className="my-4">
                                                <Col xs="12">
                                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                                        <input
                                                            className="custom-control-input"
                                                            id="customCheckRegister"
                                                            type="checkbox"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="customCheckRegister"
                                                        >
                                                            <span>
                                                                I agree with the{" "}
                                                                <a
                                                                    href="#pablo"
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    Privacy Policy
                                                                </a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row> */}
                                            <div className="text-center">
                                                <Button
                                                    className="btn-neutral btn-icon"
                                                    color="default"
                                                >
                                                    Create account
                                                </Button>
                                            </div>
                                        </AvForm>
                                    </CardBody>
                                </Card>
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
        isAuthenticated: state.auth.isAuthenticated,
        orgs: state.orgs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchOrgs: bindActionCreators(fetchOrgs, dispatch),
        register: bindActionCreators(register, dispatch)
    }
}

Register = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);

export default Register;