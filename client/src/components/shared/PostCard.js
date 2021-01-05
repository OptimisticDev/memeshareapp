import React, { useState } from "react";

const PostCard = (props) => {
  const [comment, setComment] = useState("");
  const { _id, title, body, image, postedBy, likes, comments } = props.data;
  return (
    <div className="post">
      <div className="card post__card">
        <h5>{postedBy?.name}</h5>
        <div className="card-image">
          <img src={image} />
        </div>
        <div className="card-content post__content">
          {likes.includes(props.id) ? (
            <i
              className="material-icons"
              style={{ color: "#0277bd", cursor: "pointer" }}
              onClick={(e) => props.likeUnlikePost(_id, props.index)}
            >
              thumb_down
            </i>
          ) : (
            <i
              className="material-icons"
              style={{ color: "#e57373", cursor: "pointer" }}
              onClick={(e) => props.likeUnlikePost(_id, props.index)}
            >
              thumb_up
            </i>
          )}

          <h6>
            {likes.length <= 1
              ? `${likes.length} like`
              : `${likes.length} likes`}
          </h6>
          <h6>{title}</h6>
          <p>{body}</p>
          <div className="input-field">
            <input
              type="text"
              placeholder="add comments.."
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            className="waves-effect waves-light red lighten-2 btn"
            onClick={(e) => props.commentPost(comment, _id, props.index)}
          >
            Comment
          </button>
          {comments.length > 0 &&
            comments.map((comment, i) => (
              <div className="comment card" key={i}>
                <h6>
                  <span>{comment.commentedBy?.name}</span>
                </h6>
                <p className="comment-tetx">{comment.text}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
