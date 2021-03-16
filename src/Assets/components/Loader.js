import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import loader from'../img/spin.svg';


class Loader extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="d-flex justify-content-center">
                        <Col>
                            <div className="LoadingOverlay center-screen">
                                <img className="loader-size" src={loader} alt="loader"/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Loader;