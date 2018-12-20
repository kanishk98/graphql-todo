import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import firebase from "firebase";
import { Redirect } from 'react-router-dom';
import App from '../App';
import Constants from "../Constants";

const googleProvider = new firebase.auth.GoogleAuthProvider();

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: 'You\'ll need a Google account to sign in.',
      loggedIn: false,
    }
  }

  async componentWillMount() {
    if (await App.isLoggedIn() == 'yes') {
      this.setState({loggedIn: true});
    }
  }

  _onClickLogin = async () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(async res => {
        const token = res.credential.accessToken;
        const user = res.user;
        await window.localStorage.setItem("loggedIn", "yes");
        await window.localStorage.setItem("userObject", JSON.stringify(user));
        await window.localStorage.setItem("loginToken", JSON.stringify(token));
        this.setState({loggedIn: true});
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.loggedIn == true) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>GraphQL ToDo</h1>
                      <p>{this.state.text}</p>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={this._onClickLogin}
                          >
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>To-Do</h2>
                      <p>
                        React.js app built using Hasura GraphQL engine
                      </p>
                      <Button color="white" className="mt-3" active>
                        <a href="https://github.com/kanishk98/graphql-todo">
                          Check out the code
                        </a>
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
