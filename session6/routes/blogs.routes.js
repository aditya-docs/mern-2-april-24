const router = require("express").Router();
const {
  getBlogs,
  createNewBlog,
  deleteBlogById,
  getBlogById,
  replaceBlogById,
  searchBlogs,
} = require("../controllers/blogs.controller");

router.get("/", getBlogs);

router.get("/search", searchBlogs);

router.get("/:id", getBlogById);

router.put("/:id", replaceBlogById);

router.delete("/:id", deleteBlogById);

router.post("/new", createNewBlog);

module.exports = router;
