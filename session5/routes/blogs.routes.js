const router = require("express").Router();
const {
    getBlogs,
    createNewBlog,
    deleteBlogById,
    getBlogById,
    replaceBlogById
 } = require("../controllers/blogs.controller");

router.get("/", getBlogs);

router.get("/:id", getBlogById);

router.put("/:id", replaceBlogById);

router.delete("/:id", deleteBlogById);

router.post("/new", createNewBlog);

module.exports = router