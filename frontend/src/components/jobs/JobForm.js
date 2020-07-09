// reactstrap components
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
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
    state = {};
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    render() {
        return (
            <section className="section section-shaped section-xl">
                <Container>
                    <Button type="button" onClick={() => this.toggleModal("formModal")}>
                        Form
                    </Button>
                    <Modal
                        className="modal-dialog-centered"
                        size="sm"
                        isOpen={this.state.formModal}
                        toggle={() => this.toggleModal("formModal")}
                    >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input
                                                        id="Job Title"
                                                        placeholder="name@example.com"
                                                        type="text"
                                                        onChange={(e) => this.setState({ text: e.target.value })}
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
                                        <div className="modal-footer">
                                            <Button color="primary" type="button">
                                                Save changes
                                            </Button>
                                            <Button
                                                className="ml-auto"
                                                color="link"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={() => this.toggleModal("defaultModal")}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                </Container>
            </section>
        );
    }
}

/* Table of posts by user
/ "Post your job!" -> modal
/ Table with jobs and edit and delete options
*/

export default JobForm;