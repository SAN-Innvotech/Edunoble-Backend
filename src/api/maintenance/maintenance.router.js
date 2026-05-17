const router = require("express").Router({ mergeParams: true });
const authMiddleware = require("../../middlewares/auth.middleware");
const { Blog } = require("../../models/blog.model");
const { Course } = require("../../models/course.model");
const { Topper } = require("../../models/topper.model");

/**
 * TEMPORARY one-off maintenance route.
 *
 * Hard-deletes all CMS content (blogs, courses, toppers) — used once to
 * remove the sample/seed data. Protected by the standard JWT auth
 * middleware: a valid Bearer token is required, exactly like the other
 * admin routes.
 *
 * REMOVE this file and its mount in api.router.js once the cleanup is done.
 */
router.post("/purge-cms", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.deleteMany({});
    const courses = await Course.deleteMany({});
    const toppers = await Topper.deleteMany({});

    return res.json({
      isSuccess: true,
      code: 200,
      message: "CMS content purged",
      data: {
        blogs: blogs.deletedCount,
        courses: courses.deletedCount,
        toppers: toppers.deletedCount,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ isSuccess: false, code: 500, message: err.message });
  }
});

module.exports = router;
