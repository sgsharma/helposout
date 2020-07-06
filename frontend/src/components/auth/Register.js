import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import fetchOrgs from "../../actions/orgs";
import { register } from '../../actions/auth';

class Register extends Component {
    componentDidMount() {
        this.props.fetchOrgs();
    }
    renderField = ({ input, label, type, meta: { touched, error } }) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
                <label>{label}</label>
                <input {...input} type={type} />
                {touched && error && (
                    <span className='ui pointing red basic label'>{error}</span>
                )}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.register(formValues);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }
        return (
            <div className='ui container'>
                <div className='ui segment'>
                    <form
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                        className='ui form'
                    >
                        <Field
                            name='email'
                            type='email'
                            component={this.renderField}
                            label='Email'
                            validate={required}
                        />
                        <Field
                            name='password1'
                            type='password'
                            component={this.renderField}
                            label='Password'
                            validate={required}
                        />
                        <Field
                            name='password2'
                            type='password'
                            component={this.renderField}
                            label='Confirm Password'
                            validate={required}
                        />
                        <Field name='organization' label='Organization' type='text' component="select">
                        {this.props.orgs.map((x) => <option key={x.org_url}>{x.name}</option>)}
                        </Field>
                        <button className='ui primary button'>Register</button>
                    </form>
                    <p style={{ marginTop: '1rem' }}>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

const required = value => (value ? undefined : 'Required');

const minLength = min => value =>
    value && value.length < min
        ? `Must be at least ${min} characters`
        : undefined;

const minLength3 = minLength(3);

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

const maxLength15 = maxLength(15);

const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Passwords do not match' : undefined;

const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated,
        orgs: state.orgs
})

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

export default reduxForm({
    form: 'registerForm'
})(Register);

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchOrgs: () => {
//             dispatch(fetchOrgs());
//         }
//     }
// }

// let InitializeFromStateForm = reduxForm({
//     form: 'registerForm'
// })(Register);

// InitializeFromStateForm = connect(
//     state => ({
//     orgs: state.orgs,
//     initialValues: state.orgs
//     }),
//     { fetchOrgs },
//     { register }
// )(InitializeFromStateForm);

// export default InitializeFromStateForm;


// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.isAuthenticated,
//         orgs: state.orgs
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchJobs: () => {dispatch(orgs.fetchJobs());}
//     }
// }


// Register = connect(
//     mapStateToProps,
//     { register }
// )(Register);

// export default reduxForm({
//     form: 'registerForm'
// })(Register);



// /*!

// =========================================================
// * Argon Design System React - v1.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-design-system-react
// * Copyright 2020 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// // reactstrap components
// import {
//     Button,
//     Card,
//     CardBody,
//     CardHeader,
//     Col,
//     Container,
//     Form,
//     FormGroup,
//     Input,
//     InputGroup,
//     InputGroupAddon,
//     InputGroupText,
//     Label,
//     Row
// } from "reactstrap";

// import React from "react";
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import fetchOrgs from "../../actions/orgs";
// import github_logo from "../../assets/img/icons/common/github.svg";
// import google_logo from "../../assets/img/icons/common/google.svg";
// import { register } from '../../actions/auth';

// // core components
// class Register extends React.Component {
//     componentDidMount() {
//         this.props.fetchOrgs();
//         document.documentElement.scrollTop = 0;
//         document.scrollingElement.scrollTop = 0;
//         this.refs.main.scrollTop = 0;
//     }
//     render() {
//         if (this.props.isAuthenticated) {
//             return <Redirect to='/' />;
//         }
//         return (
//             <main ref="main">
//                 <section className="section section-shaped section">
//                     <Container className="pt-lg-7">
//                         <Row className="justify-content-center">
//                             <Col lg="5">
//                                 <Card className="bg-secondary shadow border-0">
//                                     <CardHeader className="bg-grey pb-5">
//                                         <div className="text-muted text-center mb-3">
//                                             <small>Sign up with</small>
//                                         </div>
//                                         <div className="text-center">
//                                             <Button
//                                                 className="btn-neutral btn-icon mr-4"
//                                                 color="default"
//                                                 href="#pablo"
//                                                 onClick={e => e.preventDefault()}
//                                             >
//                                                 <span className="btn-inner--icon mr-1">
//                                                     <img
//                                                         alt="..."
//                                                         src={github_logo}
//                                                     />
//                                                 </span>
//                                                 <span className="btn-inner--text">Github</span>
//                                             </Button>
//                                             <Button
//                                                 className="btn-neutral btn-icon ml-1"
//                                                 color="default"
//                                                 href="#pablo"
//                                                 onClick={e => e.preventDefault()}
//                                             >
//                                                 <span className="btn-inner--icon mr-1">
//                                                     <img
//                                                         alt="..."
//                                                         src={google_logo}
//                                                     />
//                                                 </span>
//                                                 <span className="btn-inner--text">Google</span>
//                                             </Button>
//                                         </div>
//                                     </CardHeader>
//                                     <CardBody className="px-lg-5 py-lg-5">
//                                         <div className="text-center text-muted mb-4">
//                                             <small>Or sign up with credentials</small>
//                                         </div>
//                                         <Form role="form">
//                                             <FormGroup>
//                                                 <InputGroup className="input-group-alternative mb-3">
//                                                     <InputGroupAddon addonType="prepend">
//                                                         <InputGroupText>
//                                                             <i className="ni ni-hat-3" />
//                                                         </InputGroupText>
//                                                     </InputGroupAddon>
//                                                     <Input placeholder="Name" type="text" />
//                                                 </InputGroup>
//                                             </FormGroup>
//                                             <FormGroup>
//                                                 <InputGroup className="input-group-alternative mb-3">
//                                                     <InputGroupAddon addonType="prepend">
//                                                         <InputGroupText>
//                                                             <i className="ni ni-email-83" />
//                                                         </InputGroupText>
//                                                     </InputGroupAddon>
//                                                     <Input placeholder="Email" type="email" />
//                                                 </InputGroup>
//                                             </FormGroup>
//                                             <FormGroup>
//                                                 <InputGroup className="input-group-alternative">
//                                                     <InputGroupAddon addonType="prepend">
//                                                         <InputGroupText>
//                                                             <i className="ni ni-lock-circle-open" />
//                                                         </InputGroupText>
//                                                     </InputGroupAddon>
//                                                     <Input
//                                                         placeholder="Password"
//                                                         type="password"
//                                                         autoComplete="off"
//                                                     />
//                                                 </InputGroup>
//                                             </FormGroup>
//                                             <FormGroup>
//                                                 <InputGroup className="input-group-alternative">
//                                                     <InputGroupAddon addonType="prepend">
//                                                         <InputGroupText>
//                                                             <i className="ni ni-lock-circle-open" />
//                                                         </InputGroupText>
//                                                     </InputGroupAddon>
//                                                     <Input
//                                                         placeholder="Confirm Password"
//                                                         type="password"
//                                                         autoComplete="off"
//                                                     />
//                                                 </InputGroup>
//                                             </FormGroup>
//                                             <FormGroup>
//                                                 <InputGroup className="input-group-alternative">
//                                                     <InputGroupAddon addonType="prepend">
//                                                         <InputGroupText>
//                                                             <i className="ni ni-lock-circle-open" />
//                                                         </InputGroupText>
//                                                     </InputGroupAddon>
//                                                     <Input
//                                                         placeholder="Confirm Password"
//                                                         type="password"
//                                                         autoComplete="off"
//                                                     />
//                                                 </InputGroup>
//                                             </FormGroup>
//                                             <FormGroup>
//                                                 <Label for="orgSelect">Select</Label>
//                                                 <Input type="select" name="select" id="org">
//                                                 {this.props.orgs.map((name, url) => <option key={name}>{url}</option>)}
//                                                 </Input>
//                                             </FormGroup>
//                                             {/* <div className="text-muted font-italic">
//                                                 <small>
//                                                     password strength:{" "}
//                                                     <span className="text-success font-weight-700">
//                                                         strong
//                                                     </span>
//                                                 </small>
//                                             </div> */}
//                                             <Row className="my-4">
//                                                 <Col xs="12">
//                                                     <div className="custom-control custom-control-alternative custom-checkbox">
//                                                         <input
//                                                             className="custom-control-input"
//                                                             id="customCheckRegister"
//                                                             type="checkbox"
//                                                         />
//                                                         <label
//                                                             className="custom-control-label"
//                                                             htmlFor="customCheckRegister"
//                                                         >
//                                                             <span>
//                                                                 I agree with the{" "}
//                                                                 <a
//                                                                     href="#pablo"
//                                                                     onClick={e => e.preventDefault()}
//                                                                 >
//                                                                     Privacy Policy
//                                                                 </a>
//                                                             </span>
//                                                         </label>
//                                                     </div>
//                                                 </Col>
//                                             </Row>
//                                             <div className="text-center">
//                                                 <Button
//                                                     className="btn-neutral btn-icon"
//                                                     color="default"
//                                                 >
//                                                     Create account
//                                                 </Button>
//                                             </div>
//                                         </Form>
//                                     </CardBody>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </section>
//             </main>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.isAuthenticated,
//         orgs: state.orgs
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchOrgs: () => {
//             dispatch(fetchOrgs());
//         }
//     }
// }

// Register = connect(
//     mapStateToProps,
//     mapDispatchToProps,
//     { register }
// )(Register);

// export default Register;