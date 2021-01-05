import React, { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import M from "materialize-css";

import { USER_NEW_PASSWORD_RESET_POST_URL } from "../../constants/apiUrl";
import { NEW_USER_PASSWORD_INITIAL_STATE } from "../../constants/initialState";

import Error from "../shared/Error";

const NewPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(NEW_USER_PASSWORD_INITIAL_STATE);

  const { token } = useParams();

  const resetPasswordHandler = async () => {
    const { data } = await axios.post(USER_NEW_PASSWORD_RESET_POST_URL, {
      password,
      token,
    });
    if (data) {
      const { success, errors, message } = data;
      if (success) {
        M.toast({ html: message, classes: "success" });
        history.push("/signin");
      } else {
        setErrorMsg({ ...errors });
      }
    }
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">MemeVerse</h2>
        <input
          type="password"
          placeholder="new password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg({ ...NEW_USER_PASSWORD_INITIAL_STATE });
          }}
        />
        {errorMsg && <Error error={errorMsg.expire} />}
        {errorMsg && <Error error={errorMsg.password} />}

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

export default NewPassword;
