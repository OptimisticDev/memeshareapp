import React from "react";

const Error = ({ error }) => {
  console.log(error);
  return <div className={error ? "error" : ""}>{error}</div>;
};

export default Error;
