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
import auth from '../utils/auth'
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
import { Link } from "react-router-dom";


const Login = (props) => {
    const danger = {
        color: "#ff0000",
    };
    const main = useRef(0);

    const [userCredentials, setUserCredentials] = useState({
        password: "",
        email: "",
    });

    const {
        password,
        email
    } = userCredentials;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };
    const history = useHistory();
    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .post(
                process.env.REACT_APP_API_URI + "auth/local",
                qs.stringify({ identifier: email, password: password })
            )

            .then((response) => {
                auth.setToken(response.data.jwt, true);
                const { email } = response.data.user;
                // const id = response.data.user[type.toLowerCase()]._id;
                auth.setUserInfo({ email }, true);
                console.log(`[Login]`);
                console.log(response);
                console.log(auth.getUserInfo());
                history.push("/admin");
            })
            .catch((err) => {

                onShowAlert("Username/Password do not match.")

            })
    }
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
                                <Card className="form-component mt-4" style={{ minWidth: "478px" }}>
                                    <CardBody className="p-4 ">
                                        <CardTitle className=" p-4">

                                            <h1 >Login </h1>

                                        </CardTitle>
                                        <Form role="form" onSubmit={onSubmit}>
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
                                                    <Col lg="12">
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

                                                </Row>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Link to="/auth/sign-up">A new member? Sign Up</Link>
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

export default Login;
