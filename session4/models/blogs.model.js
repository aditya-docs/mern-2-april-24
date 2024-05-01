const blogSchema = require("../schemas/blog.schema");

const blogModel = mongoose.model("Blog", blogSchema, {
  collection: "userinfo",
});

module.exports = blogModel;
