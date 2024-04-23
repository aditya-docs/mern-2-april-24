const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, maxlength: 25 },
    twitterHandle: { type: String },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.path} is not a valid email address!`,
      },
    },
    image: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: (props) => `${props.path} is not a valid URL!`,
      },
    },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: [authorSchema] },
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = blogSchema;
