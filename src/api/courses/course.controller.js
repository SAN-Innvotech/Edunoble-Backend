const responses = require("../../utility/responses");
const courseService = require("./course.service");
const { generateUniqueSlug } = require("../../utility/slugify");

const createCourse = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      longDescription,
      subject,
      classLevel,
      mode,
      duration,
      feeRange,
      highlights,
      coverImage,
      enrollCtaText,
      order,
      isActive,
    } = req.body;

    if (!name) {
      return responses.badRequestResponse(res, "name is required");
    }

    const finalSlug = await generateUniqueSlug(
      slug && slug.trim() ? slug : name,
      courseService.slugExists
    );

    const payload = {
      name,
      slug: finalSlug,
      description,
      longDescription,
      subject,
      classLevel,
      mode,
      duration,
      feeRange,
      highlights: Array.isArray(highlights) ? highlights : [],
      coverImage: coverImage !== undefined ? coverImage : "",
      enrollCtaText:
        enrollCtaText !== undefined && enrollCtaText !== ""
          ? enrollCtaText
          : "Book a Free Demo",
      order: order ? Number(order) : 0,
      isActive: isActive !== undefined ? isActive : true,
    };

    const result = await courseService.createCourse(payload);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }

    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("createCourse controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const listCourses = async (req, res) => {
  try {
    const result = await courseService.listCourses();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("listCourses controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const getCourseBySlug = async (req, res) => {
  try {
    const result = await courseService.getCourseBySlug(req.params.slug);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("getCourseBySlug controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const updateCourse = async (req, res) => {
  try {
    const result = await courseService.updateCourse(req.params.id, req.body);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("updateCourse controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const result = await courseService.deleteCourse(req.params.id);
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("deleteCourse controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

const adminListCourses = async (req, res) => {
  try {
    const result = await courseService.adminListCourses();
    if (!result.status || result.status !== 200) {
      return responses.generateResponse(res, false, result.message, result.status);
    }
    return responses.successResponse(res, result.data);
  } catch (err) {
    console.log("adminListCourses controller error", err);
    return responses.internalFailureResponse(res, err);
  }
};

module.exports = {
  createCourse,
  listCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  adminListCourses,
};
