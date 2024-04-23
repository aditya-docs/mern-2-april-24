const crypto = require("crypto");
const {
  findAllBlogs,
  createBlogDocument,
  deleteBlogDocumentById,
  replaceBlogDocumentById,
  getBlogDocumentById,
  searchBlogDocuments,
} = require("../services/blogs.service");

const getBlogs = async (req, res) => {
  const requestId = crypto.randomUUID();
  try {
    const response = await findAllBlogs();
    res.status(200).json(
      response.map((obj) => {
        const { title, author, content, publishedAt, _id: id } = obj;
        return { title, author, content, publishedAt, id };
      })
    );
  } catch (error) {
    console.log({ code: 500, requestId });
    res.status(500).json({
      message: `Oops! Something went wrong. Try again! or file a support ticket with this requestId: ${requestId}`,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const response = await getBlogDocumentById(req.params.id);
    const { title, author, content, publishedAt, _id: id } = response;
    res.status(200).json({ title, author, content, publishedAt, id });
  } catch (error) {
    res.status(500).json({ message: `Oops! Something went wrong. Try again!` });
  }
};

const createNewBlog = async (req, res) => {
  try {
    // do line 6
    const newBlogDoc = await createBlogDocument(req.body);

    // or do line 9 and 10

    // const newBlogDoc = new Blogs(req.body);
    // await newBlogDoc.save();
    const { title, author, content, publishedAt, _id: id } = newBlogDoc;
    res.status(201).json({ title, author, content, publishedAt, id });
  } catch (error) {
    if (error.errorResponse?.code === 11000) {
      return res
        .status(400)
        .json({ message: "A blog with this `title` already exists." });
    }
    if (error.errors) {
      const finalErrorMessage = Object.values(error?.errors).reduce(
        (finalError, currentErrorObj, index) =>
          index === 0
            ? `${currentErrorObj.properties.message}`
            : `${finalError} ${currentErrorObj.properties.message}`,
        ""
      );
      return res.status(400).json({ message: finalErrorMessage });
    }
    res.status(500).json({ message: "Oops! Something went wrong. Try again!" });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    await deleteBlogDocumentById(req.params.id);
    //await Blogs.findByIdAndDelete({_id: req.params.id});
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Oops! Something went wrong. Try again!` });
  }
};

const replaceBlogById = async (req, res) => {
  let { title, author, content, publishedAt, version: __v } = req.body;
  try {
    const response = await replaceBlogDocumentById(req.params.id, {
      title,
      author,
      content,
      publishedAt,
      __v,
    });
    res
      .status(200)
      .json({ title, author, content, publishedAt, id: response._id });
  } catch (error) {
    res.status(500).json({ message: `Oops! Something went wrong. Try again!` });
  }
};

const searchBlogs = async (req, res) => {
  const { title, author } = req.query;
  const titleRegex = new RegExp(title);
  const result = await searchBlogDocuments(titleRegex, author);
  res.status(200).json(
    result.map(({ title, author, content, publishedAt, _id: id }) => ({
      title,
      author,
      content,
      publishedAt,
      id,
    }))
  );
};

module.exports = {
  getBlogs,
  getBlogById,
  createNewBlog,
  deleteBlogById,
  replaceBlogById,
  searchBlogs,
};
