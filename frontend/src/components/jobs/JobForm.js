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
    Label,
    Modal,
    Row
} from "reactstrap";

import CreatableSelect from 'react-select/creatable';
import React from "react";
import { addJob } from '../../actions/jobs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class JobForm extends React.Component {
    componentDidMount() {
        this.props.fetchOrgs();
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }

    state = {
        title: "",
        job_url: "",
        description: "",
        skills: "",
        category: "",
        remote_ok: "",
        paid: "",
        salary: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.addJob({
            title: this.state.title,
            job_url: this.state.job_url,
            description: this.state.description,
            skills: this.state.skills,
            category: this.state.category,
            remote_ok: this.state.remote_ok,
            paid: this.state.paid,
            salary: this.state.salary
        });
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    render() {
        return (
            <section className="section section-shaped section-xl">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <h4>Let us help you create and maintain open source software.</h4>
                    </div>
                    <div class="row justify-content-md-center">
                        <Button
                            className="btn-neutral btn-icon"
                            type="button"
                            onClick={() => this.toggleModal("formModal")}>
                            Post a Job
                    </Button>
                    </div>
                </div>
                <Modal
                    className="modal-dialog-centered"
                    size="md"
                    isOpen={this.state.formModal}
                    toggle={() => this.toggleModal("formModal")}
                >
                    <div className="modal-body p-0">
                        <Card>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Input
                                            id="job_title"
                                            placeholder="Position Title"
                                            type="text"
                                            onSubmit={(e) => this.setState({ title: e.target.value })}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            id="job_url"
                                            placeholder="Job Link"
                                            type="url"
                                            onSubmit={(e) => this.setState({ job_url: e.target.value })}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            placeholder="Job Description"
                                            type="textarea"
                                            id="description"
                                            onSubmit={(e) => this.setState({ description: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <CreatableSelect
                                            placeholder="Skills"
                                            isMulti
                                            onSubmit={(e) => this.setState({ skills: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <CreatableSelect
                                            placeholder="Job Category"
                                            isMulti
                                            onSubmit={(e) => this.setState({ category: e.target.value })}
                                        />
                                    </FormGroup>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup check>
                                                <Label check>
                                                    <Input 
                                                    type="checkbox" 
                                                    id="remote_ok"
                                                    onSubmit={(e) => this.setState({ remote_ok: e.target.value })}
                                                    />{' '}
                                                    Remote OK
                                                        </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup check>
                                                <Label check>
                                                    <Input 
                                                    type="checkbox" 
                                                    id="paid"
                                                    onSubmit={(e) => this.setState({ paid: e.target.value })}
                                                    />{' '}
                                                    Paid
                                                        </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            name="number"
                                            id="salary"
                                            placeholder="Salary"
                                            onSubmit={(e) => this.setState({ salary: e.target.value })}
                                        />
                                    </FormGroup>
                                </Form>
                                <div className="modal-footer justify-content-center">
                                        <button
                                            type="submit"
                                            class="btn-neutral btn-icon btn btn-default"
                                        >Save changes
                                            </button>
                                        <button
                                            class="btn-neutral btn-icon btn btn-default"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => this.toggleModal("defaultModal")}
                                        >
                                            Close
                                            </button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>
            </section>
        );
    }
}

export default JobForm;