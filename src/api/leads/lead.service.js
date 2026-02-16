const { Lead } = require("../../models/lead.model");

const createLead = async (body) => {
  try {
    const lead = await Lead.create(body);
    return { status: 200, data: lead };
  } catch (err) {
    console.log("createLead service error", err);
    return { status: 500, message: "Failed to create lead" };
  }
};

const listLeads = async () => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return { status: 200, data: leads };
  } catch (err) {
    console.log("listLeads service error", err);
    return { status: 500, message: "Failed to fetch leads" };
  }
};

const deleteLead = async (id) => {
  try {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return { status: 404, message: "Lead not found" };
    }
    return { status: 200, data: lead };
  } catch (err) {
    console.log("deleteLead service error", err);
    return { status: 500, message: "Failed to delete lead" };
  }
};

module.exports = {
  createLead,
  listLeads,
  deleteLead,
};
