/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import "../assets/scss/login-form.scss";
import auth from 'utils/auth'
import qs from 'qs'

// import { AvForm, AvField } from "availity-reactstrap-validation";

import axios from "axios";
// import auth from "../../utils/auth";

import {
    // Link,
    // Element,
    // Events,
    animateScroll as scroll,
    // scrollSpy,
    // scroller,
} from "react-scroll";

import ReactDatetime from "react-datetime";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Modal,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    FormFeedback,
    Container,
    Row,
    // Label,
    Col,
    // CardTitle,
    Alert,
    CardTitle,
} from "reactstrap";

const SignUp = (props) => {
    const danger = {
        color: "#ff0000",
    };
    const main = useRef(0);
    const [dob, setDob] = useState(new Date().toISOString());
    const [TnC, setTnC] = useState(false);
    const [userCredentials, setUserCredentials] = useState({
        firstName: "",
        middleName: "",
        lastName: "",

        password: "",
        password2: "",
        email: "",
    });

    const {
        firstName,
        middleName,
        lastName,

        password,
        password2,
        email,
    } = userCredentials;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };
    const history = useHistory();
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            onShowAlert("Passwords do not match.");
            return;
        } else if (password.length < 8) {
            onShowAlert("Password must be atleast 8 characters long");
            return;
        }
        const newUser = {
            username: firstName + ' ' + middleName + ' ' + lastName,

            password: password,
            email: email,
        };
        console.log(newUser);
        var data = qs.stringify(newUser);
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_URI+'users',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };

        axios(config)
            .then(function (response) {
                history.push("/auth/login");
            })
            .catch(function (error) {
                onShowAlert(error.response.data.data[0].messages[0].message);

            });

    };
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const onShowAlert = (text) => {
        scroll.scrollToTop();
        setAlertText(text);
        setAlert(true);
    };

    useEffect(() => {
        if (auth.getToken()) {
            history.push("/admin");
        }
    }, []);
    useEffect(() => {
        window.setTimeout(() => {
            setAlert(false);
            setAlertText("");
        }, 3500);
    }, [alert]);

    return (
        <>
            <main ref={main}>
                <section className="section section-shaped section-lg">
                    <div className="shape shape-style-1 bg-gradient-default">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <Alert color="danger" isOpen={alert}>
                        {alertText}
                    </Alert>
                    <Container className="pt-lg-7">
                        <Row className="justify-content-center">
                            <Col lg="12">
                                <Card className="form-component mt-4">
                                    <CardBody className="p-4 ">
                                        <CardTitle className=" p-4">

                                            <h1 >Sign Up </h1>

                                        </CardTitle>

                                        <Form role="form" onSubmit={onSubmit}>
                                            <FormGroup>
                                                <Row>
                                                    <Col lg="3">
                                                        <small>
                                                            First name <span style={danger}>*</span>
                                                        </small>
                                                    </Col>
                                                    <Col lg="9">
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <Input
                                                                placeholder="First Name"
                                                                type="text"
                                                                id="firstName"
                                                                required
                                                                name="firstName"
                                                                onChange={(e) => handleChange(e)}
                                                            />l
                                                            {/* <FormFeedback valid>Hello</FormFeedback> */}
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <FormGroup>
                                                <Row>
                                                    <Col lg="3">
                                                        <small>Middle name</small>
                                                    </Col>
                                                    <Col lg="9">
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <Input
                                                                placeholder="Middle Name"
                                                                type="text"
                                                                id="middleName"
                                                                name="middleName"
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <FormGroup>
                                                <Row>
                                                    <Col lg="3">
                                                        <small>
                                                            Last name <span style={danger}>*</span>
                                                        </small>
                                                    </Col>
                                                    <Col lg="9">
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <Input
                                                                placeholder="Last Name"
                                                                type="text"
                                                                id="lastName"
                                                                required
                                                                name="lastName"
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </FormGroup>


                                            <FormGroup>
                                                <small>
                                                    Email ID<span style={danger}>*</span>
                                                </small>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-world-2" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder="abc@xyz.com"
                                                        type="email"
                                                        name="email"
                                                        required
                                                        onChange={(e) => handleChange(e)}
                                                        autoComplete="off"
                                                    />
                                                </InputGroup>
                                            </FormGroup>

                                            <FormGroup>
                                                <Row>
                                                    <Col lg="6">
                                                        <small>
                                                            Password<span style={danger}>*</span>
                                                        </small>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-lock-circle-open" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                type="password"
                                                                required
                                                                name="password"
                                                                id="password"
                                                                placeholder="Password"
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <small>
                                                            Confirm Password<span style={danger}>*</span>
                                                        </small>
                                                        <InputGroup className="input-group-alternative mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-lock-circle-open" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                type="password"
                                                                name="password2"
                                                                id="password2"
                                                                required
                                                                placeholder="Confirm Password"
                                                                onChange={(e) => handleChange(e)}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Link to="/auth/login">Already signed up? Login</Link>
                                            </div>

                                            <div className="text-center">
                                                <Button className="mt-4" color="primary" type="submit">
                                                    Submit
                        </Button>
                                            </div>
                                        </Form>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>


        </>
    );
};

export default SignUp;
