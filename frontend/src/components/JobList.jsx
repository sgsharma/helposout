// reactstrap components
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { jobs } from "../actions";

class JobList extends Component {

  state = {
    text: ""
  }

  submitJob = (e) => {
    e.preventDefault();
    this.props.addJob(this.state.text);
    this.setState({ text: "" });
  }

  render() {
    return (
      // <div id="jobs">
      <section className="section section-shaped section-xl">
        <div id="jobs">
          <Container>
            <Row>
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <div className="w-100" />
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <div className="w-100" />
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <div className="w-100" />
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <div className="w-100" />
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
              <Col>
                <Card><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Card>
              </Col>
            </Row>
          </Container>

          {/* <h2>Welcome to JobList!</h2>
        <p>
          <Link to="/contact">Click Here</Link> to contact us!
    </p>

        <h3>Post A Job</h3>
        <Form onSubmit={this.submitNote}>
          <Col md="6">
            <FormGroup>
              <Input
                value={this.state.text}
                placeholder="Enter job description here"
                rows="3"
                type="textarea"
                onChange={(e) => this.setState({ text: e.target.value })}
                required />
              <Button>Save</Button>
            </FormGroup>
          </Col>
        </Form> */}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (text) => {
      dispatch(jobs.addJob(text));
    },
    updateNote: (id, text) => {
      dispatch(jobs.addJob(id, text));
    },
    deleteNote: (id) => {
      dispatch(jobs.deleteJob(id));
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(JobList);
