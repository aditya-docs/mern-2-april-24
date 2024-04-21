const blogSchema = require("../schemas/blog.schema");
  
const blogModel = mongoose.model("Blogs", blogSchema);

module.exports = blogModel