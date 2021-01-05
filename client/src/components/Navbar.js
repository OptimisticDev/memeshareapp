import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import { UserContext } from "../App";

const NavBar = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg" bg="primary">
      <Navbar.Brand>
        <Link to="/" className="logo">
          MemeVerse
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav ">
        <Nav className="ml-auto">
          {!state ? (
            <>
              <Nav.Link>
                <Link to="/signin">SignIn</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/signup">SignUp</Link>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link>
                <Link to="/profile">Profile</Link>
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "CLEAR" });
                  history.push("/signin");
                }}
              >
                <Link> SignOut</Link>
              </Nav.Link>
              <Nav.Link>
                <Link>{state.name}</Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
