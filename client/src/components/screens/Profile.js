import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import axios from "axios";
import M from "materialize-css";

import {
  POST_ERROR_INITIAL_STATE,
  POST_INITIAL_STATE,
} from "../../constants/initialState";
import {
  CLOUDNARY_API_URL,
  POST_GET_MYPOST_URL,
  POST_POST_URL,
} from "../../constants/apiUrl";

import Error from "../shared/Error";
import UserPostCard from "../shared/UserPostCard";

import { authorizedHeaderHelper } from "../../helpers/authorizedHeaderHelper";

const Profile = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [post, setPost] = useState(POST_INITIAL_STATE);
  const [errorMsg, setErrorMsg] = useState(POST_ERROR_INITIAL_STATE);
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const postHandler = (e) => {
    e.preventDefault();
    const key = e.target.id;
    const value = e.target.value;
    setPost({ ...post, [key]: value });
  };

  const uploadPhoto = async () => {
    setSpinner(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Memeverse");
    data.append("cloud_name", "dhku5t0x0");

    if (image) {
      const res = await axios.post(CLOUDNARY_API_URL, data);
      if (res) {
        const { data } = res;
        setImage("");
        setPost({ ...post, image: data.secure_url });
      }
    } else {
      setErrorMsg({ ...errorMsg, image: "You haven't attach photo yet!" });
    }
    setSpinner(false);
  };

  const postDetails = async () => {
    if (post.image) {
      const headers = authorizedHeaderHelper();

      const { data } = await axios.post(POST_POST_URL, post, {
        headers: headers,
      });

      if (data) {
        const { errors, success, message, user, token } = data;

        if (success) {
          M.toast({ html: message, classes: "success" });
          setPost({ ...POST_INITIAL_STATE });
          history.push("/");
        } else {
          M.toast({ html: errors.invalidUser, classes: "error" });
          setErrorMsg({ ...errors });
        }
      }
    } else {
      setErrorMsg({ ...errorMsg, image: "Image didn't upload yet!" });
    }
  };

  useEffect(() => {
    const headers = authorizedHeaderHelper();

    const getAllPosts = async () => {
      const { data } = await axios.get(POST_GET_MYPOST_URL, { headers });

      if (data) {
        const { myPosts, success } = data;
        if (success) {
          setPosts(myPosts);
        }
      }
    };

    getAllPosts();
  }, []);

  return (
    <div>
      <div className="profile">
        <div className="profile__content">
          <h5>{state?.name}</h5>
          <h6>
            {posts.length <= 1
              ? `${posts.length} post`
              : `${posts.length} posts`}
          </h6>
        </div>
        <div className="card input-field generate__post">
          <input
            type="text"
            id="title"
            placeholder="title"
            value={post.title}
            onChange={postHandler}
          />
          {errorMsg.title && <Error error={errorMsg.title} />}
          <input
            type="text"
            id="body"
            placeholder="body"
            value={post.body}
            onChange={postHandler}
          />
          {errorMsg.body && <Error error={errorMsg.body} />}
          <div className="file-field input-field">
            <div className="red lighten-2 btn">
              <span>Attach photo</span>
              <input
                type="file"
                onChange={(e) => {
                  setErrorMsg({ ...POST_ERROR_INITIAL_STATE });
                  setImage(e.target.files[0]);
                }}
              ></input>
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                value={post.image}
              ></input>
            </div>
          </div>
          {errorMsg.image && <Error error={errorMsg.image} />}
          {image && !spinner && (
            <button
              className={
                post.image
                  ? "waves-effect waves-light green lighten-2 btn"
                  : "waves-effect waves-light red lighten-2 btn"
              }
              onClick={uploadPhoto}
            >
              Upload Photo
            </button>
          )}
          {spinner && (
            <Row>
              <Col>
                <Spinner animation="border" variant="primary" />
              </Col>
            </Row>
          )}
          {post.image && (
            <button
              className="waves-effect waves-light red lighten-2 btn"
              onClick={postDetails}
            >
              Share Post
            </button>
          )}
        </div>
      </div>
      <Container>
        <Row>
          {posts.length > 0 &&
            posts.map((post, i) => <UserPostCard key={i} image={post.image} />)}
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
