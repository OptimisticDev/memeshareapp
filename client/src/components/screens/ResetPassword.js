import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import M from "materialize-css";

import Error from "../shared/Error";
import { USER_PASSWORD_RESET_POST_URL } from "../../constants/apiUrl";

const ResetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const resetPasswordHandler = async () => {
    if (!email) {
      setErrorMsg("Password is required!!");
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

        <button
          className="waves-effect waves-light red lighten-2 btn"
          onClick={resetPasswordHandler}
        >
          new password
        </button>
        {/* <h5>
          <Link to="/signup">Don't have an account ?</Link>
        </h5> */}
      </div>
    </div>
  );
};

export default ResetPassword;
