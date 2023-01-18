const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filterValue = favorite ? { owner, favorite } : { owner };

  const contacts = await Contact.find(filterValue, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(contacts);
};

module.exports = getAllContacts;
