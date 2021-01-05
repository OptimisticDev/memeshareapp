import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../App";

const Navbar = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  return (
    <div>
      {state && (
        <nav>
          <div className="nav-wrapper">
            <Link to="/home" className="brand-logo left">
              MemeVerse
            </Link>

            <ul id="nav-mobile" className="right">
              {!state ? (
                <div>
                  <li>
                    <Link to="/signin">SignIn</Link>
                  </li>
                  <li>
                    <Link to="/signup">SignUp</Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button
                      className="waves-effect waves-light red lighten-2 btn"
                      onClick={() => {
                        localStorage.clear();
                        dispatch({ type: "CLEAR" });
                        history.push("/signin");
                      }}
                    >
                      SignOut
                    </button>
                  </li>
                  <li className="current-user">{state.name}</li>
                </div>
              )}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
