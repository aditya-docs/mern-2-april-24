const mongoose = require("mongoose");

// const authorSchema = new mongoose.Schema({
//   name: String, //Title is string
//   age: Number, //Authors is an array of strings
// });

  const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: [String] },
    content: { type: String, default: "" },
    publishedAt: { type: Date, default: null },
  });
  

module.exports = blogSchema;