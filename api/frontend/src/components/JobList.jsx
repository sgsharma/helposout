// reactstrap components
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Row
} from "reactstrap";
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { jobs } from "../actions";

class JobList extends Component {
  componentDidMount() {
    this.props.fetchJobs();
  }
  render() {
    return (
      <section className="section section-shaped section-xl">
        <div class="justify-content-center row">
          <Container>
            <Row>
              {this.props.jobs.map(u => (
                <Col sm={6}><Card key={u.id}>
                  <CardTitle>{u.title}</CardTitle>
                  <CardText>{u.description}</CardText>
                  <p class="description">Salary: {u.salary}</p>
                  <p class="description">Skills: {u.skills}</p>
                </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </section>
    )
  }
}


const mapStateToProps = state => {
  return {
    jobs: state.jobs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchJobs: () => {
      dispatch(jobs.fetchJobs());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(JobList);
