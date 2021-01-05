import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Spinner } from "react-bootstrap";

import axios from "axios";
import M from "materialize-css";

import {
  SIGNUP_USER_ERROR_INITIAL_STATE,
  SIGNUP_USER_INITIAL_STATE,
} from "../../constants/initialState";
import { USER_SIGNUP_POST_URL } from "../../constants/apiUrl";

import Error from "../shared/Error";

const Signup = () => {
  const history = useHistory();

  const [signUpuser, setSignUpUser] = useState(SIGNUP_USER_INITIAL_STATE);
  const [errorMsg, setErrorMsg] = useState(SIGNUP_USER_ERROR_INITIAL_STATE);
  const [spinner, setSpinner] = useState(false);

  const signUpUserHandler = (e) => {
    e.preventDefault();

    const key = e.target.id;
    const value = e.target.value;

    setSignUpUser({ ...signUpuser, [key]: value });

    setErrorMsg({
      ...errorMsg,
      ...{
        [key]: SIGNUP_USER_ERROR_INITIAL_STATE[key],
        userExists: SIGNUP_USER_ERROR_INITIAL_STATE.userExists,
      },
    });
  };

  const signUpSubmitHandler = async () => {
    setSpinner(true);
    const { data } = await axios.post(USER_SIGNUP_POST_URL, signUpuser);

    if (data) {
      const { errors, success, message } = data;

      if (success) {
        M.toast({ html: message, classes: "success" });
        setSignUpUser({ ...SIGNUP_USER_INITIAL_STATE });
        history.push("/signin");
      } else {
        setErrorMsg({ ...errors });
      }
    }
    setSpinner(false);
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">MemeVerse</h2>
        <input
          type="text"
          id="name"
          placeholder="name"
          value={signUpuser.name}
          onChange={signUpUserHandler}
        />
        {errorMsg.name && <Error error={errorMsg.name} />}
        <input
          type="text"
          id="email"
          placeholder="email"
          value={signUpuser.email}
          onChange={signUpUserHandler}
        />
        {errorMsg.email && <Error error={errorMsg.email} />}
        <input
          type="password"
          id="password"
          placeholder="password"
          value={signUpuser.password}
          onChange={signUpUserHandler}
        />
        {errorMsg.password && <Error error={errorMsg.password} />}
        {errorMsg.userExists && <Error error={errorMsg.userExists} />}
        {/* {successMsg.message && <Success message={successMsg.message} />} */}
        {spinner ? (
          <Row>
            <Col>
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
        ) : (
          <button
            className="waves-effect waves-light red lighten-2 btn"
            onClick={signUpSubmitHandler}
          >
            SignUp
          </button>
        )}
        <h5>
          <Link to="/signin">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
