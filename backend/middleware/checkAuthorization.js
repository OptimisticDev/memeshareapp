import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const checkAuthorization = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({
      success: false,
      errors: {
        invalidUser: "Unauthorized access. To access you must be logged in",
      },
    });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.json({
        success: false,
        errors: { invalidUser: "Unauthorized access" },
      });
    }

    const { _id } = payload;

    const userData = await User.findById(_id);

    if (userData) {
      req.user = userData;
      next();
    } else {
      return res.json({
        success: false,
        errors: { invalidUser: "Unauthorized access" },
      });
    }
  });
});

export default checkAuthorization;
