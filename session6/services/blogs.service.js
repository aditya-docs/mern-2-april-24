const Blogs = require("../models/blogs.model");

class BlogService {
  findAllBlogs = async () => {
    return await Blogs.find();
  };

  createBlogDocument = async (body) => {
    return await Blogs.create(body);
  };

  deleteBlogDocumentById = async (id) => {
    await Blogs.deleteOne({ _id: id });
  };

  replaceBlogDocumentById = async (
    id,
    { title, author, content, publishedAt, __v }
  ) => {
    return await Blogs.findOneAndReplace(
      { _id: id },
      { title, author, content, publishedAt, __v },
      { returnDocument: "after" }
    );
  };

  getBlogDocumentById = async (id) => {
    return await Blogs.findOne({ _id: id });
  };

  searchBlogDocuments = async (titleRegex, author) => {
    return await Blogs.find({
      $or: [
        { title: titleRegex },
        { author: { $elemMatch: { email: author } } },
      ],
    });
  };
}

module.exports = BlogService;
