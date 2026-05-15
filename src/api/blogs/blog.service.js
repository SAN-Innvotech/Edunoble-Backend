const { Blog } = require("../../models/blog.model");

const createBlog = async (payload) => {
  try {
    const blog = await Blog.create(payload);
    return { status: 200, data: blog };
  } catch (err) {
    console.log("createBlog service error", err);
    return { status: 500, message: "Failed to create blog" };
  }
};

const listBlogs = async () => {
  try {
    const blogs = await Blog.find({ isActive: true, isPublished: true })
      .sort({ publishedAt: -1 });
    return { status: 200, data: blogs };
  } catch (err) {
    console.log("listBlogs service error", err);
    return { status: 500, message: "Failed to fetch blogs" };
  }
};

const getBlogBySlug = async (slug) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: slug, isActive: true, isPublished: true },
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!blog) {
      return { status: 404, message: "Blog not found" };
    }
    return { status: 200, data: blog };
  } catch (err) {
    console.log("getBlogBySlug service error", err);
    return { status: 500, message: "Failed to fetch blog" };
  }
};

const updateBlog = async (id, body) => {
  try {
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!blog) {
      return { status: 404, message: "Blog not found" };
    }
    return { status: 200, data: blog };
  } catch (err) {
    console.log("updateBlog service error", err);
    return { status: 500, message: "Failed to update blog" };
  }
};

const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!blog) {
      return { status: 404, message: "Blog not found" };
    }
    return { status: 200, data: blog };
  } catch (err) {
    console.log("deleteBlog service error", err);
    return { status: 500, message: "Failed to delete blog" };
  }
};

const adminListBlogs = async () => {
  try {
    const blogs = await Blog.find({}).sort({ order: 1, publishedAt: -1 });
    return { status: 200, data: blogs };
  } catch (err) {
    console.log("adminListBlogs service error", err);
    return { status: 500, message: "Failed to fetch blogs" };
  }
};

const slugExists = async (slug) => {
  const existing = await Blog.findOne({ slug: slug });
  return !!existing;
};

module.exports = {
  createBlog,
  listBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  adminListBlogs,
  slugExists,
};
