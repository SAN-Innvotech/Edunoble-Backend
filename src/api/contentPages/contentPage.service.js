const { ContentPage } = require("../../models/contentPage.model");

const createContentPage = async (payload) => {
  try {
    const contentPage = await ContentPage.create(payload);
    return { status: 200, data: contentPage };
  } catch (err) {
    console.log("createContentPage service error", err);
    return { status: 500, message: "Failed to create content page" };
  }
};

const listContentPages = async () => {
  try {
    const contentPages = await ContentPage.find({})
      .sort({ order: 1, createdAt: -1 });
    return { status: 200, data: contentPages };
  } catch (err) {
    console.log("listContentPages service error", err);
    return { status: 500, message: "Failed to fetch content pages" };
  }
};

const getContentPage = async (type) => {
  try {
    const contentPage = await ContentPage.find({ 
      type: type,
      isActive: true 
    }).sort({ order: 1, createdAt: -1 });
    
    if (!contentPage) {
      return { status: 404, message: "Content page not found" };
    }
    return { status: 200, data: contentPage };
  } catch (err) {
    console.log("getContentPage service error", err);
    return { status: 500, message: "Failed to fetch content page" };
  }
};

const updateContentPage = async (id, body) => {
  try {
    const contentPage = await ContentPage.findByIdAndUpdate(id, body, { new: true });
    if (!contentPage) {
      return { status: 404, message: "Content page not found" };
    }
    return { status: 200, data: contentPage };
  } catch (err) {
    console.log("updateContentPage service error", err);
    return { status: 500, message: "Failed to update content page" };
  }
};

const deleteContentPage = async (id) => {
  try {
    const contentPage = await ContentPage.findByIdAndDelete(id);
    if (!contentPage) {
      return { status: 404, message: "Content page not found" };
    }
    return { status: 200, data: {} };
  } catch (err) {
    console.log("deleteContentPage service error", err);
    return { status: 500, message: "Failed to delete content page" };
  }
};

module.exports = {
  createContentPage,
  listContentPages,
  getContentPage,
  updateContentPage,
  deleteContentPage,
};
