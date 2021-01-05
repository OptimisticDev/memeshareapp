import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";

import {
  POST_GET_URL,
  POST_UPDATE_LIKE_UNLIKE_URL,
  POST_UPDATE_COMMENT_URL,
} from "../../constants/apiUrl";

import PostCard from "../shared/PostCard";

import { authorizedHeaderHelper } from "../../helpers/authorizedHeaderHelper";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const headers = authorizedHeaderHelper();

    const getAllPosts = async () => {
      const { data } = await axios.get(POST_GET_URL, { headers });

      if (data) {
        const { posts, success } = data;
        if (success) {
          setPosts(posts);
        }
      }
    };

    getAllPosts();
  }, []);

  const likeUnlikePostHandler = async (id, key) => {
    const headers = authorizedHeaderHelper();

    const postId = { postId: id };

    const res = await axios.put(POST_UPDATE_LIKE_UNLIKE_URL, postId, {
      headers,
    });
    if (res) {
      const { data } = res;

      const updateData = posts;
      updateData[key].likes = data.likes;

      setPosts([]);
      setPosts(updateData);
    }
  };

  const commentHandler = async (text, postId, key) => {
    const headers = authorizedHeaderHelper();

    const newComment = { postId, text };
    if (text) {
      const res = await axios.put(POST_UPDATE_COMMENT_URL, newComment, {
        headers,
      });
      if (res) {
        const { data } = res;
        console.log(data);
        const updateData = posts;
        updateData[key].comments = data.comments;

        setPosts([]);
        setPosts(updateData);
      }
    }
  };

  return (
    posts.length > 0 &&
    posts.map((post, i) => (
      <PostCard
        key={i}
        index={i}
        id={state._id}
        data={post}
        likeUnlikePost={likeUnlikePostHandler}
        commentPost={commentHandler}
      />
    ))
  );
};

export default Home;
