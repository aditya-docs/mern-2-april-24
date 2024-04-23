const Blogs = require("../models/blogs.model");

const findAllBlogs = async () => {
  return await Blogs.find();
};

const createBlogDocument = async (body) => {
  return await Blogs.create(body);
};

const deleteBlogDocumentById = async (id) => {
  await Blogs.deleteOne({ _id: id });
};

const replaceBlogDocumentById = async (
  id,
  { title, author, content, publishedAt, __v }
) => {
  return await Blogs.findOneAndReplace(
    { _id: id },
    { title, author, content, publishedAt, __v },
    { returnDocument: "after" }
  );
};

const getBlogDocumentById = async (id) => {
  return await Blogs.findOne({ _id: id });
};

const searchBlogDocuments = async (titleRegex, author) => {
  return await Blogs.find({
    $or: [{ title: titleRegex }, { author: { $elemMatch: { email: author } } }],
  });
};

module.exports = {
  findAllBlogs,
  createBlogDocument,
  deleteBlogDocumentById,
  replaceBlogDocumentById,
  getBlogDocumentById,
  searchBlogDocuments,
};
