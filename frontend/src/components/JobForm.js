// reactstrap components
import {
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

import React from "react";

// state = {
//     text: ""
// }

// submitJob = (e) => {
//     e.preventDefault();
//     this.props.addJob(this.state.text);
//     this.setState({ text: "" });
// }


class JobForm extends React.Component {
    render() {
        return (
            <section className="section section-shaped section-xl">
                <Container>
                    <Form>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Input
                                        id="Job Title"
                                        placeholder="name@example.com"
                                        type="text"
                                        onChange={(e) => this.setState({text: e.target.value})}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Input disabled placeholder="Regular" type="text" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-zoom-split-in" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Search" type="text" />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <InputGroup className="mb-4">
                                        <Input placeholder="Birthday" type="text" />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i className="ni ni-zoom-split-in" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup className="has-success">
                                    <Input
                                        className="is-valid"
                                        placeholder="Success"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup className="has-danger">
                                    <Input
                                        className="is-invalid"
                                        placeholder="Error Input"
                                        type="email"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </section>
        );
    }
}

export default JobForm;