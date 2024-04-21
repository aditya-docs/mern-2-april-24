const mongoose = require(mongoose)

// const authorSchema = new mongoose.Schema({
//   name: String, //Title is string
//   age: Number, //Authors is an array of strings
// });

const blogSchema = new mongoose.Schema({
    title: String, //Title is string
    authors: [String], //Authors is an array of strings
    content: String, //Content is string
    publishedAt: Date, //publishedAt is Date
    // address: {
    //   city: String
    // }
  });

module.exports = blogSchema;