import React, {Component, Fragment} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../img/logo.PNG'

class Menu extends Component {
    render() {
        return (
            <Fragment>
                <div className="navigation">
                    <Navbar variant="dark">
                        <Container>
                            <Navbar.Brand className="p-0 m-0" href="#home"><img className="p-0 m-0" src={logo} alt=""/></Navbar.Brand>
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
            </Fragment>
        );
    }
}

export default Menu;