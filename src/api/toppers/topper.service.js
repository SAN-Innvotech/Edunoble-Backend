const { Topper } = require("../../models/topper.model");

const createTopper = async (payload) => {
  try {
    const topper = await Topper.create(payload);
    return { status: 200, data: topper };
  } catch (err) {
    console.log("createTopper service error", err);
    return { status: 500, message: "Failed to create topper" };
  }
};

const listToppers = async () => {
  try {
    const toppers = await Topper.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    return { status: 200, data: toppers };
  } catch (err) {
    console.log("listToppers service error", err);
    return { status: 500, message: "Failed to fetch toppers" };
  }
};

const updateTopper = async (id, body) => {
  try {
    const topper = await Topper.findByIdAndUpdate(id, body, { new: true });
    if (!topper) {
      return { status: 404, message: "Topper not found" };
    }
    return { status: 200, data: topper };
  } catch (err) {
    console.log("updateTopper service error", err);
    return { status: 500, message: "Failed to update topper" };
  }
};

const deleteTopper = async (id) => {
  try {
    const topper = await Topper.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!topper) {
      return { status: 404, message: "Topper not found" };
    }
    return { status: 200, data: topper };
  } catch (err) {
    console.log("deleteTopper service error", err);
    return { status: 500, message: "Failed to delete topper" };
  }
};

const adminListToppers = async () => {
  try {
    const toppers = await Topper.find({}).sort({ order: 1, createdAt: -1 });
    return { status: 200, data: toppers };
  } catch (err) {
    console.log("adminListToppers service error", err);
    return { status: 500, message: "Failed to fetch toppers" };
  }
};

module.exports = {
  createTopper,
  listToppers,
  updateTopper,
  deleteTopper,
  adminListToppers,
};
