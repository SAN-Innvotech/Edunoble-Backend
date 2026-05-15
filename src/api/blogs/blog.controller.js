const responses = require("../../utility/responses");
const blogService = require("./blog.service");
const { generateUniqueSlug } = require("../../utility/slugify");

const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      category,
      tags,
      isPublished,
      publishedAt,
      order,
      isActive,
    } = req.body;

    if (!title) {
      return responses.badRequestResponse(res, "title is required");
    }

    const finalSlug = await generateUniqueSlug(
      slug && slug.trim() ? slug : title,
      blogService.slugExists
    );

    const payload = {
      title,
      slug: finalSlug,
      excerpt,
      content,
      coverImage: coverImage !== undefined ? coverImage : "",
      author: author !== undefined && author !== "" ? author : "EduNoble Team",
      category: category !== undefined && category !== "" ? category : "General",
      tags: Array.isArray(tags) ? tags : [],
      isPublished: isPublished !== undefined ? isPublished : true,
      publishedAt: publishedAt ? publishedAt : Date.now(),
      order: order ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    const result = await blogService.createBlog(payload);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createBlog controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listBlogs = async (req, res) => {
  try {
    const result = await blogService.listBlogs();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listBlogs controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const result = await blogService.getBlogBySlug(req.params.slug);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getBlogBySlug controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateBlog = async (req, res) => {
  try {
    const result = await blogService.updateBlog(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateBlog controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const result = await blogService.deleteBlog(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deleteBlog controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const adminListBlogs = async (req, res) => {
  try {
    const result = await blogService.adminListBlogs();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("adminListBlogs controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  createBlog,
  listBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  adminListBlogs,
};
