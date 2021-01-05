import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { Row, Col, Spinner } from "react-bootstrap";

import axios from "axios";
import M from "materialize-css";

import {
  SIGNIN_USER_ERROR_INITIAL_STATE,
  SIGNIN_USER_INITIAL_STATE,
} from "../../constants/initialState";
import { USER_SIGNIN_POST_URL } from "../../constants/apiUrl";
import {
  LOCAL_STORAGE_JWT_KEY,
  LOCAL_STORAGE_USER_KEY,
} from "../../constants/constants";

import Error from "../shared/Error";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const [signInUser, setSignInUser] = useState(SIGNIN_USER_INITIAL_STATE);
  const [errorMsg, setErrorMsg] = useState(SIGNIN_USER_ERROR_INITIAL_STATE);
  const [spinner, setSpinner] = useState(false);

  const signInUserHandler = (e) => {
    e.preventDefault();

    const key = e.target.id;
    const value = e.target.value;

    setSignInUser({ ...signInUser, [key]: value });
    setErrorMsg({
      ...errorMsg,
      ...{
        [key]: SIGNIN_USER_ERROR_INITIAL_STATE[key],
        invalidUser: SIGNIN_USER_ERROR_INITIAL_STATE.invalidUser,
      },
    });
  };

  const signInSubmitHandler = async () => {
    setSpinner(true);
    const { data } = await axios.post(USER_SIGNIN_POST_URL, signInUser);

    if (data) {
      const { errors, success, message, user, token } = data;
      if (success) {
        localStorage.setItem(LOCAL_STORAGE_JWT_KEY, token);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));

        dispatch({ type: "USER", payload: user });

        M.toast({ html: message, classes: "success" });

        setSignInUser({ ...SIGNIN_USER_INITIAL_STATE });
        history.push("/");
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
          id="email"
          placeholder="email"
          value={signInUser.email}
          onChange={signInUserHandler}
        />
        {errorMsg.email && <Error error={errorMsg.email} />}
        <input
          type="password"
          id="password"
          placeholder="password"
          value={signInUser.password}
          onChange={signInUserHandler}
        />
        {errorMsg.password && <Error error={errorMsg.password} />}
        {errorMsg.invalidUser && <Error error={errorMsg.invalidUser} />}
        {spinner ? (
          <Row>
            <Col>
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
        ) : (
          <button
            className="waves-effect waves-light red lighten-2 btn"
            onClick={signInSubmitHandler}
          >
            SignIn
          </button>
        )}
        <h5>
          <Link to="/signup">Don't have an account ?</Link>
        </h5>
        <h6>
          <Link to="/reset" style={{ color: "blue" }}>
            Forget password ?
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default Signin;
