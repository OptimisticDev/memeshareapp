import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Validator from "validator";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

import User from "../models/userModel.js";

import validateSignUpUserInput from "../validator/validateSignUpUserInput.js";
import validateSignInUserInput from "../validator/validateSignInUserInput.js";

const key =
  "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";

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: key,
    },
  })
);

// @desc signup user
// @route POST /api/users/signup
// @access public
const signUpUser = asyncHandler(async (req, res) => {
  const { errors, isValid } = validateSignUpUserInput(req.body);

  if (!isValid) {
    return res.json({
      errors,
      success: false,
    });
  }

  const name = Validator.trim(req.body.name);
  const email = Validator.trim(req.body.email);
  const password = req.body.password;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.json({
      success: false,
      errors: { userExists: "User already exists" },
    });
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    transporter.sendMail({
      to: user.email,
      from: "moniruzzamanaurangzeb@gmail.com",
      subject: "signup success",
      html: "<h1>Wellcome to MemeVerse</h1>",
    });
    return res.status(201).json({
      success: true,
      message: "User signup successfully",
    });
  } else {
    return res.json({
      success: false,
      errors: { error: "Bad request" },
    });
  }
});

// @desc signin user
// @route POST /api/users/signin
// @access public

const signInUser = asyncHandler(async (req, res) => {
  const { errors, isValid } = validateSignInUserInput(req.body);

  if (!isValid) {
    return res.json({
      errors,
      success: false,
    });
  }

  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.json({
      success: false,
      errors: { invalidUser: "Invalid email or password" },
    });
  } else {
    const isEqual = await bcrypt.compare(password, userExists.password);

    if (isEqual) {
      const { _id, name, email } = userExists;
      const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "Successfully signed in",
        token,
        user: { _id, name, email },
      });
    } else {
      return res.json({
        success: false,
        errors: { invalidUser: "Invalid email or password" },
      });
    }
  }
});

// @desc  reset passwprd of user
// @route POST /api/users/reset-password
// @access public

const resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");

    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.json({
          success: false,
          errors: { invalidUser: "Invalid User" },
        });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;

      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "moniruzzamanaurangzeb@gmail.com",
          subject: "reset pasword",
          html: `
          <p>You are requested to reset password</p>
          <h5>click this <a href="https://memeshareapp.herokuapp.com/reset/${token}">link</a> to reset password</h5?
          `,
        });

        res.json({
          success: true,
          message: "check your email",
        });
      });
    });
  });
};

// @desc change user password
// @route POST /api/users/new-password
// @access public
const newPassword = asyncHandler(async (req, res) => {
  const newPassword = req.body.password;
  const token = req.body.token;

  console.log(newPassword);
  console.log(token);

  if (!newPassword) {
    return res.json({
      success: false,
      errors: {
        password: "Password is required",
      },
    });
  } else if (newPassword.length < 5) {
    return res.json({
      success: false,
      errors: {
        password: "Invalid password",
      },
    });
  }
  const user = await User.findOne({
    resetToken: token,
    expireToken: { $gt: Date.now() },
  });

  if (!user) {
    return res.json({
      errors: { expire: "Try again session expired" },
      success: false,
    });
  }

  bcrypt
    .hash(newPassword, 12)
    .then((hashPassword) => {
      user.password = hashPassword;
      (user.resetToken = undefined),
        (user.expireToken = undefined),
        user.save().then((savedUser) => {
          return res.json({
            success: true,
            message: "Password updated successfully",
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

export { signUpUser, signInUser, resetPassword, newPassword };
