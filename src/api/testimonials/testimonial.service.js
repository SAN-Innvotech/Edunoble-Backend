const { Testimonial } = require("../../models/testimonial.model");

const createTestimonial = async (payload) => {
  try {
    const testimonial = await Testimonial.create(payload);
    return { status: 200, data: testimonial };
  } catch (err) {
    console.log("createTestimonial service error", err);
    return { status: 500, message: "Failed to create testimonial" };
  }
};

const listTestimonials = async () => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    return { status: 200, data: testimonials };
  } catch (err) {
    console.log("listTestimonials service error", err);
    return { status: 500, message: "Failed to fetch testimonials" };
  }
};

const getTestimonialById = async (id) => {
  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial || !testimonial.isActive) {
      return { status: 404, message: "Testimonial not found" };
    }
    return { status: 200, data: testimonial };
  } catch (err) {
    console.log("getTestimonialById service error", err);
    return { status: 500, message: "Failed to fetch testimonial" };
  }
};

const updateTestimonial = async (id, body) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    if (!testimonial) {
      return { status: 404, message: "Testimonial not found" };
    }
    return { status: 200, data: testimonial };
  } catch (err) {
    console.log("updateTestimonial service error", err);
    return { status: 500, message: "Failed to update testimonial" };
  }
};

const deleteTestimonial = async (id) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!testimonial) {
      return { status: 404, message: "Testimonial not found" };
    }
    return { status: 200, data: testimonial };
  } catch (err) {
    console.log("deleteTestimonial service error", err);
    return { status: 500, message: "Failed to delete testimonial" };
  }
};

const adminListTestimonials = async () => {
  try {
    const testimonials = await Testimonial.find({}).sort({ order: 1, createdAt: -1 });
    return { status: 200, data: testimonials };
  } catch (err) {
    console.log("adminListTestimonials service error", err);
    return { status: 500, message: "Failed to fetch testimonials" };
  }
};

module.exports = {
  createTestimonial,
  listTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  adminListTestimonials,
};

