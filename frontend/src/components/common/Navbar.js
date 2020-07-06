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
// JavaScript plugin that hides or shows a component based on your scroll

import { Button, Col, Container, DropdownMenu, DropdownToggle, Nav, NavItem, Navbar, NavbarBrand, Row, UncontrolledCollapse, UncontrolledDropdown } from "reactstrap";

import { HashLink } from 'react-router-hash-link';
import Headroom from "headroom.js";
import { Link } from "react-router-dom";
import React from "react";
import { connect } from 'react-redux';
import logo from "../../assets/img/brand/helpos-tmp-logo.png";
import { logout } from '../../actions/auth';

class DemoNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;

    const userLinks = (
      <Nav className="navbar-nav-hover align-items-lg-center" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle nav>
            <i className="ni ni-ui-04 d-lg-none mr-1" />
            <span className="nav-link-inner--text">{user ? user.email : ''}</span>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-l">
            <div className="dropdown-menu-inner">
              <a onClick={this.props.logout}
                class="nav-link">
                <i className="ni ni-ui-04 d-lg-none mr-1" />
                <span className="nav-link-inner--text">Log Out</span>
              </a>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );

    const guestLinks = (
      <Nav className="navbar-nav-hover align-items-lg-center" navbar>
        <a
          href="/login"
          class="nav-link">
          <i className="ni ni-ui-04 d-lg-none mr-1" />
          <span className="nav-link-inner--text">Log In</span>
        </a>
      </Nav>
    );

    return (
      <Navbar
        className="navbar-main navbar-transparent navbar-light headroom"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            <img
              alt="..."
              src={logo}
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar_global">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            toggler="#navbar_global"
            navbar
            className={this.state.collapseClasses}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={logo}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar_global">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              {isAuthenticated ? userLinks : guestLinks}
              <NavItem className="d-none d-lg-block ml-lg-4">
                <HashLink to="/#jobs">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                  >
                    <span className="nav-link-inner--text ml-1">
                      Browse Jobs
                        </span>
                  </Button>
                </HashLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      // </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(DemoNavbar);