import React from "react";

const Success = ({ message }) => {
  return <div className={message ? "success" : ""}>{message}</div>;
};

export default Success;
