import React from "react";
import { Card, Col, Image } from "react-bootstrap";
const UserPostCard = ({ image }) => {
  return (
    <Col xs={6} md={2}>
      <Image className="mypost__image" src={image} alt="image" fluid />
    </Col>
  );
};

export default UserPostCard;
