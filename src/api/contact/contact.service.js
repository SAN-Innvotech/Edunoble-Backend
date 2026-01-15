const { Contact } = require("../../models/contact.model");
const { FAQ } = require("../../models/faq.model");

const createContact = async (body) => {
  try {
    const contact = await Contact.create(body);
    return { status: 200, data: contact };
  } catch (err) {
    console.log("createContact service error", err);
    return { status: 500, message: "Failed to submit contact form" };
  }
};

const listContacts = async () => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return { status: 200, data: contacts };
  } catch (err) {
    console.log("listContacts service error", err);
    return { status: 500, message: "Failed to fetch contacts" };
  }
};

const getFAQs = async () => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    return { status: 200, data: faqs };
  } catch (err) {
    console.log("getFAQs service error", err);
    return { status: 500, message: "Failed to fetch FAQs" };
  }
};

const markAsResolved = async (id, notes) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        isResolved: true,
        resolvedAt: new Date(),
        notes: notes || undefined,
      },
      { new: true }
    );
    if (!contact) {
      return { status: 404, message: "Contact not found" };
    }
    return { status: 200, data: contact };
  } catch (err) {
    console.log("markAsResolved service error", err);
    return { status: 500, message: "Failed to mark contact as resolved" };
  }
};

const listAllFAQs = async () => {
  try {
    const faqs = await FAQ.find({}).sort({ order: 1, createdAt: 1 });
    return { status: 200, data: faqs };
  } catch (err) {
    console.log("listAllFAQs service error", err);
    return { status: 500, message: "Failed to fetch FAQs" };
  }
};

const createFAQ = async (payload) => {
  try {
    const faq = await FAQ.create(payload);
    return { status: 200, data: faq };
  } catch (err) {
    console.log("createFAQ service error", err);
    return { status: 500, message: "Failed to create FAQ" };
  }
};

const updateFAQ = async (id, body) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    if (!faq) {
      return { status: 404, message: "FAQ not found" };
    }
    return { status: 200, data: faq };
  } catch (err) {
    console.log("updateFAQ service error", err);
    return { status: 500, message: "Failed to update FAQ" };
  }
};

module.exports = {
  createContact,
  listContacts,
  getFAQs,
  markAsResolved,
  listAllFAQs,
  createFAQ,
  updateFAQ,
};


