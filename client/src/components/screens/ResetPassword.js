import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

import M from "materialize-css";
import { Row, Col, Spinner } from "react-bootstrap";

import Error from "../shared/Error";
import { USER_PASSWORD_RESET_POST_URL } from "../../constants/apiUrl";

const ResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [spinner, setSpinner] = useState(false);

  const resetPasswordHandler = async () => {
    setSpinner(true);
    if (!email) {
      setErrorMsg("Email is required!!");
    } else {
      const { data } = await axios.post(USER_PASSWORD_RESET_POST_URL, {
        email,
      });
      if (data) {
        const { success, errors, message } = data;
        if (success) {
          M.toast({ html: message, classes: "success" });
          history.push("/signin");
        } else {
          setErrorMsg(errors.invalidUser);
        }
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
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMsg("");
          }}
        />
        {errorMsg && <Error error={errorMsg} />}

        {spinner ? (
          <Row>
            <Col>
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
        ) : (
          <button
            className="waves-effect waves-light red lighten-2 btn"
            onClick={resetPasswordHandler}
          >
            Send email
          </button>
        )}
        <h5>
          <Link to="/signin">Go to SignIn ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default ResetPassword;
