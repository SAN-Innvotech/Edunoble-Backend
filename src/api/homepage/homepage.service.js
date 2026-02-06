const { Homepage } = require("../../models/homepage.model");

const createHomepage = async (payload) => {
  try {
    const homepage = await Homepage.create(payload);
    return { status: 200, data: homepage };
  } catch (err) {
    console.log("createHomepage service error", err);
    return { status: 500, message: "Failed to create homepage" };
  }
};

const getHomepage = async () => {
  try {
    const homepage = await Homepage.findOne({ isActive: true })
      .sort({ createdAt: -1 });
    
    if (!homepage) {
      return { status: 404, message: "Homepage not found" };
    }
    return { status: 200, data: homepage };
  } catch (err) {
    console.log("getHomepage service error", err);
    return { status: 500, message: "Failed to fetch homepage" };
  }
};

const updateHomepage = async (id, body) => {
  try {
    const homepage = await Homepage.findByIdAndUpdate(id, body, { new: true });
    if (!homepage) {
      return { status: 404, message: "Homepage not found" };
    }
    return { status: 200, data: homepage };
  } catch (err) {
    console.log("updateHomepage service error", err);
    return { status: 500, message: "Failed to update homepage" };
  }
};

const updateHomepageSection = async (id, section, body) => {
  try {
    const updateData = { [section]: body };
    const homepage = await Homepage.findByIdAndUpdate(id, updateData, { new: true });
    if (!homepage) {
      return { status: 404, message: "Homepage not found" };
    }
    return { status: 200, data: homepage };
  } catch (err) {
    console.log("updateHomepageSection service error", err);
    return { status: 500, message: "Failed to update homepage section" };
  }
};

const deleteHomepage = async (id) => {
  try {
    const homepage = await Homepage.findByIdAndDelete(id);
    if (!homepage) {
      return { status: 404, message: "Homepage not found" };
    }
    return { status: 200, data: {} };
  } catch (err) {
    console.log("deleteHomepage service error", err);
    return { status: 500, message: "Failed to delete homepage" };
  }
};

module.exports = {
  createHomepage,
  getHomepage,
  updateHomepage,
  updateHomepageSection,
  deleteHomepage,
};
