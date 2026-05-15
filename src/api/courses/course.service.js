const { Course } = require("../../models/course.model");

const createCourse = async (payload) => {
  try {
    const course = await Course.create(payload);
    return { status: 200, data: course };
  } catch (err) {
    console.log("createCourse service error", err);
    return { status: 500, message: "Failed to create course" };
  }
};

const listCourses = async () => {
  try {
    const courses = await Course.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    return { status: 200, data: courses };
  } catch (err) {
    console.log("listCourses service error", err);
    return { status: 500, message: "Failed to fetch courses" };
  }
};

const getCourseBySlug = async (slug) => {
  try {
    const course = await Course.findOne({ slug: slug, isActive: true });
    if (!course) {
      return { status: 404, message: "Course not found" };
    }
    return { status: 200, data: course };
  } catch (err) {
    console.log("getCourseBySlug service error", err);
    return { status: 500, message: "Failed to fetch course" };
  }
};

const updateCourse = async (id, body) => {
  try {
    const course = await Course.findByIdAndUpdate(id, body, { new: true });
    if (!course) {
      return { status: 404, message: "Course not found" };
    }
    return { status: 200, data: course };
  } catch (err) {
    console.log("updateCourse service error", err);
    return { status: 500, message: "Failed to update course" };
  }
};

const deleteCourse = async (id) => {
  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!course) {
      return { status: 404, message: "Course not found" };
    }
    return { status: 200, data: course };
  } catch (err) {
    console.log("deleteCourse service error", err);
    return { status: 500, message: "Failed to delete course" };
  }
};

const adminListCourses = async () => {
  try {
    const courses = await Course.find({}).sort({ order: 1, createdAt: -1 });
    return { status: 200, data: courses };
  } catch (err) {
    console.log("adminListCourses service error", err);
    return { status: 500, message: "Failed to fetch courses" };
  }
};

const slugExists = async (slug) => {
  const existing = await Course.findOne({ slug: slug });
  return !!existing;
};

module.exports = {
  createCourse,
  listCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  adminListCourses,
  slugExists,
};
